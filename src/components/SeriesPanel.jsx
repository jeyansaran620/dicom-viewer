import "../utils/cornerstoneSetup";
import React, { useEffect, useRef } from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";

function SeriesPanel({ seriesList, onSelect }) {
  const previewRefs = useRef({});

  useEffect(() => {
    seriesList.forEach((series) => {
      const firstFile = series.files[0];
      const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(firstFile);
      const element = previewRefs.current[series.name];

      if (element) {
        cornerstone.enable(element);
        cornerstone.loadImage(imageId).then((image) => {
          cornerstone.displayImage(element, image);
        });
      }
    });
  }, [seriesList]);

  return (
    <div className="h-full w-full flex flex-col bg-zinc-800 border-r border-zinc-700">
        <div className="h-14 px-4 flex items-center justify-center bg-zinc-800 border-b border-zinc-700">
        <h2 className="text-base font-semibold text-zinc-300">Preview</h2>
      </div>

      {
        seriesList.length === 0 ? 
        <div className="h-[100%] flex items-center justify-center">
         <p className=" text-center p-3 bg-zinc-800">
                Please select a folder using the top right most button to load images...
              </p> 
              </div>: null
      }

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col items-center space-y-4">
          {seriesList.map((series, index) => (
            <div
              key={index}
              onClick={() => onSelect(series)}
              className="cursor-pointer hover:border-blue-500 w-[220px] flex flex-col items-center border border-zinc-600 bg-zinc-700 rounded p-2"
              title={series.name}
            >
              <div
                ref={(el) => (previewRefs.current[series.name] = el)}
                className="w-[200px] h-[200px] bg-black mb-1 pointer-events-none rounded"
              ></div>

              <p className="text-[11px] text-zinc-200 truncate w-full text-center mb-0.5">
                {series.name}
              </p>
              <p className="text-[10px] text-zinc-400 text-center mt-0">
                {series.files.length} images
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>


  );
}

export default SeriesPanel;
