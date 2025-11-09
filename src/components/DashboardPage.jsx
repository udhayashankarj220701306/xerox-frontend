import {XeroxProfile} from './XeroxProfile.jsx';
import { StudentProfile } from './StudentProfile.jsx';

const DashboardPage = ({ profile }) => {
  console.log("dashboard:", profile);
  

  const renderContent = ({ activeSection }) => {
    switch (activeSection) {
      case "student":
        return (
          <StudentProfile studentProfile={profile} />
        );
      case "xerox":
        return (<XeroxProfile xeroxProfile={profile.xeroxProfile}/>);
    }
  };

  return (
    <div>
      <div className=" text-2xl font-bold mb-4 text-emerald-500">
        {profile.role.toUpperCase()} PROFILE
        {/* Main Content */}
        <div className="">{renderContent({ activeSection: profile.role })}</div>
      </div>
    </div>
  );
};

export default DashboardPage;
