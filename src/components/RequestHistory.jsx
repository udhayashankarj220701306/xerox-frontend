// import React from 'react'
// import { useRequestStore } from '../stores/useRequestStore';
// import { RequestDisplay } from './RequestDisplay.jsx';

// export const RequestHistory = () => {
  
//   const { requestHistory, fetchRequestHistory } = useRequestStore();

//   React.useEffect(() => {
//     fetchRequestHistory({ status: "completed" });
//     console.log("requestHistory",requestHistory);
//   }, []);
//   return (
//     <div className="m-2 border-2 border-dashed border-gray-600 rounded-lg p-2 ">
//       RequestHistory
//       <RequestDisplay requests={requestHistory} />
//     </div>
//   );
// }

import React, { useEffect } from 'react';
import { useRequestStore } from '../stores/useRequestStore';
import { RequestDisplay } from './RequestDisplay.jsx';

export const RequestHistory = () => {
  const { requestHistory, fetchRequestHistory, loading } = useRequestStore();

  // Fetch completed requests on mount
  useEffect(() => {
    fetchRequestHistory({ status: "completed" });
  }, [fetchRequestHistory]);

  return (
    <div className="m-4 p-4 bg-gray-50 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-emerald-600 mb-4">
        Completed Requests
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading requests...</div>
      ) : requestHistory.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No completed requests found.
        </div>
      ) : (
        <RequestDisplay requests={requestHistory} />
      )}
    </div>
  );
};
