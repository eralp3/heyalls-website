import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import VideoBackground from '@/components/VideoBackground'
import Footer from '@/components/Footer'
import { displayFont } from '@/utils/styles'
import { useSEO } from '@/hooks/useSEO'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Bimeeting() {
  useSEO(
    'Bimeeting Language Platform | HeyAlls Case Study',
    'Konuşma kulüplerini ve canlı dersleri tek arayüzde birleştiren özel platform mimarisi. HeyAlls vaka çalışması.'
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
          <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-xs text-white/70 uppercase tracking-widest border border-white/10">Özel Altyapı</span>
          <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-xs text-white/70 uppercase tracking-widest border border-white/10">Topluluk Yönetimi</span>
        </div>
        <h1 className="text-5xl md:text-8xl leading-[0.95] tracking-tight font-normal text-white mb-6 animate-fade-rise" style={displayFont}>
          Bimeeting
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl font-light leading-relaxed animate-fade-rise-delay">
          Konuşma kulüplerini ve canlı dersleri tek arayüzde birleştiren özel bir platform mimarisi tasarladık ve kurduk. [Lansmanın ilk 60 gününde 5.000+ aktif kullanıcı] kazandıran kesintisiz bir deneyim yarattık.
        </p>
      </main>

      {/* Metrics */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20 animate-fade-rise-delay-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Alan', value: 'Dil Eğitimi' },
            { label: 'Altyapı', value: 'Özel Platform' },
            { label: 'Kapsam', value: 'Topluluk + LMS' },
            { label: 'Sonuç', value: 'Kesintisiz UX' },
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

        <div ref={challengeRef} className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl text-white sticky top-32" style={displayFont}>Meydan Okuma</h2>
          </div>
          <div className="md:w-2/3 space-y-6 text-white/70 leading-relaxed font-light">
            <p>
              Bimeeting, modern dil öğrenim deneyimini yeniden tanımlamak için yola çıkan dinamik bir markaydı. Ancak vizyonun gerektirdiği konuşma kulübü oturumları, canlı dersler ve öğrenci ilerlemesi takibi gibi farklı modüller; mevcut hazır altyapılarda parçalı ve verimsiz bir kullanıcı deneyimi yaratıyordu.
            </p>
            <p>
              Marka, kullanıcıları üçüncü taraf araçlar arasında yönlendirmek yerine; tüm öğrenim yolculuğunu kendi ekosisteminde toplayan, ölçeklenebilir bir platforma ihtiyaç duyuyordu.
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
          <div className="pt-16 px-8 grid grid-cols-12 gap-4 h-full opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            <div className="col-span-3 space-y-3 pt-2">
              <div className="h-5 w-full bg-blue-500/20 rounded-lg" />
              {['Dashboard', 'Konuşma Kulübü', 'Dersler', 'İlerleme'].map(item => (
                <div key={item} className="h-8 w-full bg-white/[0.03] rounded-lg border border-white/5 flex items-center px-3">
                  <div className="h-2 w-2 rounded-full bg-white/20 mr-2" />
                  <span className="text-white/20 text-[9px]">{item}</span>
                </div>
              ))}
            </div>
            <div className="col-span-9 space-y-4 pt-2">
              <div className="grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-blue-500/10 rounded-xl p-3 border border-white/5">
                    <div className="h-5 w-3/4 bg-white/10 rounded mb-1" />
                    <div className="h-3 w-1/2 bg-white/5 rounded" />
                  </div>
                ))}
              </div>
              <div className="h-28 bg-white/[0.02] rounded-2xl border border-white/5 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/3 bg-white/10 rounded-full" />
                    <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-10 bg-white/[0.03] rounded-lg border border-white/5" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="px-8 py-3 bg-white text-[#001a2c] rounded-full text-sm font-medium tracking-tighter transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl">
              Platform Mimarisi İnceleniyor
            </span>
          </div>
        </div>

        <div ref={solutionRef} className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl text-white sticky top-32" style={displayFont}>Çözüm Mimarisi</h2>
          </div>
          <div className="md:w-2/3 space-y-6 text-white/70 leading-relaxed font-light">
            <p>
              Bimeeting'in vizyonunu derinlemesine inceledikten sonra, hazır altyapılar yerine markanın ihtiyaçlarına özel bir platform tasarladık. Konuşma kulübü oturumları, canlı ders entegrasyonu, öğrenci ilerleme takibi ve topluluk yönetimi modüllerini tek bir arayüz altında birleştirdik.
            </p>
            <p>
              Platformun mimarisini <strong>ölçeklenebilir bir altyapı üzerinde kurguladık</strong>; kullanıcı sayısı arttıkça performansın etkilenmemesi için her modülü bağımsız ancak uyumlu çalışacak şekilde geliştirdik.
            </p>
            <p>
              Yönetici paneli; eğitmen kadrosunun ders programlarını, topluluk etkileşimlerini ve öğrenci verilerini tek noktadan yönetmesini sağlayacak şekilde özelleştirildi.
            </p>
          </div>
        </div>

        <div ref={resultsRef} className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <h2 className="text-3xl text-white sticky top-32" style={displayFont}>Sonuçlar</h2>
          </div>
          <div className="md:w-2/3 space-y-6">
            {[
              { metric: 'Bütünsel Platform Mimarisi', detail: 'Konuşma kulüpleri, canlı dersler ve topluluk yönetimi tek arayüzde kesintisiz hale geldi.' },
              { metric: 'Ölçeklenebilir Altyapı', detail: 'Kullanıcı sayısı büyüdükçe performans düşmeyecek şekilde modüler olarak geliştirildi.' },
              { metric: 'Operasyonel Verimlilik', detail: 'Eğitmen ve yönetici ekipleri tüm süreçleri tek panel üzerinden yönetebilir hale geldi.' },
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