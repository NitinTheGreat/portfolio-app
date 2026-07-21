export function LoaderScene() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#0f1830]">
      <svg width="180" height="180" viewBox="0 0 100 100" fill="none" role="img" aria-label="Loading">
        <path
          d="M16 58 L48 50 L70 30 L80 22 L74 32 L50 50 L60 24 L48 50 L52 72 L38 58 L48 50"
          stroke="#f6efe2"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="loader-crane"
        />
      </svg>
    </div>
  )
}
