import { create } from "zustand";
import axios from "../libs/axios.js";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
	user: null,
	loading: false,
	checkingAuth: true,
	profile:null,

	signup: async ({ name, email, password, confirmPassword }) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Passwords do not match");
		}

		try {
			const res = await axios.post("/auth/signup", { name, email, password });
			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},
	login: async (email, password) => {
		set({ loading: true });

		try {
			// console.log(email, password);
			const res = await axios.post("/auth/login", { email, password });
			// console.log(res.data);
			set({ user: res.data, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "An error occurred");
		}
	},

	logout: async () => {
		try {
			await axios.post("/auth/logout");
			set({ user: null });
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred during logout");
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get("/auth/profile");
			console.log("checkAuth:", response.data);
			set({ user: response.data, checkingAuth: false });
		} catch (error) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	},
	getProfile:async () => {
		try {
			const response = await axios.get("/auth/profile");
			set({ profile: response.data });
		} catch (error) {
			console.log(error.message);
			return null;
		}
	},

	refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			const profileRes = await axios.get("/auth/profile");
      		set({ user: profileRes.data });
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}));

// TODO: Implement the axios interceptors for refreshing access token

// Axios interceptor for token refresh
let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Check if a refresh request is already in progress
        if (!refreshPromise) {
          refreshPromise = useUserStore.getState().refreshToken();
        }

        // Wait for the existing refresh promise to resolve
        const newTokens = await refreshPromise;

        // Update the original request with the new access token
        // originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

        // Retry the original request with the new token
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log the user out and reject the original request's promise
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        // Clear the shared promise after it has been used
        refreshPromise = null;
      }
    }

		return Promise.reject(error);
	}
);
