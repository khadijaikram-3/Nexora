const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080B12]">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-[#1E293B]" />

        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#38BDF8]" />

        <div className="h-2 w-2 rounded-full bg-[#38BDF8]" />

        <div className="sr-only">Loading</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;