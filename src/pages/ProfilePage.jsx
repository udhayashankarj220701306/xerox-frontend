import {useEffect,useState} from 'react'

import { useUserStore } from '../stores/useUserStore.js';

import LoadingSpinner from '../components/LoadingSpinner.jsx';
import DashboardPage from '../components/DashboardPage.jsx';

export const ProfilePage = () => {
  const {profile,getProfile} = useUserStore();
  useEffect(() => {
    getProfile();
    // console.log("profilepage:", profile);
  }, []);

  if (!profile) return <div>Loading...</div>;
  return (
    <>
      <div className="flex flex-col justify-center py-12 mt-6 sm:px-6 lg:px-8">
      <DashboardPage profile={profile} />
      </div>
    </>
  );
}

// const profileData = {
//   _id: "68d435801e90acf1551df374",
//   name: "xerox",
//   email: "x@b.c",
//   role: "xerox",
//   isLocked: false,
//   createdAt: "2025-09-24T18:16:32.372Z",
//   updatedAt: "2025-09-24T18:16:32.372Z",
//   __v: 0,
//   xeroxProfile: {
//     _id: "68d4452b1e90acf1551df377",
//     xeroxId: "68d435801e90acf1551df374",
//     rating: 0,
//     colorOption: ["bw", "color"],
//     paperOption: ["A4", "A5"],
//     layoutOption: ["potrait"],
//     sidesOption: ["single", "double"],
//     bindingOption: ["soft", "spiral"],
//     __v: 0,
//   },
// };
// const profileData = {
//   _id: "68d033cd748111f828461f57",
//   name: "Udhaya",
//   email: "a@b.c",
//   role: "student",
//   isLocked: false,
//   createdAt: "2025-09-21T17:20:13.122Z",
//   updatedAt: "2025-09-21T17:20:13.122Z",
//   __v: 0,
// };