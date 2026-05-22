import { BG_VIDEO_URL } from '@/utils/styles'

interface VideoBackgroundProps {
  overlayOpacity?: 'light' | 'dark'
}

export default function VideoBackground({ overlayOpacity = 'light' }: VideoBackgroundProps) {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-[#001a2c]">
      <video
        autoPlay
        loop
        muted
        playsInline
        // FIX: Changed from preload="auto" to preload="none"
        // preload="auto" forced the full video to download on every page load,
        // killing mobile performance. The poster shows instantly while the video loads lazily.
        preload="none"
        poster="/bg-poster.webp"
        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
      >
        <source src={BG_VIDEO_URL} type="video/mp4" />
      </video>
      <div
        className={`absolute inset-0 pointer-events-none ${
          overlayOpacity === 'dark' ? 'bg-[#001a2c]/60' : 'bg-[#001a2c]/30'
        } backdrop-blur-[2px]`}
      />
    </div>
  )
}