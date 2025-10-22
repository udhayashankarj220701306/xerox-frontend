import { RequestsDisplay } from "./RequestsDisplay.jsx";
import { useRequestStore } from "../stores/useRequestStore.js";
import { useEffect, useState } from "react";
import { NoCurrentRequest } from "../components/NoCurrentRequest.jsx";

// const requestStatus = false;

export const RequestStatus = () => {
  const [requestForm, setRequestForm] = useState(false);
  const [isActiveRequest, setIsActiveRequest] = useState(false);
  const { fetchActiveRequests, activeRequest } = useRequestStore();
  useEffect(() => {
    fetchActiveRequests();
    setIsActiveRequest(activeRequest.length > 0);
    // console.log("requestPage", activeRequest);
  }, []);
  useEffect(() => {
    setIsActiveRequest(activeRequest.length > 0);
  }, [activeRequest]);
  const handleRequestForm = () => {
    setRequestForm(!requestForm);
  };
  return (
    <>
      {isActiveRequest ? (
        <RequestsDisplay requestsPara={activeRequest} />
      ) : (
        <NoCurrentRequest handleRequestForm={handleRequestForm} />
      )}
    </>
  );
};
