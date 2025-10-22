import { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore.js";
import { RequestDisplay } from "./RequestDisplay.jsx";

export const RequestsDisplay = ({ requestsPara }) => {
  // const [checked, setChecked] = useState(false);
  const [requests, setRequests] = useState(requestsPara);
  useEffect(() => {
    setRequests(requestsPara);
  // console.log("requestsPara:", requestsPara,requests);
  }, [requestsPara]);
  
  return (
    <div className="flex flex-col bg-gray-500 rounded-lg p-2">
      {requests.map((request) => (
        <RequestDisplay key={request._id} requestPara={request} />
      ))}
    </div>
  );
};
