import {useEffect} from 'react'

import { useUserStore } from '../stores/useUserStore.js';

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