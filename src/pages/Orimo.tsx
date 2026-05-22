import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import VideoBackground from '@/components/VideoBackground'
import Footer from '@/components/Footer'
import { displayFont } from '@/utils/styles'
import { useSEO } from '@/hooks/useSEO'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Orimo() {
  useSEO(
    'Orimo Auto Katalog Operasyonu | HeyAlls Case Study',
    'Avrupa pazarına açılan üst segment otomotiv aksesuar markası için küresel standartlarda e-ticaret veri entegrasyonu ve listeleme mimarisi.'
  )

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const challengeRef = useScrollReveal<HTMLDivElement>({ delay: 0 })
  const mockupRef = useScrollReveal<HTMLDivElement>({ delay: 0 })
  const solutionRef = useScrollReveal<HTMLDivElement>({ delay: 0 })
  const resultsRef = useScrollReveal<HTMLDivElement>({ delay: 0 })

  return (
    <div className="relative min-h-screen w-full bg-[#001a2c] text-white selection:bg-white/20">
      <VideoBackground overlayOpacity="dark" />
      <Navbar />

      {/* Hero */}
      <main className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex gap-3 mb-8 animate-fade-rise">
          <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-xs text-white/70 uppercase tracking-widest border border-white/10">Avrupa Pazarı</span>
          <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-xs text-white/70 uppercase tracking-widest border border-white/10">Global E-Ticaret</span>
        </div>
        <h1 className="text-5xl md:text-8xl leading-[0.95] tracking-tight font-normal text-white mb-6 animate-fade-rise" style={displayFont}>
          Orimo Auto
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl font-light leading-relaxed animate-fade-rise-delay">
          Üst segment otomotiv krom aksesuar markasını Avrupa pazarına taşıyan küresel e-ticaret altyapısı ve veri entegrasyonu.
        </p>
      </main>

      {/* Metrics */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20 animate-fade-rise-delay-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Pazar', value: 'Avrupa' },
            { label: 'Platform', value: 'Global Pazaryeri' },
            { label: 'Kapsam', value: 'Tam Katalog' },
            { label: 'Sonuç', value: 'Sınır Ötesi Satış' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl p-6 text-center">
              <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">{stat.label}</span>
              <span className="block text-white/90 text-lg font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Content */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 space-y-32">

        {/* Challenge */}
        <div ref={challengeRef} className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl text-white sticky top-32" style={displayFont}>Meydan Okuma</h2>
          </div>
          <div className="md:w-2/3 space-y-6 text-white/70 leading-relaxed font-light">
            <p>
              Orimo Auto, yüksek kaliteli krom otomotiv aksesuarları üreticisi olarak Türkiye pazarında güçlü bir konuma sahipti. Ancak marka, Avrupa'nın rekabetçi e-ticaret ekosistemine giriş yapma konusunda ciddi engellerle karşı karşıyaydı.
            </p>
            <p>
              Ürün katalogları farklı Avrupa pazaryerlerinin gerektirdiği standartlara uygun değildi; başlıklar, açıklamalar ve teknik veriler her platform için ayrı ayrı optimize edilmesi gereken karmaşık bir yapı oluşturuyordu. Bunun yanı sıra dil engeli, farklı vergi ve gümrük gereksinimleri operasyonu daha da zorlaştırıyordu.
            </p>
          </div>
        </div>

        {/* Visual Mockup */}
        <div ref={mockupRef} className="w-full aspect-video bg-white/[0.02] rounded-[2rem] border border-white/10 backdrop-blur-sm relative group overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-10 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
            <div className="ml-4 h-4 w-48 bg-white/5 rounded-full" />
          </div>
          <div className="pt-16 px-8 grid grid-cols-12 gap-4 h-full opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            {/* Product grid simulation */}
            <div className="col-span-3 space-y-3 pt-2">
              <div className="h-5 w-full bg-purple-500/20 rounded-lg" />
              <div className="h-4 w-3/4 bg-white/5 rounded-full" />
              <div className="h-4 w-1/2 bg-white/5 rounded-full" />
              <div className="h-4 w-2/3 bg-white/5 rounded-full" />
              <div className="mt-6 space-y-2">
                <div className="h-3 w-full bg-white/5 rounded-full" />
                <div className="h-3 w-4/5 bg-white/5 rounded-full" />
                <div className="h-3 w-3/5 bg-white/5 rounded-full" />
              </div>
            </div>
            <div className="col-span-9 grid grid-cols-3 gap-4 pt-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-24 bg-white/[0.04] rounded-xl border border-white/5 flex items-center justify-center">
                    <div className="w-12 h-8 bg-purple-500/10 rounded-lg" />
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full" />
                  <div className="h-3 w-2/3 bg-white/5 rounded-full" />
                  <div className="h-3 w-1/3 bg-purple-500/20 rounded-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="px-8 py-3 bg-white text-[#001a2c] rounded-full text-sm font-medium tracking-tighter transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
              Katalog Mimarisi İnceleniyor
            </span>
          </div>
        </div>

        {/* Solution */}
        <div ref={solutionRef} className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl text-white sticky top-32" style={displayFont}>Çözüm Mimarisi</h2>
          </div>
          <div className="md:w-2/3 space-y-6 text-white/70 leading-relaxed font-light">
            <p>
              Her Avrupa pazaryerinin kendine özgü listeleme kurallarını ve teknik gereksinimlerini derinlemesine analiz ettik. Amazon EU, eBay Avrupa ve diğer bölgesel platformlar için özelleştirilmiş katalog şablonları oluşturduk.
            </p>
            <p>
              Ürün başlıkları, bullet point açıklamaları ve teknik özellik tabloları; her platform için arama algoritmalarını ve yerel tüketici davranışlarını göz önünde bulundurarak yeniden yapılandırıldı. SEO odaklı içerik stratejisiyle organik görünürlük maksimize edildi.
            </p>
            <p>
              Stok yönetimi, fiyatlandırma güncellemeleri ve sipariş akışlarını tek merkezden yönetebilmek için <strong>çok kanallı entegrasyon altyapısı</strong> kurgulandı. Bu sayede Orimo ekibi, onlarca farklı platformu tek bir dashboard üzerinden yönetir hale geldi.
            </p>
          </div>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl text-white sticky top-32" style={displayFont}>Sonuçlar</h2>
          </div>
          <div className="md:w-2/3 space-y-6">
            {[
              { metric: 'Avrupa Pazaryeri Entegrasyonu', detail: 'Birden fazla ülke ve platform için aktif listeleme mimarisi kuruldu.' },
              { metric: 'Katalog Optimizasyonu', detail: 'Tüm ürün içerikleri platform standartlarına ve SEO kurallarına göre yeniden yazıldı.' },
              { metric: 'Operasyonel Verimlilik', detail: 'Tek merkez yönetim sistemiyle manuel iş yükü büyük ölçüde azaltıldı.' },
            ].map((item) => (
              <div key={item.metric} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                <span className="block text-white font-medium mb-2">{item.metric}</span>
                <span className="block text-white/50 text-sm leading-relaxed">{item.detail}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Next Project Nav */}
      <section className="relative z-10 w-full border-t border-white/10 bg-white/[0.02] backdrop-blur-xl mt-20">
        <Link to="/calismalarimiz" className="block max-w-7xl mx-auto px-6 py-20 group">
          <span className="text-white/40 text-xs tracking-widest uppercase mb-4 block group-hover:text-purple-400 transition-colors">Portfolyoya Dön</span>
          <h2 className="text-4xl md:text-6xl text-white transition-transform duration-500 transform group-hover:translate-x-4" style={displayFont}>
            Tüm Ekosistemi İncele <span className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">→</span>
          </h2>
        </Link>
      </section>

      <Footer />
    </div>
  )
}