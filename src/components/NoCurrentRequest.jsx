import { useNavigate } from "react-router-dom";
import { AddRequestButton } from "./AddRequestButton.jsx";
import { useUserStore } from "../stores/useUserStore.js";
export const NoCurrentRequest = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  return (
    <div>
      <div
        className=" rounded-lg m-2 p-1 flex flex-col justify-center items-center border-2 border-dashed border-gray-600"
        onClick={() => navigate("/xerox")}
      >
        No Current Request
        {(user.role==="student"&&<AddRequestButton />)}
      </div>
    </div>
  );
};
