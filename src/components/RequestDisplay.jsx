import React from 'react'

export const RequestDisplay = ({requests}) => {
  return (
    <div className="flex flex-col bg-gray-500 rounded-lg p-2">
      {requests.map((request) => (
        <div
          key={request._id}
          className="m-2 p-2 border-2 border-gray-300 rounded-lg  break-words"
        >
          <div>Request ID: {request._id}</div>
          <div>Status: {request.status}</div>
          <div>Created At: {new Date(request.createdAt).toLocaleString()}</div>
          <div>Files:</div>
          {request.files.map((file) => (
            <div
              key={file._id}
              className="ml-4 border-2 border-gray-400 rounded-lg p-2 mb-2"
            >
              <div>
                File URL:{" "}
                <a
                  href={file.file}
                  className="text-blue-300 underline "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.file}
                </a>
              </div>
              <div>Color: {file.color ? "Yes" : "No"}</div>
              <div>Paper Size: {file.paper}</div>
              <div>Layout: {file.layout}</div>
              <div>
                Pages:{" "}
                {file.pages
                  .map((page) => `(${page.start}-${page.stop})`)
                  .join(", ")}
              </div>
              <div>
                Binding: {file.binding ? `Yes (${file.bindingtype})` : "No"}
              </div>
              <div>Sides: {file.sides}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
