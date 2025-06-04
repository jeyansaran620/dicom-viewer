import { useState, useRef, useEffect } from "react";
import FolderSelector from "./components/FolderSelector";
import SeriesPanel from "./components/SeriesPanel";
import html2canvas from "html2canvas";
import ViewerGrid from "./components/ViewerGrid";

function App() {
  const [seriesList, setSeriesList] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [viewerIndexes, setViewerIndexes] = useState([0]);
  const [toast, setToast] = useState(null);
  const viewerPanelRef = useRef(null);

  const handleAddViewer = () => {
    if (!selectedSeries || viewerIndexes.length >= 4) return;

    const total = selectedSeries.files.length;
    const randomIndex = Math.floor(Math.random() * total);
    setViewerIndexes((prev) => [...prev, randomIndex]);
  };

  const handleRemoveViewer = () => {
    if (viewerIndexes.length <= 1) return;
    setViewerIndexes((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    const handleScreenshotShortcut = async (e) => {
      if (e.metaKey && e.shiftKey && e.code === "KeyS") {
        e.preventDefault();
        if (!viewerPanelRef.current) return;
        requestAnimationFrame(async () => {

          const canvas = await html2canvas(viewerPanelRef.current);
          canvas.toBlob(async (blob) => {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({ [blob.type]: blob }),
              ]);
              setToast("📸 ViewerGrid screenshot copied to clipboard!");
            } catch (err) {
              console.error(err);
              setToast("❌ Screenshot failed");
            }

            setTimeout(() => setToast(null), 2500);
          }, "image/png");
        });

      }
    };

    window.addEventListener("keydown", handleScreenshotShortcut);
    return () => window.removeEventListener("keydown", handleScreenshotShortcut);
  }, []);


  return (
    <div className="h-screen w-screen flex overflow-hidden bg-zinc-900 text-white">
      <div className="w-[25%] min-w-[200px] h-full flex-shrink-0">
        <SeriesPanel
          seriesList={seriesList}
          onSelect={(s) => {
            setSelectedSeries(s);
            setViewerIndexes([0]);
          }}
        />
      </div>

      <div className="flex flex-col flex-1 h-full">
        <div className="h-14 px-4 flex items-center justify-between bg-zinc-800 border-b border-zinc-700">
          <h1 className="text-xl font-bold">DICOM Viewer Grid</h1>
          <div className="flex space-x-2">
            <button
              onClick={handleAddViewer}
              disabled={!selectedSeries || viewerIndexes.length >= 4}
              className="bg-blue-600 text-sm px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Viewer
            </button>

            <button
              onClick={handleRemoveViewer}
              disabled={viewerIndexes.length <= 1}
              className="bg-red-600 text-sm px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Remove Viewer
            </button>

            <FolderSelector onSeriesLoaded={setSeriesList} />
          </div>

        </div>

        <div className="flex-1 bg-zinc-900 p-4">
          {selectedSeries ? (
            <ViewerGrid
              ref={viewerPanelRef}
              files={selectedSeries.files}
              viewerIndexes={viewerIndexes}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500 border border-zinc-700 bg-black">
              Select a DICOM series from the sidebar
            </div>
          )}
        </div>
        {toast && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white px-4 py-2 rounded shadow-md z-50">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
