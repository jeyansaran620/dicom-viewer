import DicomViewer from "./DicomViewer";
import { forwardRef } from "react";

const ViewerGrid = forwardRef(({ files, viewerIndexes }, ref) => {
    if (!files.length) return null;

    const getViewer = (i) => (
        <div
            key={i}
            className="w-full h-full bg-zinc-800 rounded border border-zinc-600 p-2 shadow-md"
        >
            <DicomViewer files={files} initialIndex={viewerIndexes[i]} />
        </div>
    );

    return (
        <div className="w-full h-full" ref={ref}>
            {viewerIndexes.length === 1 && (
                <div className="h-full w-full flex items-center justify-center">
                    {getViewer(0)}
                </div>
            )}

            {viewerIndexes.length === 2 && (
                <div className="flex h-full space-x-4">
                    <div className="w-3/4 h-full">{getViewer(0)}</div>
                    <div className="w-1/4 flex items-center justify-center">
                        <div className=" h-2/4 flex"> {getViewer(1)} </div>
                    </div>
                </div>
            )}

            {viewerIndexes.length === 3 && (
                <div className="flex h-full space-x-4">
                    <div className="w-2/3 h-full">{getViewer(0)}</div>
                    <div className="w-1/3 h-full flex flex-col space-y-4">
                        <div className="flex-1">{getViewer(1)}</div>
                        <div className="flex-1">{getViewer(2)}</div>
                    </div>
                </div>
            )}

            {viewerIndexes.length === 4 && (
                <div className="flex flex-col h-full space-y-4">
                    <div className="flex flex-1 space-x-4">
                        <div className="flex-[2]">{getViewer(0)}</div>
                        <div className="flex-[1]">{getViewer(1)}</div>
                    </div>
                    <div className="flex flex-1 space-x-4">
                        <div className="flex-1">{getViewer(2)}</div>
                        <div className="flex-1">{getViewer(3)}</div>
                    </div>
                </div>
            )}
        </div>
    );
});

export default ViewerGrid;
