import { useEffect } from "react";
import { useRequestStore } from "../stores/useRequestStore";
import { RequestsDisplay } from "./RequestsDisplay.jsx";
import { div } from "framer-motion/client";

export const RequestHistory = () => {
  const { requestHistory, fetchRequestHistory } = useRequestStore();
  
  useEffect(() => {
    const asyncFetch = async () => {
    await fetchRequestHistory();
  }
    asyncFetch();
  }, [fetchRequestHistory]);
  // useEffect(()=>{
  //   console.log("requestHistory", requestHistory);

  // },[requestHistory])
  return (
    <div className="m-2 border-2 border-dashed border-gray-600 rounded-lg p-2 ">
      Request History
      {requestHistory.length!=0?
      <RequestsDisplay requestsPara={requestHistory} />
      :
      <div>No History Available</div>
      }
    </div>
  );
};
