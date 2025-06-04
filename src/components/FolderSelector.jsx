import React from "react";

function FolderSelector({ onSeriesLoaded }) {
  const isDicomFile = async (file) => {
    const buffer = await file.slice(128, 132).arrayBuffer();
    const signature = new TextDecoder().decode(buffer);
    return signature === "DICM";
  };

  const handleFolderSelect = async () => {
    try {
      const rootHandle = await window.showDirectoryPicker();
      const seriesList = [];

      for await (const [folderName, folderHandle] of rootHandle.entries()) {
        if (folderHandle.kind === "directory") {
          const files = [];

          for await (const entry of folderHandle.values()) {
            if (entry.kind === "file") {
              const file = await entry.getFile();
              const isDicom = await isDicomFile(file);
              if (isDicom) {
                files.push(file);
              }
            }
          }

          if (files.length > 0) {
            files.sort((a, b) => a.name.localeCompare(b.name));
            seriesList.push({ name: folderName, files });
          }
        }
      }

      if (seriesList.length > 0) {
        onSeriesLoaded(seriesList);
      } else {
        alert("No valid DICOM series found.");
      }
    } catch (error) {
      console.error("Folder selection failed:", error);
    }
  };

  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      onClick={handleFolderSelect}
    >
      Select Folder
    </button>
  );
}

export default FolderSelector;
