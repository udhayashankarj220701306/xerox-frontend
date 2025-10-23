import React, { useState, useEffect } from "react";
import { useXeroxStore } from "../stores/useXeroxStore";

const CheckboxGroup = ({
  label,
  fieldKey,
  allOptions,
  selectedOptions,
  onChange,
}) => (
  <fieldset className="mb-4">
    <legend className="font-medium text-white mb-2">{label}:</legend>
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {allOptions.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 text-gray-200 cursor-pointer"
        >
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 rounded text-blue-600 bg-gray-700 border-gray-500"
            value={option}
            // Check if this option is in the selected array
            checked={selectedOptions.includes(option)}
            // Pass the fieldKey (e.g., "colorOption") and the value (e.g., "bw")
            onChange={() => onChange(fieldKey, option)}
          />
          <span className="capitalize">{option}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

const DashboardPage = ({ profile }) => {
  // console.log("dashboard:", profile);
  const { xeroxProfile } = profile;
  console.log("dashboard xeroxProfile:", xeroxProfile);
  const [formData, setFormData] = useState(xeroxProfile);
  const { updateXeroxProfile } = useXeroxStore();

  const onSave = async ({ id, profileData }) => {
    await updateXeroxProfile({ id, profileData });
  };

  useEffect(() => {
    setFormData(xeroxProfile);
  }, [xeroxProfile]);

  const allOptions = {
    colorOption: ["bw", "color"],
    paperOption: ["A4", "A3", "A5"],
    layoutOption: ["potrait", "landscape"],
    sidesOption: ["single", "double"],
    bindingOption: ["soft", "spiral"],
  };

  const handleNameChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  // Generic handler for all checkbox groups
  const handleCheckboxChange = (fieldKey, value) => {
    const currentOptions = formData[fieldKey] || [];
    const isChecked = currentOptions.includes(value);
    let newOptions;

    if (isChecked) {
      // It was checked, now it's unchecked: REMOVE it
      newOptions = currentOptions.filter((item) => item !== value);
    } else {
      // It was unchecked, now it's checked: ADD it
      newOptions = [...currentOptions, value];
    }

    // Update the state
    setFormData((prev) => ({
      ...prev,
      [fieldKey]: newOptions,
    }));
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSave function (passed as a prop) with the updated data
    onSave({ id: xeroxProfile._id, profileData:formData });
    console.log("Saving data:", formData);
    // You could show a "Saved!" message here
  };

  const renderContent = ({ activeSection }) => {
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
          <form
            onSubmit={handleSubmit}
            className="bg-gray-700 rounded-lg p-6 max-w-lg mx-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>

            {/* --- Name Input --- */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block font-medium text-white mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleNameChange}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* --- Checkbox Groups --- */}
            <CheckboxGroup
              label="Color Options"
              fieldKey="colorOption"
              allOptions={allOptions.colorOption}
              selectedOptions={formData.colorOption}
              onChange={handleCheckboxChange}
            />

            <CheckboxGroup
              label="Paper Options"
              fieldKey="paperOption"
              allOptions={allOptions.paperOption}
              selectedOptions={formData.paperOption}
              onChange={handleCheckboxChange}
            />

            <CheckboxGroup
              label="Layout Options"
              fieldKey="layoutOption"
              allOptions={allOptions.layoutOption}
              selectedOptions={formData.layoutOption}
              onChange={handleCheckboxChange}
            />

            <CheckboxGroup
              label="Sides Options"
              fieldKey="sidesOption"
              allOptions={allOptions.sidesOption}
              selectedOptions={formData.sidesOption}
              onChange={handleCheckboxChange}
            />

            <CheckboxGroup
              label="Binding Options"
              fieldKey="bindingOption"
              allOptions={allOptions.bindingOption}
              selectedOptions={formData.bindingOption}
              onChange={handleCheckboxChange}
            />

            {/* --- Save Button --- */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
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
