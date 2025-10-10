// import { useEffect, useState } from "react";
// import { NoCurrentRequest } from "../components/NoCurrentRequest.jsx";
// import { RequestHistory } from "../components/RequestHistory.jsx";
// import { RequestForm } from "../components/RequestForm.jsx";
// import { RequestDisplay } from "../components/RequestDisplay.jsx";
// import { useRequestStore } from "../stores/useRequestStore.js";
// const RequestPage = () => {
//   const [requestForm, setRequestForm] = useState(false);
//   const [isActiveRequest, setIsActiveRequest] = useState(false);
//   const { fetchActiveRequests,activeRequest } = useRequestStore();
//   useEffect(() => {
    
//     fetchActiveRequests({ status: "pending" });
//     setIsActiveRequest(activeRequest.length > 0);
//     console.log("requestPage",activeRequest);
//   }, []);
//   useEffect(() => {
//     setIsActiveRequest(activeRequest.length > 0);
//   }, [activeRequest]);
//   const handleRequestForm = () => {
//     setRequestForm(!requestForm);
//   }

//   return (
//     <div className="flex flex-col justify-center py-12 mt-6 sm:px-6 lg:px-8">
      
//         <>
//           {isActiveRequest ?(<RequestDisplay requests={activeRequest}/>):(<NoCurrentRequest handleRequestForm={handleRequestForm} />)}
          
//           <RequestHistory />
//         </>
      
//     </div>
//   );
// };

// export default RequestPage;

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx"; // Import Navbar
import { NoCurrentRequest } from "../components/NoCurrentRequest.jsx";
import { RequestHistory } from "../components/RequestHistory.jsx";
import { RequestForm } from "../components/RequestForm.jsx";
import { RequestDisplay } from "../components/RequestDisplay.jsx";
import { useRequestStore } from "../stores/useRequestStore.js";

const RequestPage = () => {
  const [requestForm, setRequestForm] = useState(false);
  const [isActiveRequest, setIsActiveRequest] = useState(false);
  const { fetchActiveRequests, activeRequest } = useRequestStore();

  useEffect(() => {
    fetchActiveRequests({ status: "pending" });
  }, [fetchActiveRequests]);

  useEffect(() => {
    setIsActiveRequest(activeRequest.length > 0);
  }, [activeRequest]);

  const handleRequestForm = () => {
    setRequestForm(!requestForm);
  };

  return (
    <>
      <Navbar />
      <div className="pt-28 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-100 flex flex-col justify-center space-y-8">
        {/* Show Request Form if toggled */}
        {requestForm && (
          <RequestForm handleRequestForm={handleRequestForm} requestingProfile={null} />
        )}

        {/* Active Request Display */}
        {!requestForm && (
          <>
            <h1 className="text-3xl font-bold text-center text-emerald-600 mb-6">
              Your Requests
            </h1>

            <div className="space-y-6">
              {isActiveRequest ? (
                <RequestDisplay requests={activeRequest} />
              ) : (
                <NoCurrentRequest handleRequestForm={handleRequestForm} />
              )}

              {/* History Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                  Request History
                </h2>
                <RequestHistory />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RequestPage;
