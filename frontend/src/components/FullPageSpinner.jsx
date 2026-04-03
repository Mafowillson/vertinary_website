const FullPageSpinner = () => (
  <div
    className="min-h-screen flex items-center justify-center bg-gray-50"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <div
      className="h-12 w-12 rounded-full border-4 border-[#1A7A6E]/20 border-t-[#1A7A6E] animate-spin"
      aria-hidden
    />
    <span className="sr-only">Loading</span>
  </div>
)

export default FullPageSpinner
