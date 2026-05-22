import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import VideoBackground from '@/components/VideoBackground'
import Footer from '@/components/Footer'
import { displayFont } from '@/utils/styles'
import { useSEO } from '@/hooks/useSEO'

export default function Bimeeting() {
  useSEO(
    'Bimeeting Platform Mimarisi | HeyAlls Case Study',
    'Modern dil öğrenim vizyonuyla yola çıkan Bimeeting için geliştirdiğimiz kesintisiz topluluk platformu ve altyapı çözümleri.'
  )

  // Sayfa yüklendiğinde en üste kaydır
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-[#001a2c] text-white selection:bg-white/20">
      <VideoBackground overlayOpacity="dark" />
      <Navbar />

      {/* Hero Section */}
      <main className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex gap-3 mb-8 animate-fade-rise">
          <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-xs text-white/70 uppercase tracking-widest border border-white/10">Özel Altyapı</span>
          <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-xs text-white/70 uppercase tracking-widest border border-white/10">Topluluk Yönetimi</span>
        </div>
        <h1 className="text-5xl md:text-8xl leading-[0.95] tracking-tight font-normal text-white mb-6 animate-fade-rise" style={displayFont}>
          Bimeeting Language
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl font-light leading-relaxed animate-fade-rise-delay">
          Dil öğrenimini statik bir süreç olmaktan çıkarıp, canlı ve etkileşimli bir topluluk deneyimine dönüştüren modern platform mimarisi.
        </p>
      </main>

      {/* Proje Metrikleri (Bento Style) */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20 animate-fade-rise-delay-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Hizmet', value: 'Platform Mimari' },
            { label: 'Teknoloji', value: 'WP & Özel CMS' },
            { label: 'Süreç', value: 'Uçtan Uca' },
            { label: 'Sonuç', value: 'Kesintisiz Akış' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl p-6 text-center">
              <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">{stat.label}</span>
              <span className="block text-white/90 text-lg font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Vaka Çalışması Detayları */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 space-y-32">
        
        {/* Meydan Okuma */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl text-white sticky top-32" style={displayFont}>Meydan Okuma</h2>
          </div>
          <div className="md:w-2/3 space-y-6 text-white/70 leading-relaxed font-light">
            <p>
              Dil eğitimi sektöründeki en büyük eksiklik, öğrencilerin teorik bilgiyi pratiğe dökebilecekleri dijital, sürdürülebilir ve erişilebilir alanların olmamasıdır.
            </p>
            <p>
              Bimeeting vizyonu bize ulaştığında, sıradan bir tanıtım sitesinden ziyade; öğrencilerin kayıt olabildiği, konuşma kulüplerine anında entegre olabildiği ve sosyal kampanya süreçlerinin tek merkezden yönetildiği karmaşık bir "yaşayan ekosisteme" ihtiyaç vardı.
            </p>
          </div>
        </div>

        {/* Görsel Molası (Mockup Alanı) */}
        <div className="w-full aspect-video bg-gradient-to-br from-white/5 to-white/[0.01] rounded-[2rem] border border-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden relative group">
          <div className="absolute inset-0 bg-[#001a2c]/50 group-hover:bg-transparent transition-colors duration-700" />
          <span className="text-white/20 text-2xl tracking-widest uppercase font-light" style={displayFont}>Platform Arayüzü</span>
        </div>

        {/* Çözüm Mimarisi */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl text-white sticky top-32" style={displayFont}>Çözüm Mimarisi</h2>
          </div>
          <div className="md:w-2/3 space-y-6 text-white/70 leading-relaxed font-light">
            <p>
              HeyAlls olarak projeyi dışarıdan hazır paketlerle çözmek yerine, markanın ruhuna uygun özel bir altyapı kodladık. WordPress ve özel tema mimarilerini harmanlayarak, içerik yönetimini (CMS) son derece esnek bir hale getirdik.
            </p>
            <p>
              Kullanıcı deneyimini (UX) merkeze alarak, karmaşık kayıt ve katılım süreçlerini tek tıkla çözülebilir, "sıvı" bir akışa dönüştürdük. Eş zamanlı olarak sosyal medyadaki tüm topluluk kampanyalarını bu mimariyle senkronize ettik.
            </p>
          </div>
        </div>
      </section>

      {/* Sonraki Proje Navigasyonu */}
      <section className="relative z-10 w-full border-t border-white/10 bg-white/[0.02] backdrop-blur-xl mt-20">
        <Link to="/calismalarimiz" className="block max-w-7xl mx-auto px-6 py-20 group">
          <span className="text-white/40 text-xs tracking-widest uppercase mb-4 block group-hover:text-blue-400 transition-colors">Portfolyoya Dön</span>
          <h2 className="text-4xl md:text-6xl text-white transition-transform duration-500 transform group-hover:translate-x-4" style={displayFont}>
            Tüm Ekosistemi İncele <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">→</span>
          </h2>
        </Link>
      </section>

      <Footer />
    </div>
  )
}