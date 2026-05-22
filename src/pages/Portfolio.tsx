import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import VideoBackground from '@/components/VideoBackground'
import Footer from '@/components/Footer'
import { displayFont } from '@/utils/styles'
import { useSEO } from '@/hooks/useSEO'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const projects = [
  {
    id: 'bimeeting',
    path: '/calismalarimiz/bimeeting',
    name: 'Bimeeting Language',
    visual: 'Bimeeting Platform',
    tags: ['Özel Altyapı', 'Topluluk Yönetimi'],
    desc: 'Modern dil öğrenim vizyonuyla yola çıkan Bimeeting için konuşma kulüplerinin entegre edildiği, kesintisiz bir platform mimarisi oluşturduk.',
    reverse: false,
  },
  {
    id: 'orimo',
    path: '/calismalarimiz/orimo',
    name: 'Orimo Auto Katalog Operasyonu',
    visual: 'Orimo Auto',
    tags: ['Avrupa Pazarı', 'Global Ticaret'],
    desc: 'Avrupa pazarına açılan üst segment otomotiv krom aksesuar markası için küresel standartlarda bir e-ticaret veri entegrasyonu sağladık.',
    reverse: true,
  },
  {
    id: 'carreas',
    path: '/calismalarimiz/carreas',
    name: 'Carreas E-Ticaret Yönetimi',
    visual: 'Carreas Streetwear',
    tags: ['Vitrin Yönetimi', 'Dönüşüm'],
    desc: 'Sokak modasının dinamik markalarından biri olan Carreas için Shopier altyapısında kapsamlı bir vitrin ve mağaza optimizasyonu yürüttük.',
    reverse: false,
  },
]

function RevealRow({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useScrollReveal<HTMLDivElement>({ delay, threshold: 0.1 })
  return <div ref={ref}>{children}</div>
}

export default function Portfolio() {
  useSEO(
    'Başarı Hikayeleri | Portfolyo | HeyAlls',
    'HeyAlls ekosistemindeki seçkin uzmanların ve markaların hayata geçirdiği nitelikli projeleri, vaka çalışmalarını inceleyin.'
  )

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const ctaRef = useScrollReveal<HTMLElement>({ delay: 0 })

  return (
    <div className="relative min-h-screen w-full bg-[#001a2c] text-white selection:bg-white/20">
      <VideoBackground overlayOpacity="dark" />
      <Navbar activePage="portfolio" />

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-36 pb-16">
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
        {projects.map((project, i) => (
          <RevealRow key={project.id} delay={i * 80}>
            <div className="flex flex-col lg:flex-row gap-12 items-center group">
              <div className={`w-full lg:w-1/2 ${project.reverse ? 'order-2 lg:order-1' : ''}`}>
                {project.reverse ? (
                  <div className="space-y-6">
                    <div className="flex gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 bg-white/5 rounded-full text-white/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-4xl font-normal text-white transition-colors duration-300 group-hover:text-blue-400" style={displayFont}>
                      {project.name}
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed">{project.desc}</p>
                    {/* FIX: Now links to its own case study page */}
                    <Link
                      to={project.path}
                      className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-300 mt-2"
                    >
                      Vaka Çalışmasını Gör <span className="text-blue-500">→</span>
                    </Link>
                  </div>
                ) : (
                  <Link to={project.path} className="block">
                    <div className="bg-white/5 backdrop-blur-lg w-full aspect-video rounded-[2rem] overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent shadow-inner border border-white/5 group-hover:border-white/10 transition-all duration-500">
                      <span className="text-3xl md:text-4xl text-white/40 group-hover:text-white group-hover:scale-105 transition-all duration-700 select-none" style={displayFont}>
                        {project.visual}
                      </span>
                    </div>
                  </Link>
                )}
              </div>

              <div className={`w-full lg:w-1/2 ${project.reverse ? 'order-1 lg:order-2' : ''}`}>
                {project.reverse ? (
                  <Link to={project.path} className="block">
                    <div className="bg-white/5 backdrop-blur-lg w-full aspect-video rounded-[2rem] overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent shadow-inner border border-white/5 group-hover:border-white/10 transition-all duration-500">
                      <span className="text-3xl md:text-4xl text-white/40 group-hover:text-white group-hover:scale-105 transition-all duration-700 select-none" style={displayFont}>
                        {project.visual}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="space-y-6">
                    <div className="flex gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/10 bg-white/5 rounded-full text-white/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-4xl font-normal text-white transition-colors duration-300 group-hover:text-blue-400" style={displayFont}>
                      {project.name}
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed">{project.desc}</p>
                    <Link
                      to={project.path}
                      className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-300 mt-2"
                    >
                      Vaka Çalışmasını Gör <span className="text-blue-500">→</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </RevealRow>
        ))}
      </section>

      <section ref={ctaRef} className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
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

      <Footer />
    </div>
  )
}