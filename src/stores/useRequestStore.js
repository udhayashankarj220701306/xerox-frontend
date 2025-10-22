import { create } from "zustand";
import axios from "../libs/axios.js";
import { toast } from "react-hot-toast";

export const useRequestStore = create((set, get) => ({
  requestHistory: [],
  activeRequest: [],
  loading: false,
  fetchRequestHistory: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/request", {
        params: { status: ["completed"] }
      });
      console.log(res.data);
      set({ requestHistory: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching requests"
      );
    }
  },
  fetchActiveRequests: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/request", {
        params: { status: ["pending","processing"] }
      });
      console.log(res.data);
      set({ activeRequest: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching requests"
      );
    }
  },
  createRequest: async ({ requestData }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/request/add", requestData);
      set({ activeRequest: res.data, loading: false });
      toast.success("Request created successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message ||
          "An error occurred while creating the request"
      );
      throw error;
    }
  },
  updateStatus: async ({ requestId, newStatus }) => {
    set({ loading: true });
    try {
      const res = await axios.patch(`/request/${requestId}`, {
        status: newStatus,
      });
      set({ loading: false });
      toast.success("Request status updated successfully");
      return res.data;
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating the request status"
      );
      throw error;
    }
  },
}));