// import React from 'react';

// export const RequestDisplay = ({ requests }) => {
//   return (
//     <div className="flex flex-col space-y-4 p-4">
//       {requests.map((request) => (
//         <div
//           key={request._id}
//           className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
//         >
//           <div className="text-sm text-gray-500 mb-2">Request ID: {request._id}</div>
//           <div className="text-md font-semibold text-gray-800 mb-1">Status: {request.status}</div>
//           <div className="text-sm text-gray-500 mb-3">
//             Created At: {new Date(request.createdAt).toLocaleString()}
//           </div>

//           <div className="text-gray-700 font-medium mb-2">Files:</div>

//           {request.files.map((file) => (
//             <div
//               key={file._id}
//               className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3 hover:bg-gray-100 transition-colors duration-200"
//             >
//               <div className="text-sm text-gray-600 mb-1">
//                 File URL:{" "}
//                 <a
//                   href={file.file}
//                   className="text-emerald-500 underline hover:text-emerald-600"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {file.file}
//                 </a>
//               </div>
//               <div className="text-sm text-gray-700 mb-1">Color: {file.color ? "Yes" : "No"}</div>
//               <div className="text-sm text-gray-700 mb-1">Paper Size: {file.paper}</div>
//               <div className="text-sm text-gray-700 mb-1">Layout: {file.layout}</div>
//               <div className="text-sm text-gray-700 mb-1">
//                 Pages: {file.pages.map((page) => `(${page.start}-${page.stop})`).join(", ")}
//               </div>
//               <div className="text-sm text-gray-700 mb-1">
//                 Binding: {file.binding ? `Yes (${file.bindingtype})` : "No"}
//               </div>
//               <div className="text-sm text-gray-700">Sides: {file.sides}</div>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

import React from 'react';

export const RequestDisplay = ({ requests }) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    inProgress: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="flex flex-col space-y-6 p-4">
      {requests.map((request) => (
        <div
          key={request._id}
          className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm text-gray-500">Request ID: {request._id}</div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                statusColors[request.status] || "bg-gray-100 text-gray-800"
              }`}
            >
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </div>

          <div className="text-sm text-gray-400 mb-4">
            Created At: {new Date(request.createdAt).toLocaleString()}
          </div>

          <div className="text-gray-800 font-semibold mb-2 text-lg">Files:</div>

          <div className="space-y-4">
            {request.files.map((file) => (
              <div
                key={file._id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="text-sm text-gray-600 mb-1">
                  File URL:{" "}
                  <a
                    href={file.file}
                    className="text-emerald-500 underline hover:text-emerald-600 break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.file}
                  </a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
                  <div>
                    <span className="font-medium">Color:</span> {file.color ? "Yes" : "No"}
                  </div>
                  <div>
                    <span className="font-medium">Paper:</span> {file.paper}
                  </div>
                  <div>
                    <span className="font-medium">Layout:</span> {file.layout}
                  </div>
                  <div>
                    <span className="font-medium">Pages:</span>{" "}
                    {file.pages.map((page) => `(${page.start}-${page.stop})`).join(", ")}
                  </div>
                  <div>
                    <span className="font-medium">Binding:</span>{" "}
                    {file.binding ? `Yes (${file.bindingtype})` : "No"}
                  </div>
                  <div>
                    <span className="font-medium">Sides:</span> {file.sides}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
