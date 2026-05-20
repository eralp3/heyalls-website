import Navbar from '@/components/Navbar'
import VideoBackground from '@/components/VideoBackground'
import Footer from '@/components/Footer'
import { displayFont } from '@/utils/styles'
import { useSEO } from '@/hooks/useSEO'

export default function Process() {
  useSEO(
    'Nasıl Çalışır? | Sürecimiz',
    'İhtiyacınızı analiz ediyor, projenizi özel ekibimizle tek merkezden uçtan uca geliştiriyor ve yönetiyoruz.'
  )

  return (
    <div className="relative min-h-screen w-full bg-[#001a2c] text-white selection:bg-white/20">
      <VideoBackground overlayOpacity="dark" />
      <Navbar activePage="process" />

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-36 pb-16">
        <span className="text-xs font-medium uppercase tracking-widest text-white/50 block mb-4 animate-fade-rise">
          İşleyiş Metodolojisi
        </span>
        <h1
          className="text-5xl md:text-7xl leading-[0.95] tracking-[-2.46px] max-w-4xl font-normal text-white animate-fade-rise"
          style={displayFont}
        >
          Şansa değil,{' '}
          <em className="not-italic text-white/60">sisteme güvenin.</em>
        </h1>
        <p className="text-white/60 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body animate-fade-rise-delay">
          Standart ajans kaosunu ve aracıları reddediyoruz. Başarıyı tesadüflere bırakmayan,
          tüm süreçlerin tek merkezden uçtan uca yönetildiği entegre bir sistemle projenizi zirveye taşıyoruz.
        </p>
      </main>

      <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 py-16 space-y-12">
        {[
          {
            step: '01',
            title: 'Derin Analiz ve Strateji',
            desc: 'Her şey dinlemekle başlar. Markanızın mevcut darboğazlarını inceler, vizyonunuzu anlar ve en doğru dijital yol haritasını çizeriz.',
            items: ['Mevcut dijital varlıkların denetimi', 'Sektörel rakip ve pazar analizi', 'Zaman çizelgesi ve bütçe optimizasyon planı'],
          },
          {
            step: '02',
            title: 'Entegre Geliştirme (In-House)',
            desc: 'Projeyi dışarıya dağıtmak yerine, HeyAlls\'un deneyimli ekibi süreci devralır. Web mimarisinden pazarlamaya kadar her şey tek merkezde, uyum içinde üretilir.',
            items: ['Modern altyapılarla kodlama ve tasarım', 'Kesintisiz ve şeffaf iletişim', 'Dışa bağımlı olmayan, hızlı reaksiyon süreci'],
          },
          {
            step: '03',
            title: 'Kusursuz İcra ve Lansman',
            desc: 'Operasyon başladığı andan itibaren tüm süreç denetlenir. Katı kalite kontrol standartlarımızla projenizi yayına alır ve büyütürüz.',
            items: ['Yayına almadan önce katı performans testleri', 'Anahtar teslim lansman stratejisi', 'Sürekli optimizasyon ve devamlılık desteği'],
          },
        ].map((card) => (
          <div key={card.step} className="bg-white/5 backdrop-blur-lg rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start group border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all duration-500 shadow-xl">
            <div className="w-16 h-16 shrink-0 rounded-full border border-white/20 bg-white/5 text-white flex items-center justify-center text-2xl font-semibold transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:scale-105">
              {card.step}
            </div>
            <div>
              <h2 className="text-3xl font-normal text-white mb-4 transition-colors duration-300 group-hover:text-blue-400" style={displayFont}>
                {card.title}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-4">{card.desc}</p>
              <ul className="text-sm text-white/40 space-y-2">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-blue-400/70 text-xs">▪</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
        <h3 className="text-4xl font-normal text-white mb-6" style={displayFont}>Sürecin Bir Parçası Olun.</h3>
        <p className="text-white/50 text-sm mb-8">Kaliteyi korumak adına her dönem yalnızca sınırlı sayıda projeyi kabul ediyoruz.</p>
        <a
          href="/#intake"
          className="bg-white/10 backdrop-blur-md rounded-full px-12 py-4 text-base text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/20 hover:border-white/40 inline-block"
        >
          Projeyi Başlat
        </a>
      </section>

      <Footer />
    </div>
  )
}