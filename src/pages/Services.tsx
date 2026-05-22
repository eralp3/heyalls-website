import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import VideoBackground from '@/components/VideoBackground'
import Footer from '@/components/Footer'
import { displayFont } from '@/utils/styles'
import { useSEO } from '@/hooks/useSEO'

export default function Services() {
  useSEO(
    'Hizmetlerimiz | Uçtan Uca Dijital Çözümler | HeyAlls',
    'Web geliştirme, kurumsal web tasarım, e-ticaret sitesi, SEO yönetimi ve dijital pazarlama alanlarında entegre in-house hizmetlerimiz.'
  )

  // FIX: Added scroll-to-top on mount for consistency across all pages
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const marqueeItems = [
    'SEO YÖNETİMİ', 'TANITIM WEB SİTESİ', 'E-TİCARET SİTESİ',
    'KURUMSAL WEB TASARIM', 'MARKA KİMLİĞİ', 'ÖZEL WEB YAZILIM',
    'MOBİL UYGULAMA GELİŞTİRME', 'SOSYAL MEDYA', 'DİJİTAL PAZARLAMA HİZMETLERİ'
  ]

  return (
    <div className="relative min-h-screen w-full bg-[#001a2c] text-white selection:bg-white/20 overflow-x-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>

      <VideoBackground overlayOpacity="dark" />
      <Navbar activePage="services" />

      {/* Marquee */}
      <div className="relative z-10 w-full bg-white/[0.02] border-y border-white/5 py-4 mt-20 overflow-hidden select-none backdrop-blur-sm">
        <div className="animate-marquee gap-16 pr-16 text-[11px] font-medium tracking-[0.2em] uppercase text-white/40">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} className="flex items-center gap-16 whitespace-nowrap">
              <span>{item}</span>
              <span className="text-blue-400/40 text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 pb-12">
        <span className="text-xs font-medium uppercase tracking-widest text-white/50 block mb-4 animate-fade-rise">
          Hizmet Yelpazemiz
        </span>
        <h1
          className="text-5xl md:text-7xl leading-[0.95] tracking-[-2.46px] max-w-4xl font-normal text-white animate-fade-rise"
          style={displayFont}
        >
          Dijitalde,{' '}
          <em className="not-italic text-white/60">uçtan uca hakemlik.</em>
        </h1>
        <p className="text-white/60 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body animate-fade-rise-delay">
          İhtiyacınız olan her şeyi parçalar halinde dışarıda aramayın. HeyAlls olarak markanızı
          sıfırdan alıyor, kodluyor, tasarlıyor ve küresel pazara hazırlıyoruz.
        </p>
      </main>

      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Web & Yazılım */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all duration-500 flex flex-col h-full group shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 border border-blue-500/10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-2xl mb-4 text-white group-hover:text-blue-400 transition-colors" style={displayFont}>Web & Yazılım</h3>
          <p className="text-white/60 text-sm leading-relaxed flex-grow">
            Dinamik animasyonlar, esnek altyapılar ve modern arayüzlerle markanızın dijital dünyadaki
            kalelerini inşa ediyoruz. Hızlı, güvenli ve ölçeklenebilir kod mimarisi sunuyoruz.
          </p>
          <ul className="text-sm text-white/40 mt-6 space-y-3 border-t border-white/5 pt-4">
            <li className="flex items-center gap-2.5"><span className="text-blue-400 text-xs">▪</span> Kurumsal Web Tasarım</li>
            <li className="flex items-center gap-2.5"><span className="text-blue-400 text-xs">▪</span> Tanıtım Web Sitesi</li>
            <li className="flex items-center gap-2.5"><span className="text-blue-400 text-xs">▪</span> Özelleştirilmiş Web Yazılım</li>
            <li className="flex items-center gap-2.5"><span className="text-blue-400 text-xs">▪</span> Mobil Uygulama Geliştirme</li>
          </ul>
        </div>

        {/* E-Ticaret */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all duration-500 flex flex-col h-full group shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6 border border-purple-500/10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-2xl mb-4 text-white group-hover:text-purple-400 transition-colors" style={displayFont}>E-Ticaret Dönüşümü</h3>
          <p className="text-white/60 text-sm leading-relaxed flex-grow">
            Ürünlerinizi yerel ve küresel ekosistemlerde en doğru mimariyle konumlandırıyoruz.
            Sınır ötesi süreçlerde katalog yönetiminden entegrasyona kadar her şeyi üstleniyoruz.
          </p>
          <ul className="text-sm text-white/40 mt-6 space-y-3 border-t border-white/5 pt-4">
            <li className="flex items-center gap-2.5"><span className="text-purple-400 text-xs">▪</span> E-Ticaret Sitesi Kurulumu</li>
            <li className="flex items-center gap-2.5"><span className="text-purple-400 text-xs">▪</span> Global Mağaza Optimizasyonu</li>
            <li className="flex items-center gap-2.5"><span className="text-purple-400 text-xs">▪</span> Katalog ve Vitrin Yönetimi</li>
            <li className="flex items-center gap-2.5"><span className="text-purple-400 text-xs">▪</span> Sınır Ötesi Pazaryeri Entegrasyonları</li>
          </ul>
        </div>

        {/* Marka & Pazarlama */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all duration-500 flex flex-col h-full group shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <h3 className="text-2xl mb-4 text-white group-hover:text-emerald-400 transition-colors" style={displayFont}>Marka & Pazarlama</h3>
          <p className="text-white/60 text-sm leading-relaxed flex-grow">
            Markanızın dijital dünyada gür sesle konuşmasını sağlıyoruz. Hedef odaklı veri analitiği,
            kreatif içerik yönetimi ve akıllı reklam bütçesi yönetimiyle büyümeyi tetikliyoruz.
          </p>
          <ul className="text-sm text-white/40 mt-6 space-y-3 border-t border-white/5 pt-4">
            <li className="flex items-center gap-2.5"><span className="text-emerald-400 text-xs">▪</span> Marka Kimliği Tasarımı</li>
            <li className="flex items-center gap-2.5"><span className="text-emerald-400 text-xs">▪</span> Sosyal Medya Yönetimi</li>
            <li className="flex items-center gap-2.5"><span className="text-emerald-400 text-xs">▪</span> Dijital Pazarlama Hizmetleri</li>
            <li className="flex items-center gap-2.5"><span className="text-emerald-400 text-xs">▪</span> Üst Düzey SEO Yönetimi</li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  )
}