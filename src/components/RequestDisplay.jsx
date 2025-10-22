import { useEffect, useState } from "react";
import Switch from "react-switch";
import { useUserStore } from "../stores/useUserStore.js";
import { useRequestStore } from "../stores/useRequestStore.js";

export const RequestDisplay = ({ requestPara }) => {
  const [request, setRequest] = useState(requestPara);
  const { lock, user } = useUserStore();
  const { updateStatus, fetchRequestHistory, fetchActiveRequests } =
    useRequestStore();
  const handleIsLockedUser = async ({ userId, isLocked }) => {
    await lock({ userId, isLocked });
    // console.log("handleIsLockedUser:", { userId, isLocked });
    setRequest({
      ...request,
      userId: { ...request.userId, isLocked: isLocked },
    });
  };
  const handleStatusChange = async (requestId, newStatus) => {
    const asyncUpdateStatus = async ({ requestId, newStatus }) => {
      await updateStatus({ requestId, newStatus });
      await fetchActiveRequests();
      await fetchRequestHistory();
    };
    asyncUpdateStatus({ requestId, newStatus });
    // console.log(`Request ID: ${requestId}, New Status: ${newStatus}`);
    setRequest({ ...request, status: newStatus });
  };
  useEffect(() => {
    setRequest(requestPara);
    // console.log("requestPara:", requestPara);
  }, [requestPara]);
  return (
    <div
      key={request._id}
      className="m-2 p-2 border-2 border-gray-300 rounded-lg  break-words"
    >
      <div className="flex flex-row justify-between ">
        <div>Request ID: {request._id}</div>
        {user.role === "xerox" && request.userId.isLocked && (
          <div>
            Lock:{" "}
            <Switch
              checked={request.userId.isLocked}
              onChange={() => {
                handleIsLockedUser({
                  userId: request.userId._id,
                  isLocked: !request.userId.isLocked,
                });
              }}
            />
          </div>
        )}
      </div>
      <div>
        Status:{" "}
        {user.role === "xerox" ? (
        <select
          value={request.status}
          onChange={(e) => handleStatusChange(request._id, e.target.value)}
          className="ml-2 rounded border border-gray-300 p-1 bg-gray-400"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>) : (
          <span className="font-bold ml-2">{request.status}</span>
        )
}
      </div>
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
  );
};
