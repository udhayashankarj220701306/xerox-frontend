import { useEffect, useState } from "react";
import { NoCurrentRequest } from "../components/NoCurrentRequest.jsx";
import { RequestHistory } from "../components/RequestHistory.jsx";
import { RequestForm } from "../components/RequestForm.jsx";
import { RequestDisplay } from "../components/RequestDisplay.jsx";
import { useRequestStore } from "../stores/useRequestStore.js";
const RequestPage = () => {
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
    <div className="flex flex-col justify-center py-12 mt-6 sm:px-6 lg:px-8">
      
        <>
          {isActiveRequest ?(<RequestDisplay requests={activeRequest}/>):(<NoCurrentRequest handleRequestForm={handleRequestForm} />)}
          
          <RequestHistory />
        </>
      
    </div>
  );
};

export default RequestPage;
