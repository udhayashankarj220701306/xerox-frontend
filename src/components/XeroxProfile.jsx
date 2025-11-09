import { useState, useEffect } from "react";
import { useXeroxStore } from "../stores/useXeroxStore";

// --- NEW COMPONENT FOR RATE INPUTS ---
const RateInputGroup = ({ label, rateKey, value, onChange }) => (
  <div className="mb-3">
    <label
      htmlFor={rateKey}
      className="block font-medium text-white mb-1 capitalize"
    >
      {label} Rate:
    </label>
    <input
      type="number"
      id={rateKey}
      // Ensure value is treated as a string for input field
      value={value !== undefined ? value : ""}
      onChange={(e) => onChange(rateKey, e.target.value)}
      className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      min="0"
      step="0.01" // Allow for decimal rates
    />
  </div>
);

// --- EXISTING CHECKBOX COMPONENT ---
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
            checked={selectedOptions.includes(option)}
            onChange={() => onChange(fieldKey, option)}
          />
          <span className="capitalize">{option}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

// --- MAIN PROFILE COMPONENT ---
export const XeroxProfile = ({ xeroxProfile }) => {
  const [formData, setFormData] = useState(xeroxProfile);
  const { updateXeroxProfile } = useXeroxStore();
  const [currentSelectedOptions, setCurrentSelectedOptions] = useState([]);

  // Ensure formData initializes correctly, especially when xeroxProfile is fetched asynchronously
  useEffect(() => {
    setFormData(xeroxProfile);
    const temp = [];
    for (const key in xeroxProfile) {
      console.log("key:", key);
      if (key != "layoutOption" && Array.isArray(xeroxProfile[key])) {
        temp.push(...xeroxProfile[key].map((item) => item.toLowerCase()));
      }
    }
    setCurrentSelectedOptions(
      temp.filter((item) => allRateKeys.includes(item))
    );
    console.log("dashboard xeroxProfile:", xeroxProfile);
    console.log("temp:", temp);
  }, [xeroxProfile]);

  const onSave = async ({ id, profileData }) => {
    // Ensure rates are numbers before sending
    const rates = Object.fromEntries(
      Object.entries(profileData.rates || {}).map(([key, value]) => [
        key,
        parseFloat(value) || 0, // Convert to number, default to 0 if NaN
      ])
    );

    const finalProfileData = { ...profileData, rates };
    console.log("Final profile data to save:", finalProfileData, profileData);
    await updateXeroxProfile({ id, profileData: profileData });
    console.log("Saving final data:", finalProfileData);
  };

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

  const handleCheckboxChange = (fieldKey, value) => {
    const currentOptions = formData[fieldKey] || [];
    const isChecked = currentOptions.includes(value);
    let newOptions;
    let temp;
    if (isChecked) {
      newOptions = currentOptions.filter((item) => item !== value);
      if (fieldKey != "layoutOption") {
        temp = currentSelectedOptions.filter((item) => item !== value);
      }
    } else {
      newOptions = [...currentOptions, value];
      if (fieldKey != "layoutOption") {
        temp = [...currentSelectedOptions, value];
        temp = temp.filter((item) => allRateKeys.includes(item));
      }
    }

    setFormData((prev) => ({
      ...prev,
      [fieldKey]: newOptions,
    }));
    if (temp) {
      setCurrentSelectedOptions(temp);
      console.log("currentSelectedOptions:", temp);
    }
  };

  // --- NEW HANDLER FOR RATES ---
  const handleRateChange = (rateKey, value) => {
    setFormData((prev) => ({
      ...prev,
      rates: {
        ...prev.rates,
        [rateKey]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: xeroxProfile._id, profileData: formData });
  };

  if (!xeroxProfile) return <p>No Xerox Profile available.</p>;

  // Define all rate keys for rendering
  const allRateKeys = [ "color", "a4", "a3", "a5", "spiral", "soft"];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-700 rounded-lg p-6  mx-auto"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>

      {/* --- Name Input --- */}
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium text-white mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={formData.name || ""} // Added default empty string for safety
          onChange={handleNameChange}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* --- Rate Inputs (NEW SECTION) --- */}
      <div className="flex flex-row">
        <div>
          <fieldset className="mb-6 border border-gray-600 p-4 rounded-lg">
            <legend className="font-medium text-white mb-4 text-lg">
              Set Rates (Per Unit)
            </legend>
            <div className="grid grid-cols-2 gap-4">
              {currentSelectedOptions.map((key) => (
                // Fallback to 0 if formData.rates is undefined or key is missing
                <RateInputGroup
                  key={key}
                  label={key.toUpperCase()}
                  rateKey={key}
                  value={formData.rates ? formData.rates[key] : 0}
                  onChange={handleRateChange}
                />
              ))}
            </div>
          </fieldset>
        </div>
        {/* --- Checkbox Groups --- */}
        <div>
          <CheckboxGroup
            label="Color Options"
            fieldKey="colorOption"
            allOptions={allOptions.colorOption}
            selectedOptions={formData.colorOption || []} // Added fallback array
            onChange={handleCheckboxChange}
          />
          {/* ... (Other Checkbox Groups) ... */}
          <CheckboxGroup
            label="Paper Options"
            fieldKey="paperOption"
            allOptions={allOptions.paperOption}
            selectedOptions={formData.paperOption || []}
            onChange={handleCheckboxChange}
          />

          <CheckboxGroup
            label="Layout Options"
            fieldKey="layoutOption"
            allOptions={allOptions.layoutOption}
            selectedOptions={formData.layoutOption || []}
            onChange={handleCheckboxChange}
          />

          <CheckboxGroup
            label="Sides Options"
            fieldKey="sidesOption"
            allOptions={allOptions.sidesOption}
            selectedOptions={formData.sidesOption || []}
            onChange={handleCheckboxChange}
          />

          <CheckboxGroup
            label="Binding Options"
            fieldKey="bindingOption"
            allOptions={allOptions.bindingOption}
            selectedOptions={formData.bindingOption || []}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>

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
};
