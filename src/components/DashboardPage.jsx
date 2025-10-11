const DashboardPage = ({ profile }) => {
  
    console.log("dashboard:", profile);
  const { xeroxProfile } = profile;

  

  const renderContent = ({activeSection}) => {
    switch (activeSection) {
      case "student":
        return (
          <div className="bg-gray-600 shadow-md rounded-lg p-6">
            <p>
              <span className="font-medium">Name:</span> {profile.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {profile.email}
            </p>
            <p>
              <span className="font-medium">Role:</span> {profile.role}
            </p>
            <p>
              <span className="font-medium">Account Locked:</span>{" "}
              {profile.isLocked ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-medium">Created At:</span>{" "}
              {new Date(profile.createdAt).toLocaleString()}
            </p>
          </div>
        );
      case "xerox":
        if (!xeroxProfile) return <p>No Xerox Profile available.</p>;
        return (
          <div className="bg-gray-600 rounded-lg p-6">
            {/* <p>
              <span className="font-medium">Xerox ID:</span>{" "}
              {xeroxProfile.xeroxId}
            </p> */}
            <p>
              <span className="font-medium">Name:</span> {xeroxProfile.name}
            </p>
            <p>
              <span className="font-medium">Color Options:</span>{" "}
              {xeroxProfile.colorOption.join(", ")}
            </p>
            <p>
              <span className="font-medium">Paper Options:</span>{" "}
              {xeroxProfile.paperOption.join(", ")}
            </p>
            <p>
              <span className="font-medium">Layout Options:</span>{" "}
              {xeroxProfile.layoutOption.join(", ")}
            </p>
            <p>
              <span className="font-medium">Sides Options:</span>{" "}
              {xeroxProfile.sidesOption.join(", ")}
            </p>
            <p>
              <span className="font-medium">Binding Options:</span>{" "}
              {xeroxProfile.bindingOption.join(", ")}
            </p>
            {/* <p>
              <span className="font-medium">Rating:</span> {xeroxProfile.rating}
            </p> */}
          </div>
        );
      
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
