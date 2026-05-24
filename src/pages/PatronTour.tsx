import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import VideoBackground from '@/components/VideoBackground'
import Footer from '@/components/Footer'
import { displayFont } from '@/utils/styles'
import { useSEO } from '@/hooks/useSEO'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function PatronTour() {
  useSEO(
    'Patron Tour · Performans Pazarlama Sistemi | HeyAlls Case Study',
    'Sıfırdan kurduğumuz Meta huni mimarisi ve veri destekli reklam operasyonlarıyla Patron Tour için inşa ettiğimiz performans pazarlama sistemi.'
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

      <main className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex gap-3 mb-8 animate-fade-rise">
          <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-xs text-white/70 uppercase tracking-widest border border-white/10">Performans Pazarlama</span>
          <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-xs text-white/70 uppercase tracking-widest border border-white/10">Sosyal Medya</span>
        </div>
        <h1 className="text-5xl md:text-8xl leading-[0.95] tracking-tight font-normal text-white mb-6 animate-fade-rise" style={displayFont}>
          Patron Tour
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl font-light leading-relaxed animate-fade-rise-delay">
          Meta huni mimarisini sıfırdan kurduk; hedef kitle segmentasyonunu ve retargeting akışlarını veri üzerinden optimize ettik. [Reklam yatırımının geri dönüşünü 2.4 katına çıkardık.]
        </p>
      </main>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20 animate-fade-rise-delay-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Kanal', value: 'Meta & Instagram' },
            { label: 'Model', value: 'Performans Bazlı' },
            { label: 'Kapsam', value: 'Sosyal + Reklam' },
            { label: 'Odak', value: 'Etkileşim & ROAS' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl p-6 text-center">
              <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-2">{stat.label}</span>
              <span className="block text-white/90 text-lg font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 space-y-32">

        <div ref={challengeRef} className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl text-white sticky top-32" style={displayFont}>Meydan Okuma</h2>
          </div>
          <div className="md:w-2/3 space-y-6 text-white/70 leading-relaxed font-light">
            <p>
              Patron Tour, turizm sektöründe öne çıkan deneyimleri sunan dinamik bir marka olarak güçlü bir ürün portföyüne sahipti. Ancak bu potansiyel, dijital kanallarda yeterince görünür kılınamıyordu.
            </p>
            <p>
              Sosyal medya içerikleri tutarsız bir yayın takvimi ve düşük etkileşim oranlarıyla seyrediyordu. Meta reklam harcamaları ise hedefleme eksikliği nedeniyle düşük ROAS üretiyor; bütçe verimsiz biçimde tüketiliyordu. Marka, potansiyel müşterilere ulaşmak için somut bir dijital strateji ihtiyacı duyuyordu.
            </p>
          </div>
        </div>

        <div ref={mockupRef} className="w-full aspect-video bg-white/[0.02] rounded-[2rem] border border-white/10 backdrop-blur-sm relative group overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-10 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
            <div className="ml-4 h-4 w-44 bg-white/5 rounded-full" />
          </div>
          <div className="pt-14 px-6 grid grid-cols-12 gap-4 h-full pb-6 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            <div className="col-span-3 space-y-3 pt-2">
              <div className="h-5 w-full bg-emerald-500/20 rounded-lg" />
              {['Genel Bakış', 'Kampanyalar', 'Kitleler', 'Raporlar'].map(item => (
                <div key={item} className="h-8 w-full bg-white/[0.03] rounded-lg border border-white/5 flex items-center px-3">
                  <div className="h-2 w-2 rounded-full bg-white/20 mr-2" />
                  <span className="text-white/20 text-[9px]">{item}</span>
                </div>
              ))}
            </div>
            <div className="col-span-9 space-y-4 pt-2">
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Erişim', color: 'bg-emerald-500/10' },
                  { label: 'Tıklama', color: 'bg-blue-500/10' },
                  { label: 'Dönüşüm', color: 'bg-purple-500/10' },
                  { label: 'ROAS', color: 'bg-amber-500/10' },
                ].map(k => (
                  <div key={k.label} className={`${k.color} rounded-xl p-3 border border-white/5`}>
                    <div className="h-5 w-3/4 bg-white/10 rounded mb-1" />
                    <div className="h-3 w-1/2 bg-white/5 rounded" />
                  </div>
                ))}
              </div>
              <div className="h-28 bg-white/[0.02] rounded-2xl border border-white/5 flex items-end px-4 pb-3 gap-2">
                {[40, 55, 35, 70, 60, 80, 65, 90, 75, 95, 85, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-emerald-500/20 rounded-sm"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="space-y-2">
                {[85, 62, 48].map((w, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/[0.02] rounded-xl p-3 border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500/40 shrink-0" />
                    <div className="flex-1 h-2 bg-white/5 rounded-full">
                      <div className="h-full bg-emerald-500/30 rounded-full" style={{ width: `${w}%` }} />
                    </div>
                    <div className="w-10 h-2 bg-white/10 rounded-full shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="px-8 py-3 bg-white text-[#001a2c] rounded-full text-sm font-medium tracking-tighter transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
              Kampanya Paneli İnceleniyor
            </span>
          </div>
        </div>

        <div ref={solutionRef} className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl text-white sticky top-32" style={displayFont}>Çözüm Mimarisi</h2>
          </div>
          <div className="md:w-2/3 space-y-6 text-white/70 leading-relaxed font-light">
            <p>
              Patron Tour'un hedef kitlesini demografik, coğrafik ve davranışsal boyutlarıyla derinlemesine segmentledik. Her segment için özelleştirilmiş içerik stratejileri ve reklam mesajları geliştirdik.
            </p>
            <p>
              Meta reklam altyapısını sıfırdan yeniden yapılandırdık. Farkındalık, değerlendirme ve dönüşüm aşamalarına özel huni mimarisi kurguladık. <strong>Lookalike kitleler</strong> ve <strong>retargeting akışları</strong> optimize edilerek bütçe verimliliği maksimize edildi.
            </p>
            <p>
              Sosyal medya içerik takvimi, turizm sektörünün mevsimsel dinamiklerine ve Patron Tour'un rezervasyon döngülerine göre planlandı. Her gönderi için etkileşim hedefleri belirlendi ve A/B testleriyle sürekli optimize edildi.
            </p>
          </div>
        </div>

        <div ref={resultsRef} className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl text-white sticky top-32" style={displayFont}>Sonuçlar</h2>
          </div>
          <div className="md:w-2/3 space-y-6">
            {[
              { metric: 'Performans Odaklı Reklam Mimarisi', detail: 'Meta platformunda funnelden dönüşüme uzanan tam kapsamlı kampanya altyapısı kuruldu.' },
              { metric: 'Sosyal Medya Büyüme Stratejisi', detail: 'Tutarlı içerik takvimi ve etkileşim odaklı yayın planıyla organik görünürlük güçlendirildi.' },
              { metric: 'Bütçe Optimizasyonu', detail: 'Hedefleme rafinemanı ve retargeting akışlarıyla reklam harcamasının geri dönüşü iyileştirildi.' },
            ].map((item) => (
              <div key={item.metric} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                <span className="block text-white font-medium mb-2">{item.metric}</span>
                <span className="block text-white/50 text-sm leading-relaxed">{item.detail}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      <section className="relative z-10 w-full border-t border-white/10 bg-white/[0.02] backdrop-blur-xl mt-20">
        <Link to="/calismalarimiz" className="block max-w-7xl mx-auto px-6 py-20 group">
          <span className="text-white/40 text-xs tracking-widest uppercase mb-4 block group-hover:text-emerald-400 transition-colors">Portfolyoya Dön</span>
          <h2 className="text-4xl md:text-6xl text-white transition-transform duration-500 transform group-hover:translate-x-4" style={displayFont}>
            Tüm Ekosistemi İncele <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">→</span>
          </h2>
        </Link>
      </section>

      <Footer />
    </div>
  )
}