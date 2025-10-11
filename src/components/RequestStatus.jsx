import { RequestDisplay } from "../components/RequestDisplay.jsx";
import { useRequestStore } from "../stores/useRequestStore.js";
import { useEffect, useState } from "react";
import { NoCurrentRequest } from "../components/NoCurrentRequest.jsx";

// const requestStatus = false;

export const RequestStatus = () => {
  const [requestForm, setRequestForm] = useState(false);
    const [isActiveRequest, setIsActiveRequest] = useState(false);
    const { fetchActiveRequests,activeRequest } = useRequestStore();
    useEffect(() => {
      
      fetchActiveRequests({ status: "pending" });
      setIsActiveRequest(activeRequest.length > 0);
      console.log("requestPage",activeRequest);
    }, []);
    useEffect(() => {
      setIsActiveRequest(activeRequest.length > 0);
    }, [activeRequest]);
    const handleRequestForm = () => {
      setRequestForm(!requestForm);
    }
  return (
    <>
      {isActiveRequest ? (
        <RequestDisplay requests={activeRequest} />
      ) : (
        <NoCurrentRequest handleRequestForm={handleRequestForm} />
      )}
    </>
  );
}
