function ViewerToolbar({ isInverted, onToggleInvert, onReset }) {
  return (
    <div className="absolute top-4 right-4 z-10 flex items-center space-x-3 text-sm">
      <button
        onClick={onToggleInvert}
        className={`px-4 py-1 rounded text-white transition-all ${
          isInverted ? "bg-blue-600 font-semibold" : "bg-zinc-700 hover:bg-zinc-600"
        }`}
      >
        Invert
      </button>
      <button
        onClick={onReset}
        className="px-4 py-1 rounded text-white bg-zinc-700 hover:bg-zinc-600 transition-all"
      >
        Reset
      </button>
    </div>
  );
}

export default ViewerToolbar;
