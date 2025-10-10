// import { useEffect, useState } from "react";
// import { useXeroxStore } from "../stores/useXeroxStore.js";
// import { RequestForm } from "../components/RequestForm.jsx";

// export const XeroxPage = () => {
//   const { xeroxProfiles, fetchXeroxProfiles } = useXeroxStore();
//   const [requestForm, setRequestForm] = useState(false);
//   const [requestingProfile, setRequestingProfile] = useState(null);

//   const handleRequestForm = () => {
//     setRequestForm(!requestForm);
//   };
//   useEffect(() => {
//     fetchXeroxProfiles();
//   }, [fetchXeroxProfiles]);

//   // Use a conditional check to handle the case where xeroxProfiles is empty
//   // or not yet loaded.
//   if (!xeroxProfiles || xeroxProfiles.length === 0) {
//     return <div>No Xerox profiles available.</div>;
//   }

//   return (
//     <div className="flex flex-col justify-center py-12 mt-6 sm:px-6 lg:px-8">
//       {requestForm ? (
//         <RequestForm handleRequestForm={handleRequestForm} requestingProfile={requestingProfile}/>
//       ) : (
//         <>
//           <h1 className="text-2xl font-bold mb-4 text-emerald-500">
//             Xerox Profiles
//           </h1>
//           <div className="m-2 border-2 border-dashed border-gray-600 rounded-lg p-2 ">
//             {xeroxProfiles.map((profile) => (
//               <div
//                 key={profile._id}
//                 className="rounded-lg shadow-md p-6"
//                 onClick={() => {
//                   setRequestingProfile(profile);
//                   handleRequestForm();
//                 }}
//               >
//                 <h2 className="text-xl font-semibold mb-2">
//                   Xerox ID: {profile.xeroxId}
//                 </h2>
//                 <div className="mt-4">
//                   <h3 className="text-lg font-medium">Options:</h3>
//                   <ul className="list-disc list-inside mt-2 space-y-2">
//                     <li>
//                       <strong>Color:</strong> {profile.colorOption.join(", ")}
//                     </li>
//                     <li>
//                       <strong>Paper:</strong> {profile.paperOption.join(", ")}
//                     </li>
//                     <li>
//                       <strong>Layout:</strong> {profile.layoutOption.join(", ")}
//                     </li>
//                     <li>
//                       <strong>Sides:</strong> {profile.sidesOption.join(", ")}
//                     </li>
//                     <li>
//                       <strong>Binding:</strong>{" "}
//                       {profile.bindingOption.join(", ")}
//                     </li>
//                   </ul>
//                 </div>
//                 {/* <p className="mt-4 text-sm text-gray-600">
//               Rating: {profile.rating}
//             </p> */}
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// import { useEffect, useState } from "react";
// import { useXeroxStore } from "../stores/useXeroxStore.js";
// import { RequestForm } from "../components/RequestForm.jsx";
// import Navbar from "../components/Navbar.jsx"; // Import Navbar

// export const XeroxPage = () => {
//   const { xeroxProfiles, fetchXeroxProfiles } = useXeroxStore();
//   const [requestForm, setRequestForm] = useState(false);
//   const [requestingProfile, setRequestingProfile] = useState(null);

//   const handleRequestForm = () => setRequestForm(!requestForm);

//   useEffect(() => {
//     fetchXeroxProfiles();
//   }, [fetchXeroxProfiles]);

//   if (!xeroxProfiles || xeroxProfiles.length === 0) {
//     return (
//       <>
//         <Navbar />
//         <div className="pt-28 flex justify-center items-center min-h-screen bg-gray-50">
//           <p className="text-gray-700 text-lg">No Xerox profiles available.</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="pt-28 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
//         {requestForm ? (
//           <RequestForm
//             handleRequestForm={handleRequestForm}
//             requestingProfile={requestingProfile}
//           />
//         ) : (
//           <>
//             <h1 className="text-3xl font-bold mb-6 text-emerald-500 text-center">
//               Xerox Profiles
//             </h1>
//             <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//               {xeroxProfiles.map((profile) => (
//                 <div
//                   key={profile._id}
//                   className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow cursor-pointer border border-gray-200"
//                   onClick={() => {
//                     setRequestingProfile(profile);
//                     handleRequestForm();
//                   }}
//                 >
//                   <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                     Xerox ID: {profile.xeroxId}
//                   </h2>
//                   <div className="space-y-2">
//                     <p>
//                       <span className="font-medium">Color:</span>{" "}
//                       {profile.colorOption.length > 0
//                         ? profile.colorOption.join(", ")
//                         : "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Paper:</span>{" "}
//                       {profile.paperOption.length > 0
//                         ? profile.paperOption.join(", ")
//                         : "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Layout:</span>{" "}
//                       {profile.layoutOption.length > 0
//                         ? profile.layoutOption.join(", ")
//                         : "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Sides:</span>{" "}
//                       {profile.sidesOption.length > 0
//                         ? profile.sidesOption.join(", ")
//                         : "N/A"}
//                     </p>
//                     <p>
//                       <span className="font-medium">Binding:</span>{" "}
//                       {profile.bindingOption.length > 0
//                         ? profile.bindingOption.join(", ")
//                         : "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default XeroxPage;

import { useEffect, useState } from "react";
import { useXeroxStore } from "../stores/useXeroxStore.js";
import { RequestForm } from "../components/RequestForm.jsx";
import Navbar from "../components/Navbar.jsx";

export const XeroxPage = () => {
  const { xeroxProfiles, fetchXeroxProfiles } = useXeroxStore();
  const [requestForm, setRequestForm] = useState(false);
  const [requestingProfile, setRequestingProfile] = useState(null);

  const handleRequestForm = () => setRequestForm(!requestForm);

  useEffect(() => {
    fetchXeroxProfiles();
  }, [fetchXeroxProfiles]);

  if (!xeroxProfiles || xeroxProfiles.length === 0) {
    return (
      <>
        <Navbar />
        <div className="pt-28 flex justify-center items-center min-h-screen bg-gray-100">
          <p className="text-gray-900 text-lg font-medium">No Xerox profiles available.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-28 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-100">
        {requestForm ? (
          <RequestForm
            handleRequestForm={handleRequestForm}
            requestingProfile={requestingProfile}
          />
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6 text-emerald-600 text-center">
              Xerox Profiles
            </h1>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {xeroxProfiles.map((profile) => (
                <div
                  key={profile._id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow cursor-pointer border border-gray-300"
                  onClick={() => {
                    setRequestingProfile(profile);
                    handleRequestForm();
                  }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Xerox ID: {profile.xeroxId}
                  </h2>
                  <div className="space-y-2 text-gray-800">
                    <p>
                      <span className="font-medium">Color:</span>{" "}
                      {profile.colorOption.length > 0
                        ? profile.colorOption.join(", ")
                        : "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Paper:</span>{" "}
                      {profile.paperOption.length > 0
                        ? profile.paperOption.join(", ")
                        : "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Layout:</span>{" "}
                      {profile.layoutOption.length > 0
                        ? profile.layoutOption.join(", ")
                        : "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Sides:</span>{" "}
                      {profile.sidesOption.length > 0
                        ? profile.sidesOption.join(", ")
                        : "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Binding:</span>{" "}
                      {profile.bindingOption.length > 0
                        ? profile.bindingOption.join(", ")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default XeroxPage;
