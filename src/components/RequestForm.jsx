import { useState } from "react";
import { useRequestStore } from "../stores/useRequestStore.js";
import { useUserStore } from "../stores/useUserStore.js";
import { useNavigate } from "react-router-dom";


// Initial state for a single file configuration
const createInitialFileState = () => ({
  file: null,
  color: false,
  paper: "A4",
  layout: "potrait",
  pages: [{ start: "", stop: "" }],
  binding: false,
  bindingtype: "soft",
  sides: "single",
});

export const RequestForm = ({ handleRequestForm, requestingProfile }) => {
  const { user } = useUserStore();
  const { createRequest, fetchActiveRequests, loading } = useRequestStore();
  const [fileConfig, setFileConfig] = useState([createInitialFileState()]);
  const navigate = useNavigate();


  // Make sure requestingProfile is available and not null
  if (!requestingProfile) {
    return (
      <div className="m-2 p-4 text-center border-2 border-dashed border-red-400 rounded-lg">
        Xerox profile not found.
      </div>
    );
  }

  // Helper function to check if an option is available
  const isOptionAvailable = (option, optionArray) => {
    return optionArray.includes(option);
  };

  const handleFileChange = (e, index) => {
    const newFileConfig = [...fileConfig];
    newFileConfig[index].file = e.target.files[0];
    setFileConfig(newFileConfig);
  };

  const handlePagesChange = (e, fileIndex, pageIndex, field) => {
    const newFileConfig = [...fileConfig];
    const newPages = [...newFileConfig[fileIndex].pages];
    newPages[pageIndex][field] = e.target.value;
    newFileConfig[fileIndex].pages = newPages;
    setFileConfig(newFileConfig);
  };

  const handleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const newFileConfig = [...fileConfig];
    newFileConfig[index][name] = type === "checkbox" ? checked : value;
    setFileConfig(newFileConfig);
  };

  const handleAddFile = () => {
    setFileConfig([...fileConfig, createInitialFileState()]);
  };

  const handleRemoveFile = (index) => {
    const newFileConfig = fileConfig.filter((_, i) => i !== index);
    setFileConfig(newFileConfig);
  };

  const handleAddPage = (fileIndex) => {
    const newFileConfig = [...fileConfig];
    newFileConfig[fileIndex].pages.push({ start: "", stop: "" });
    setFileConfig(newFileConfig);
  };

  const handleRemovePage = (fileIndex, pageIndex) => {
    const newFileConfig = [...fileConfig];
    const newPages = newFileConfig[fileIndex].pages.filter(
      (_, i) => i !== pageIndex
    );
    newFileConfig[fileIndex].pages = newPages;
    setFileConfig(newFileConfig);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("xeroxId", requestingProfile.xeroxId._id); 

    fileConfig.forEach((fileItem, index) => {
      if (fileItem.file) {
        formData.append(`blobFiles`, fileItem.file);
      }
      
      formData.append(`files[${index}][color]`, fileItem.color);
      formData.append(`files[${index}][paper]`, fileItem.paper);
      formData.append(`files[${index}][layout]`, fileItem.layout);
      formData.append(`files[${index}][binding]`, fileItem.binding);
      formData.append(`files[${index}][bindingtype]`, fileItem.bindingtype);
      formData.append(`files[${index}][sides]`, fileItem.sides);

      fileItem.pages.forEach((page, pageIndex) => {
        formData.append(
          `files[${index}][pages][${pageIndex}][start]`,
          page.start
        );
        formData.append(
          `files[${index}][pages][${pageIndex}][stop]`,
          page.stop
        );
      });
    });

    await createRequest({ requestData: formData });
    fetchActiveRequests({ status: "pending" });
    navigate("/request");
  };

  return (
    <div className="m-2 p-2 border-2 border-emerald-400 rounded-lg border-dashed">
      <h2 className="text-xl font-semibold text-center text-emerald-600 mb-4">
        Add a New Xerox Request
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {fileConfig.map((fileItem, fileIndex) => (
          <div
            key={fileIndex}
            className="p-4 border border-gray-300 rounded-md"
          >
            <h3 className="text-lg font-medium mb-2">File {fileIndex + 1}</h3>
            {/* ... other file input and page logic ... */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Upload File
              </label>
              <input
                type="file"
                name="file"
                onChange={(e) => handleFileChange(e, fileIndex)}
                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-emerald-50 file:text-emerald-700
                hover:file:bg-emerald-100"
              />
            </div>

            <div className="flex flex-col gap-4">
              {/* Conditional rendering for color option */}
              {isOptionAvailable("color", requestingProfile.colorOption) && (
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="color"
                    checked={fileItem.color}
                    onChange={(e) => handleInputChange(e, fileIndex)}
                    className="form-checkbox h-5 w-5 text-emerald-600"
                  />
                  <span>Color Print</span>
                </label>
              )}
              {/* Conditional rendering for paper option */}
              {requestingProfile.paperOption.length > 0 && (
                <label className="block">
                  <span>Paper Size:</span>
                  <select
                    name="paper"
                    value={fileItem.paper}
                    onChange={(e) => handleInputChange(e, fileIndex)}
                    className="mt-1 block w-full rounded-md bg-gray-600 border-gray-300 shadow-sm"
                  >
                    {requestingProfile.paperOption.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {/* Conditional rendering for layout option */}
              {requestingProfile.layoutOption.length > 0 && (
                <label className="block">
                  <span>Layout:</span>
                  <select
                    name="layout"
                    value={fileItem.layout}
                    onChange={(e) => handleInputChange(e, fileIndex)}
                    className="mt-1 block w-full rounded-md bg-gray-600 border-gray-300 shadow-sm"
                  >
                    {requestingProfile.layoutOption.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {/* Pages */}
              <div className="border p-2 rounded-md">
                <h4 className="font-semibold mb-2">Pages to Print</h4>
                {fileItem.pages.map((page, pageIndex) => (
                  <div key={pageIndex} className="flex gap-2 mb-2">
                    <label>
                      Start:
                      <input
                        type="number"
                        value={page.start}
                        onChange={(e) =>
                          handlePagesChange(e, fileIndex, pageIndex, "start")
                        }
                        className="w-16 ml-1 rounded-md bg-gray-600 border-gray-300"
                      />
                    </label>
                    <label>
                      Stop:
                      <input
                        type="number"
                        value={page.stop}
                        onChange={(e) =>
                          handlePagesChange(e, fileIndex, pageIndex, "stop")
                        }
                        className="w-16 ml-1 rounded-md bg-gray-600 border-gray-300"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemovePage(fileIndex, pageIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddPage(fileIndex)}
                  className="mt-2 text-sm text-blue-500 hover:text-blue-700"
                >
                  + Add Page Range
                </button>
              </div>
              {/* Conditional rendering for binding option */}
              {requestingProfile.bindingOption.length > 0 && (
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="binding"
                    checked={fileItem.binding}
                    onChange={(e) => handleInputChange(e, fileIndex)}
                    className="form-checkbox h-5 w-5 text-emerald-600"
                  />
                  <span>Binding</span>
                </label>
              )}
              {fileItem.binding &&
                requestingProfile.bindingOption.length > 0 && (
                  <label className="block">
                    <span>Binding Type:</span>
                    <select
                      name="bindingtype"
                      value={fileItem.bindingtype}
                      onChange={(e) => handleInputChange(e, fileIndex)}
                      className="mt-1 block bg-gray-600 w-full rounded-md border-gray-300 shadow-sm"
                    >
                      {requestingProfile.bindingOption.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              {/* Conditional rendering for sides option */}
              {requestingProfile.sidesOption.length > 0 && (
                <label className="block">
                  <span>Sides:</span>
                  <select
                    name="sides"
                    value={fileItem.sides}
                    onChange={(e) => handleInputChange(e, fileIndex)}
                    className="mt-1 block w-full bg-gray-600 rounded-md border-gray-300 shadow-sm"
                  >
                    {requestingProfile.sidesOption.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleRemoveFile(fileIndex)}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Remove File
            </button>
          </div>
        ))}
        {/* Add more files button */}
        <button
          type="button"
          onClick={handleAddFile}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Add Another File
        </button>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-md font-bold text-white transition duration-300 ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
