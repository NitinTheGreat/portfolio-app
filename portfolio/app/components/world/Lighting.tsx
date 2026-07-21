export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[18, 14, 8]} intensity={1.1} color="#ffdcae" />
    </>
  )
}
