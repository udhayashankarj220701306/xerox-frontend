import { useEffect, useState } from "react";
import { RequestHistory } from "../components/RequestHistory.jsx";
import { RequestStatus } from "../components/RequestStatus.jsx";
const RequestPage = () => {
  

  return (
    <div className="flex flex-col justify-center py-12 mt-6 sm:px-6 lg:px-8">
      
        <>
          
          <RequestStatus />
          <RequestHistory />
        </>
      
    </div>
  );
};

export default RequestPage;
