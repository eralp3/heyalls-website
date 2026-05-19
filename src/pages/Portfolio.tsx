import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import VideoBackground from '@/components/VideoBackground'
import { displayFont } from '@/utils/styles' 
import { updateSEO } from '@/utils/seo' 

export default function Portfolio() {
  useEffect(() => {
    updateSEO({
      title: 'Başarı Hikayeleri | Portfolyo',
      description:
        'HeyAlls ekosistemindeki seçkin uzmanların ve markaların hayata geçirdiği nitelikli projeleri, vaka çalışmalarını inceleyin.',
    })
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-[#001a2c] text-white selection:bg-white/20">
      <VideoBackground overlayOpacity="dark" />
      <Navbar activePage="portfolio" />

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
        <p className="text-white/60 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body animate-fade-rise-delay">
          HeyAlls güvencesiyle denetlenen, özel web mimarilerinden sınır ötesi e-ticaret
          süreçlerine kadar başarıyla uçtan uca yönettiğimiz çözüm ortaklıklarımız.
        </p>
      </main>

      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-16 space-y-32">
        {/* Bimeeting */}
        <div className="flex flex-col lg:flex-row gap-12 items-center group">
          <div className="w-full lg:w-1/2">
            <div className="bg-white/5 backdrop-blur-lg w-full aspect-video rounded-[2rem] overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent shadow-inner border border-white/5 group-hover:border-white/10 transition-all duration-500">
              <span
                className="text-3xl md:text-4xl text-white/40 group-hover:text-white group-hover:scale-105 transition-all duration-700 select-none"
                style={displayFont}
              >
                Bimeeting Platform
              </span>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="flex gap-2 animate-fade-rise-delay">
              <span className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 bg-white/5 rounded-full text-white/60">
                Özel Altyapı
              </span>
              <span className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 bg-white/5 rounded-full text-white/60">
                Topluluk Yönetimi
              </span>
            </div>
            <h2
              className="text-4xl font-normal text-white transition-colors duration-300 group-hover:text-blue-400"
              style={displayFont}
            >
              Bimeeting Language
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Modern dil öğrenim vizyonuyla yola çıkan Bimeeting için konuşma kulüplerinin entegre
              edildiği, kesintisiz bir platform mimarisi oluşturduk. Platformun sosyal kampanya
              süreçlerini baştan sona yönettik.
            </p>
          </div>
        </div>

        {/* Orimo Auto */}
        <div className="flex flex-col lg:flex-row gap-12 items-center group">
          <div className="w-full lg:w-1/2 order-2 lg:order-1 space-y-6">
            <div className="flex gap-2">
              <span className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 bg-white/5 rounded-full text-white/60">
                Avrupa Pazarı
              </span>
              <span className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 bg-white/5 rounded-full text-white/60">
                Global Ticaret
              </span>
            </div>
            <h2
              className="text-4xl font-normal text-white transition-colors duration-300 group-hover:text-blue-400"
              style={displayFont}
            >
              Orimo Auto Katalog Operasyonu
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Avrupa pazarına açılan üst segment otomotiv krom aksesuar markası için küresel
              standartlarda bir e-ticaret veri entegrasyonu sağladık. Ürünlerin yurt dışı pazar
              yerlerindeki listeleme mimarisini kurguladık.
            </p>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="bg-white/5 backdrop-blur-lg w-full aspect-video rounded-[2rem] overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent shadow-inner border border-white/5 group-hover:border-white/10 transition-all duration-500">
              <span
                className="text-3xl md:text-4xl text-white/40 group-hover:text-white group-hover:scale-105 transition-all duration-700 select-none"
                style={displayFont}
              >
                Orimo Auto
              </span>
            </div>
          </div>
        </div>

        {/* Carreas */}
        <div className="flex flex-col lg:flex-row gap-12 items-center group">
          <div className="w-full lg:w-1/2">
            <div className="bg-white/5 backdrop-blur-lg w-full aspect-video rounded-[2rem] overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent shadow-inner border border-white/5 group-hover:border-white/10 transition-all duration-500">
              <span
                className="text-3xl md:text-4xl text-white/40 group-hover:text-white group-hover:scale-105 transition-all duration-700 select-none"
                style={displayFont}
              >
                Carreas Streetwear
              </span>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="flex gap-2">
              <span className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 bg-white/5 rounded-full text-white/60">
                Vitrin Yönetimi
              </span>
              <span className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 bg-white/5 rounded-full text-white/60">
                Dönüşüm
              </span>
            </div>
            <h2
              className="text-4xl font-normal text-white transition-colors duration-300 group-hover:text-blue-400"
              style={displayFont}
            >
              Carreas E-Ticaret Yönetimi
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Sokak modasının dinamik markalarından biri olan Carreas için Shopier altyapısında
              kapsamlı bir vitrin ve mağaza optimizasyonu yürüttük. SEO uyumlu ürün metinleri
              oluşturarak dönüşümü artırdık.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
        <h3 className="text-4xl font-normal text-white mb-6" style={displayFont}>
          Sonraki Başarı Hikayesi Sizin Olsun.
        </h3>
        <a
          href="/#intake"
          className="bg-white/10 backdrop-blur-md rounded-full px-12 py-4 text-base text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/20 hover:border-white/40 inline-block"
        >
          Bizimle Tanışın
        </a>
      </section>

      <footer className="relative z-10 w-full text-center py-8 text-xs tracking-widest text-white/40 border-t border-white/5 bg-[#001a2c]/80 backdrop-blur-md">
        © 2026 HEYALLS. TÜM HAKLARI SAKLIDIR.
      </footer>
    </div>
  )
}