import { useState } from "react";
import { useRequestStore } from "../stores/useRequestStore.js";
import { useUserStore } from "../stores/useUserStore.js";

const createInitialFileState = () => ({
  file: null,
  color: false,
  paper: "A4",
  layout: "portrait",
  pages: [{ start: "", stop: "" }],
  binding: false,
  bindingtype: "soft",
  sides: "single",
});

export const RequestForm = ({ handleRequestForm, requestingProfile }) => {
  const { user } = useUserStore();
  const { createRequest, fetchActiveRequests, loading } = useRequestStore();
  const [fileConfig, setFileConfig] = useState([createInitialFileState()]);

  if (!requestingProfile) {
    return (
      <div className="m-4 p-6 text-center border-2 border-dashed border-red-400 rounded-xl bg-red-50 text-red-700 font-semibold">
        Xerox profile not found.
      </div>
    );
  }

  const isOptionAvailable = (option, optionArray) => optionArray.includes(option);

  const handleFileChange = (e, index) => {
    const newFileConfig = [...fileConfig];
    newFileConfig[index].file = e.target.files[0];
    setFileConfig(newFileConfig);
  };

  const handlePagesChange = (e, fileIndex, pageIndex, field) => {
    const newFileConfig = [...fileConfig];
    newFileConfig[fileIndex].pages[pageIndex][field] = e.target.value;
    setFileConfig(newFileConfig);
  };

  const handleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const newFileConfig = [...fileConfig];
    newFileConfig[index][name] = type === "checkbox" ? checked : value;
    setFileConfig(newFileConfig);
  };

  const handleAddFile = () => setFileConfig([...fileConfig, createInitialFileState()]);
  const handleRemoveFile = (index) => setFileConfig(fileConfig.filter((_, i) => i !== index));
  const handleAddPage = (fileIndex) => {
    const newFileConfig = [...fileConfig];
    newFileConfig[fileIndex].pages.push({ start: "", stop: "" });
    setFileConfig(newFileConfig);
  };
  const handleRemovePage = (fileIndex, pageIndex) => {
    const newFileConfig = [...fileConfig];
    newFileConfig[fileIndex].pages = newFileConfig[fileIndex].pages.filter((_, i) => i !== pageIndex);
    setFileConfig(newFileConfig);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("xeroxId", requestingProfile.xeroxId);

    fileConfig.forEach((fileItem, index) => {
      if (fileItem.file) formData.append(`blobFiles`, fileItem.file);
      formData.append(`files[${index}][color]`, fileItem.color);
      formData.append(`files[${index}][paper]`, fileItem.paper);
      formData.append(`files[${index}][layout]`, fileItem.layout);
      formData.append(`files[${index}][binding]`, fileItem.binding);
      formData.append(`files[${index}][bindingtype]`, fileItem.bindingtype);
      formData.append(`files[${index}][sides]`, fileItem.sides);

      fileItem.pages.forEach((page, pageIndex) => {
        formData.append(`files[${index}][pages][${pageIndex}][start]`, page.start);
        formData.append(`files[${index}][pages][${pageIndex}][stop]`, page.stop);
      });
    });

    await createRequest({ requestData: formData });
    fetchActiveRequests({ status: "pending" });
    handleRequestForm();
  };

  return (
    <div className="m-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-emerald-600 mb-6">Add a New Xerox Request</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {fileConfig.map((fileItem, fileIndex) => (
          <div key={fileIndex} className="p-5 border border-gray-300 rounded-xl bg-gray-50 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">File {fileIndex + 1}</h3>
              <button
                type="button"
                onClick={() => handleRemoveFile(fileIndex)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Remove File
              </button>
            </div>

            {/* File Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Upload File</label>
              <input
                type="file"
                name="file"
                onChange={(e) => handleFileChange(e, fileIndex)}
                className="block w-full text-sm text-gray-700
                  file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                  file:text-sm file:font-semibold file:bg-emerald-100 file:text-emerald-700
                  hover:file:bg-emerald-200"
              />
            </div>

            <div className="flex flex-col gap-4">
              {/* Color */}
              {isOptionAvailable("color", requestingProfile.colorOption) && (
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="color"
                    checked={fileItem.color}
                    onChange={(e) => handleInputChange(e, fileIndex)}
                    className="form-checkbox h-5 w-5 text-emerald-600"
                  />
                  <span className="text-gray-800 font-medium">Color Print</span>
                </label>
              )}

              {/* Paper */}
              {requestingProfile.paperOption.length > 0 && (
                <label className="block">
                  <span className="font-medium text-gray-800">Paper Size:</span>
                  <select
                    name="paper"
                    value={fileItem.paper}
                    onChange={(e) => handleInputChange(e, fileIndex)}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 shadow-sm focus:ring-emerald-400 focus:border-emerald-400 outline-none"
                  >
                    {requestingProfile.paperOption.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {/* Layout */}
              {requestingProfile.layoutOption.length > 0 && (
                <label className="block">
                  <span className="font-medium text-gray-800">Layout:</span>
                  <select
                    name="layout"
                    value={fileItem.layout}
                    onChange={(e) => handleInputChange(e, fileIndex)}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 shadow-sm focus:ring-emerald-400 focus:border-emerald-400 outline-none"
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
              <div className="border p-3 rounded-lg bg-white shadow-sm">
                <h4 className="font-semibold mb-2 text-gray-800">Pages to Print</h4>
                {fileItem.pages.map((page, pageIndex) => (
                  <div key={pageIndex} className="flex gap-3 mb-2 items-center">
                    <label className="flex flex-col">
                      <span className="text-gray-600 text-sm">Start</span>
                      <input
                        type="number"
                        value={page.start}
                        onChange={(e) => handlePagesChange(e, fileIndex, pageIndex, "start")}
                        className="w-20 rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 shadow-sm focus:ring-emerald-400 focus:border-emerald-400 outline-none"
                      />
                    </label>
                    <label className="flex flex-col">
                      <span className="text-gray-600 text-sm">Stop</span>
                      <input
                        type="number"
                        value={page.stop}
                        onChange={(e) => handlePagesChange(e, fileIndex, pageIndex, "stop")}
                        className="w-20 rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 shadow-sm focus:ring-emerald-400 focus:border-emerald-400 outline-none"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemovePage(fileIndex, pageIndex)}
                      className="text-red-500 hover:text-red-700 font-semibold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddPage(fileIndex)}
                  className="mt-2 text-sm text-blue-500 hover:text-blue-700 font-medium"
                >
                  + Add Page Range
                </button>
              </div>

              {/* Binding */}
              {requestingProfile.bindingOption.length > 0 && (
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    name="binding"
                    checked={fileItem.binding}
                    onChange={(e) => handleInputChange(e, fileIndex)}
                    className="form-checkbox h-5 w-5 text-emerald-600"
                  />
                  <span className="text-gray-800 font-medium">Binding</span>
                </label>
              )}

              {fileItem.binding && requestingProfile.bindingOption.length > 0 && (
                <label className="block mt-1">
                  <span className="font-medium text-gray-800">Binding Type:</span>
                  <select
                    name="bindingtype"
                    value={fileItem.bindingtype}
                    onChange={(e) => handleInputChange(e, fileIndex)}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 shadow-sm focus:ring-emerald-400 focus:border-emerald-400 outline-none"
                  >
                    {requestingProfile.bindingOption.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {/* Sides */}
              {requestingProfile.sidesOption.length > 0 && (
                <label className="block mt-2">
                  <span className="font-medium text-gray-800">Sides:</span>
                  <select
                    name="sides"
                    value={fileItem.sides}
                    onChange={(e) => handleInputChange(e, fileIndex)}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 shadow-sm focus:ring-emerald-400 focus:border-emerald-400 outline-none"
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
          </div>
        ))}

        {/* Add Another File */}
        <button
          type="button"
          onClick={handleAddFile}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition duration-300"
        >
          + Add Another File
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-xl font-bold text-white transition duration-300 ${
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
