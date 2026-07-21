export function LoaderScene() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#04070E]">
      <svg width="220" height="220" viewBox="0 0 200 200" fill="none" role="img" aria-label="Loading">
        <ellipse
          cx="100"
          cy="100"
          rx="72"
          ry="40"
          stroke="#E8E4DC"
          strokeWidth="1.25"
          className="loader-ellipse"
          transform="rotate(-18 100 100)"
        />
        <circle r="3" fill="#4A8FB8">
          <animateMotion
            dur="1s"
            begin="2s"
            fill="freeze"
            path="M172,100 A72,40 0 1,1 28,100 A72,40 0 1,1 172,100"
          />
        </circle>
      </svg>
    </div>
  )
}
