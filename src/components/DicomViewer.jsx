import "../utils/cornerstoneSetup";
import { useEffect, useRef, useState } from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from "cornerstone-tools";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import ViewerToolbar from "./ViewerToolbar";

function DicomViewer({ files, initialIndex = 0, label = "" }) {
  const viewerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInverted, setIsInverted] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const zoomLevelRef = useRef(1);
  const isHoveringRef = useRef(false);

  const handleInvertToggle = () => {
    const element = viewerRef.current;
    const viewport = cornerstone.getViewport(element);
    viewport.invert = !viewport.invert;
    setIsInverted(viewport.invert);
    cornerstone.setViewport(element, viewport);
  };

  const handleReset = () => {
    const element = viewerRef.current;
    cornerstone.reset(element);
    zoomLevelRef.current = 1;
    setZoomLevel(1);
    setIsInverted(false);
  };

  const zoomDicomImage = (direction) => {
    const element = viewerRef.current;
    const viewport = cornerstone.getViewport(element);
    const factor = direction === "in" ? 1.1 : 0.9;
    viewport.scale *= factor;
    cornerstone.setViewport(element, viewport);
    zoomLevelRef.current = viewport.scale;
    setZoomLevel(viewport.scale);
  };

  useEffect(() => {
    if (!files.length) return;

    const element = viewerRef.current;
    cornerstone.disable(element);
    cornerstone.enable(element);

    const imageIds = files.map((file) =>
      cornerstoneWADOImageLoader.wadouri.fileManager.add(file)
    );

    const stack = {
      currentImageIdIndex: initialIndex,
      imageIds,
    };

    const handleImageRendered = () => {
      const stackData = cornerstoneTools.getToolState(element, "stack");
      const current = stackData?.data?.[0]?.currentImageIdIndex ?? 0;
      setCurrentIndex(current);

      const viewport = cornerstone.getViewport(element);
      zoomLevelRef.current = viewport.scale;
      setZoomLevel(viewport.scale);
      setIsInverted(viewport.invert);
    };

    cornerstone.loadImage(imageIds[initialIndex]).then((image) => {
      cornerstone.displayImage(element, image);
      cornerstoneTools.addStackStateManager(element, ["stack"]);
      cornerstoneTools.addToolState(element, "stack", stack);
      cornerstoneTools.addToolForElement(element, cornerstoneTools.StackScrollMouseWheelTool);
      cornerstoneTools.addToolForElement(element, cornerstoneTools.PanTool);

      requestAnimationFrame(() => {
        cornerstoneTools.setToolActiveForElement(element, "StackScrollMouseWheel", {});
        cornerstoneTools.setToolActiveForElement(element, "Pan", { mouseButtonMask: 1 });
      });
    });

    element.addEventListener("cornerstoneimagerendered", handleImageRendered);

    const handleWheel = (e) => {
      if (!isHoveringRef.current || !e.ctrlKey) return;
      e.preventDefault();
      const direction = e.deltaY > 0 ? "out" : "in";
      zoomDicomImage(direction);
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("cornerstoneimagerendered", handleImageRendered);
      element.removeEventListener("wheel", handleWheel);
      cornerstone.disable(element);
    };
  }, [files]);

  return (
    <div className="relative w-full h-full">
      <ViewerToolbar
        isInverted={isInverted}
        onToggleInvert={handleInvertToggle}
        onReset={handleReset}
      />

      <div
        ref={viewerRef}
        className="w-full h-full bg-black border border-zinc-700"
        onMouseEnter={() => (isHoveringRef.current = true)}
        onMouseLeave={() => (isHoveringRef.current = false)}
      ></div>

      <div className="absolute bottom-2 right-2 text-sm text-white flex flex-col items-end space-y-1">
        <div className="bg-zinc-800 bg-opacity-75 px-2 py-1 rounded">
          Image {files.length ? currentIndex + 1 : "-"} of {files.length || "-"}
        </div>
      </div>

      {zoomLevel > 1 && (
        <div className="absolute bottom-2 left-2 text-sm text-white bg-zinc-800 bg-opacity-75 px-2 py-1 rounded">
          Zoom: {zoomLevel.toFixed(2)}x
        </div>
      )}
    </div>
  );
}

export default DicomViewer;
