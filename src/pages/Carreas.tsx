import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import VideoBackground from '@/components/VideoBackground'
import Footer from '@/components/Footer'
import { displayFont } from '@/utils/styles'
import { useSEO } from '@/hooks/useSEO'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Carreas() {
  useSEO(
    'Carreas E-Ticaret Yönetimi | HeyAlls Case Study',
    'Sokak modasının dinamik markası Carreas için Shopier altyapısında vitrin optimizasyonu, SEO uyumlu içerik ve dönüşüm artışı.'
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
          <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-xs text-white/70 uppercase tracking-widest border border-white/10">Vitrin Yönetimi</span>
          <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-xs text-white/70 uppercase tracking-widest border border-white/10">Dönüşüm & SEO</span>
        </div>
        <h1 className="text-5xl md:text-8xl leading-[0.95] tracking-tight font-normal text-white mb-6 animate-fade-rise" style={displayFont}>
          Carreas
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl font-light leading-relaxed animate-fade-rise-delay">
          Sokak modasının dinamik markası için Shopier altyapısında kapsamlı vitrin optimizasyonu ve dönüşüm odaklı içerik stratejisi.
        </p>
      </main>

      {/* Metrics */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20 animate-fade-rise-delay-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Platform', value: 'Shopier' },
            { label: 'Odak', value: 'Dönüşüm' },
            { label: 'İçerik', value: 'SEO Uyumlu' },
            { label: 'Sonuç', value: 'Artan Satış' },
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
              Carreas, genç ve dinamik bir sokak modası markası olarak özgün bir tasarım diline sahipti. Ancak bu güçlü kimlik, dijital mağazaya yeterince yansımıyordu. Ürün sayfaları ziyaretçileri satın alma kararına götürmekte yetersiz kalıyor; organik arama trafiği ise potansiyelinin çok altında seyrediyordu.
            </p>
            <p>
              Mevcut ürün açıklamaları teknik detaylardan yoksun, SEO açısından optimize edilmemiş ve marka sesine uymayan jenerik metinlerden oluşuyordu. Bunun yanı sıra vitrin yapısı, müşterinin ürüne güvenmesini sağlayacak sosyal kanıt öğelerinden de yoksundu.
            </p>
          </div>
        </div>

        {/* Visual Mockup */}
        <div ref={mockupRef} className="w-full aspect-video bg-white/[0.02] rounded-[2rem] border border-white/10 backdrop-blur-sm relative group overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-10 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
            <div className="ml-4 h-4 w-36 bg-white/5 rounded-full" />
          </div>
          <div className="pt-16 px-8 h-full opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            {/* Store layout simulation */}
            <div className="grid grid-cols-12 gap-6 h-full">
              <div className="col-span-5 space-y-4">
                <div className="aspect-square bg-white/[0.04] rounded-2xl border border-white/5 flex items-center justify-center max-h-44">
                  <div className="w-16 h-20 bg-white/10 rounded-xl" />
                </div>
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-12 h-12 bg-white/[0.03] rounded-lg border border-white/5" />
                  ))}
                </div>
              </div>
              <div className="col-span-7 space-y-4 pt-2">
                <div className="h-6 w-3/4 bg-white/10 rounded-lg" />
                <div className="h-4 w-1/3 bg-white/5 rounded-full" />
                <div className="space-y-2 pt-2">
                  <div className="h-3 w-full bg-white/5 rounded-full" />
                  <div className="h-3 w-5/6 bg-white/5 rounded-full" />
                  <div className="h-3 w-4/6 bg-white/5 rounded-full" />
                </div>
                <div className="flex gap-2 pt-2">
                  {['XS','S','M','L','XL'].map(s => (
                    <div key={s} className="w-10 h-10 bg-white/[0.03] rounded-lg border border-white/10 flex items-center justify-center">
                      <span className="text-white/30 text-[10px]">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="h-10 w-full bg-white/10 rounded-xl mt-2" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="px-8 py-3 bg-white text-[#001a2c] rounded-full text-sm font-medium tracking-tighter transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
              Vitrin Optimizasyonu İnceleniyor
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
              Carreas'ın marka kimliğini ve hedef kitlesini derinlemesine analiz ederek işe başladık. Sokak kültürünün dilini ve estetiğini dijital içeriğe taşıyan, özgün ve dönüşüm odaklı bir içerik çerçevesi oluşturduk.
            </p>
            <p>
              Her ürün için; Google arama davranışları analiz edilerek hazırlanmış <strong>SEO uyumlu başlıklar</strong>, ürünün hikayesini anlatan açıklamalar ve teknik özellikleri net biçimde sunan detay metinleri yazıldı. Shopier'in platform dinamikleri gözetilerek vitrin yapısı yeniden düzenlendi.
            </p>
            <p>
              Ürün görselleri için optimum sıralama ve alt metin stratejisi belirlendi. Müşteri güvenini artırmaya yönelik sosyal kanıt öğeleri ve koleksiyon bazlı çapraz satış mantığı mağaza mimarisine entegre edildi.
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
              { metric: 'SEO İçerik Optimizasyonu', detail: 'Tüm ürün başlıkları ve açıklamaları arama motorları ve kullanıcı deneyimi için yeniden yazıldı.' },
              { metric: 'Vitrin Yeniden Yapılandırması', detail: 'Koleksiyon düzeni, ürün sıralaması ve görsel hiyerarşi dönüşüm artışı hedefiyle optimize edildi.' },
              { metric: 'Marka Ses Tutarlılığı', detail: 'İçerik tonu ve dili, Carreas\'ın sokak modu kimliğiyle tam uyum içinde standartlaştırıldı.' },
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
          <span className="text-white/40 text-xs tracking-widest uppercase mb-4 block group-hover:text-white/60 transition-colors">Portfolyoya Dön</span>
          <h2 className="text-4xl md:text-6xl text-white transition-transform duration-500 transform group-hover:translate-x-4" style={displayFont}>
            Tüm Ekosistemi İncele <span className="text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">→</span>
          </h2>
        </Link>
      </section>

      <Footer />
    </div>
  )
}