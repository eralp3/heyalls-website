import { BG_VIDEO_URL } from '../utils/styles'

interface VideoBackgroundProps {
  /** Opacity of the dark overlay. Home uses lighter overlay (0.50), sub-pages use 0.85 */
  overlayOpacity?: 'light' | 'dark'
}

export default function VideoBackground({ overlayOpacity = 'dark' }: VideoBackgroundProps) {
  const overlayClass =
    overlayOpacity === 'light'
      ? 'absolute inset-0 bg-[#001a2c]/50 backdrop-blur-[2px]'
      : 'absolute inset-0 bg-[#001a2c]/85 backdrop-blur-sm'

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-gradient-to-b from-[#001a2c] to-[#000a14]">
      <video
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        className="w-full h-full object-cover opacity-60"
      >
        <source src={BG_VIDEO_URL} type="video/mp4" />
      </video>
      <div className={overlayClass} />
    </div>
  )
}