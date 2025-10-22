import { useEffect, useState } from "react";
import { useXeroxStore } from "../stores/useXeroxStore.js";
import { RequestForm } from "../components/RequestForm.jsx";
import {useUserStore} from "../stores/useUserStore.js";
import {toast} from "react-hot-toast";

export const XeroxPage = () => {
  const {user} = useUserStore();
  const { xeroxProfiles, fetchXeroxProfiles } = useXeroxStore();
  const [requestForm, setRequestForm] = useState(false);
  const [requestingProfile, setRequestingProfile] = useState(null);

  const handleRequestForm = () => {
    if (user && (!user.isLocked)) {
      setRequestForm(!requestForm);
    } else {
      toast.error("Complete Your Pending Request to Make New Requests.");
    }
  };
  useEffect(() => {
    fetchXeroxProfiles();
  }, [fetchXeroxProfiles]);

  // Use a conditional check to handle the case where xeroxProfiles is empty
  // or not yet loaded.
  if (!xeroxProfiles || xeroxProfiles.length === 0) {
    return <div>No Xerox profiles available.</div>;
  }

  return (
    <div className="flex flex-col justify-center py-12 mt-6 sm:px-6 lg:px-8">
      {requestForm ? (
        <RequestForm
          handleRequestForm={handleRequestForm}
          requestingProfile={requestingProfile}
        />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-emerald-500">
            Xerox Profiles
          </h1>
          <div className="m-2 border-2 border-dashed border-gray-600 rounded-lg p-2 ">
            {xeroxProfiles.map((profile) => (
              <div
                key={profile._id}
                className="rounded-lg shadow-md p-6"
                onClick={() => {
                  setRequestingProfile(profile);
                  handleRequestForm();
                }}
              >
                <h2 className="text-xl font-semibold mb-2">
                  Xerox Name: {profile.name}
                </h2>
                <div className="mt-4">
                  <h3 className="text-lg font-medium">Options:</h3>
                  <ul className="list-disc list-inside mt-2 space-y-2">
                    <li>
                      <strong>Color:</strong> {profile.colorOption.join(", ")}
                    </li>
                    <li>
                      <strong>Paper:</strong> {profile.paperOption.join(", ")}
                    </li>
                    <li>
                      <strong>Layout:</strong> {profile.layoutOption.join(", ")}
                    </li>
                    <li>
                      <strong>Sides:</strong> {profile.sidesOption.join(", ")}
                    </li>
                    <li>
                      <strong>Binding:</strong>{" "}
                      {profile.bindingOption.join(", ")}
                    </li>
                  </ul>
                </div>
                {/* <p className="mt-4 text-sm text-gray-600">
              Rating: {profile.rating}
            </p> */}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
