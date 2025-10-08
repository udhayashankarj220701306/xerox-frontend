import React from 'react'
import { useRequestStore } from '../stores/useRequestStore';
import { RequestDisplay } from './RequestDisplay.jsx';

export const RequestHistory = () => {
  
  const { requestHistory, fetchRequestHistory } = useRequestStore();

  React.useEffect(() => {
    fetchRequestHistory({ status: "completed" });
    console.log("requestHistory",requestHistory);
  }, []);
  return (
    <div className="m-2 border-2 border-dashed border-gray-600 rounded-lg p-2 ">
      RequestHistory
      <RequestDisplay requests={requestHistory} />
    </div>
  );
}
