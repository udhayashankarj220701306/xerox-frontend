import React from 'react'

export const StudentProfile = ({studentProfile}) => {
  return (
    <div className="bg-gray-600 shadow-md rounded-lg p-6">
      <p>
        <span className="font-medium">Name:</span> {studentProfile.name}
      </p>
      <p>
        <span className="font-medium">Email:</span> {studentProfile.email}
      </p>
      <p>
        <span className="font-medium">Role:</span> {studentProfile.role}
      </p>
      <p>
        <span className="font-medium">Account Locked:</span>{" "}
        {studentProfile.isLocked ? "Yes" : "No"}
      </p>
      <p>
        <span className="font-medium">Created At:</span>{" "}
        {new Date(studentProfile.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
