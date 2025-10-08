import { create } from "zustand";
import axios from "../libs/axios.js";
import { toast } from "react-hot-toast";

export const useXeroxStore = create((set, get) => ({
  xeroxProfiles: [],
  loading: false,
  fetchXeroxProfiles: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/xerox/profiles");
      console.log(res.data);
      set({ xeroxProfiles: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching xerox data"
      );
    }
  },
}));
