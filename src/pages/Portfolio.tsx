import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import VideoBackground from '@/components/VideoBackground';
import { displayFont } from '@/utils/styles';
import { updateSEO } from '@/utils/seo';

export default function Portfolio() { // <-- İsim burada Portfolio olmalı!
  useEffect(() => {
    updateSEO({
      title: 'Başarı Hikayeleri | Portfolyo',
      description:
        'HeyAlls ekosistemindeki seçkin uzmanların ve markaların hayata geçirdiği nitelikli projeleri, vaka çalışmalarını inceleyin.',
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#001a2c] text-white selection:bg-white/20">
      <VideoBackground overlayOpacity="dark" />
      <Navbar activePage="portfolio" /> {/* <-- Burası portfolio olmalı! */}

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <span className="text-xs font-medium uppercase tracking-widest text-white/50 block mb-4 animate-fade-rise">
          Seçilmiş Projeler
        </span>
        <h1
          className="text-5xl md:text-7xl leading-[0.95] tracking-[-2.46px] max-w-4xl font-normal text-white animate-fade-rise"
          style={displayFont}
        >
          Fikirden,{' '}
          <em className="not-italic text-white/60">küresel operasyona.</em>
        </h1>
        {/* ... Buraya Portfolio içeriklerini ekleyebilirsin ... */}
      </main>

      <footer className="relative z-10 w-full text-center py-8 text-xs tracking-widest text-white/40 border-t border-white/5 bg-[#001a2c]/80 backdrop-blur-md">
        © 2026 HEYALLS. TÜM HAKLARI SAKLIDIR.
      </footer>
    </div>
  );
}