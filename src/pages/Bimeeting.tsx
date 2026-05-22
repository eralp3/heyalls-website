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
            { label: 'Hizmet', value: 'Web App & Platform' },
            { label: 'Teknoloji', value: 'Custom JS & Firebase' },
            { label: 'Veritabanı', value: 'Real-time NoSQL' },
            { label: 'Sonuç', value: 'Sıfır Gecikme' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl p-6 text-center">
              <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">{stat.label}</span>
              <span className="block text-white/90 text-lg font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/*
        FIX: Visual mockup and Çözüm Mimarisi were previously outside this section,
        breaking the space-y-32 rhythm. Both are now correctly inside.
      */}
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

        {/* Görsel Molası (Mockup) */}
        <div className="w-full aspect-video bg-white/[0.02] rounded-[2rem] border border-white/10 backdrop-blur-sm relative group overflow-hidden shadow-2xl">
          {/* Tarayıcı Üst Barı */}
          <div className="absolute top-0 left-0 w-full h-10 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
            <div className="ml-4 h-4 w-40 bg-white/5 rounded-full" />
          </div>

          {/* Simüle Edilmiş Dashboard İçeriği */}
          <div className="pt-16 px-8 grid grid-cols-12 gap-6 h-full opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            {/* Sidebar Simülasyonu */}
            <div className="col-span-3 space-y-4">
              <div className="h-8 w-full bg-white/10 rounded-lg animate-pulse" />
              <div className="h-4 w-3/4 bg-white/5 rounded-full" />
              <div className="h-4 w-1/2 bg-white/5 rounded-full" />
              <div className="h-4 w-2/3 bg-white/5 rounded-full" />
              <div className="pt-8 space-y-3">
                <div className="h-20 w-full bg-blue-500/10 rounded-xl border border-blue-500/10" />
              </div>
            </div>
            {/* Main Content Simülasyonu */}
            <div className="col-span-9 space-y-6">
              <div className="flex justify-between items-center">
                <div className="h-10 w-48 bg-white/10 rounded-xl" />
                <div className="h-10 w-10 bg-blue-500/20 rounded-full" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-32 bg-white/[0.03] rounded-2xl border border-white/5" />
                <div className="h-32 bg-white/[0.03] rounded-2xl border border-white/5" />
                <div className="h-32 bg-white/[0.03] rounded-2xl border border-white/5" />
              </div>
              <div className="h-48 w-full bg-gradient-to-br from-white/5 to-transparent rounded-3xl border border-white/5 p-6">
                <div className="h-2 w-full bg-white/5 rounded-full mb-4" />
                <div className="h-2 w-3/4 bg-white/5 rounded-full mb-4" />
                <div className="h-2 w-1/2 bg-white/5 rounded-full" />
              </div>
            </div>
          </div>

          {/* Hover Badge */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="px-8 py-3 bg-white text-[#001a2c] rounded-full text-sm font-medium tracking-tighter transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
              Platform Mimarisi İnceleniyor
            </span>
          </div>
        </div>

        {/* Çözüm Mimarisi */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl text-white sticky top-32" style={displayFont}>Çözüm Mimarisi</h2>
          </div>
          <div className="md:w-2/3 space-y-6 text-white/70 leading-relaxed font-light">
            <p>
              Projenin hız ve anlık etkileşim gereksinimlerini karşılamak için hantal hazır paketler yerine tamamen özel bir kod mimarisi (custom development) inşa ettik.
            </p>
            <p>
              Topluluğun mesajlaşma, canlı katılım ve veri senkronizasyonu gibi süreçlerini sıfır gecikmeyle (real-time) yönetmek adına arka planda <strong>Firebase</strong> altyapısını konumlandırdık. Bu sayede platform; güvenli kimlik doğrulama, dinamik veri tabanı yönetimi ve yüksek trafik anlarında bile çökmeden esneyebilen (scalable) kusursuz bir Web Uygulamasına dönüştü.
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