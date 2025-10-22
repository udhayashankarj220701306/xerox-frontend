import { useEffect } from "react";
import { useRequestStore } from "../stores/useRequestStore";
import { RequestsDisplay } from "./RequestsDisplay.jsx";

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
      RequestHistorygfhbgfh
      <RequestsDisplay requestsPara={requestHistory} />
    </div>
  );
};
