import { useEffect } from 'react';
import { updateSEO } from '../utils/seo';
useEffect(() => {
  updateSEO({
    title: 'Hizmetlerimiz ve Çözümlerimiz',
    description: 'Yazılımdan dijital pazarlamaya, tasarım danışmanlığından kurumsal çözümlere kadar HeyAlls onaylı ortaklarının sunduğu elit hizmetler.'
  });
}, []);
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import VideoBackground from '../components/VideoBackground'
import { displayFont } from '../utils/styles'

export default function Services() {
  return (
    <div className="relative min-h-screen w-full bg-[#001a2c] text-white selection:bg-white/20">
      <VideoBackground overlayOpacity="dark" />

      <Navbar activePage="services" />

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <span className="text-xs font-medium uppercase tracking-widest text-white/50 block mb-4">
          Uzmanlık Alanlarımız
        </span>
        <h1
          className="text-5xl md:text-7xl leading-[0.95] tracking-[-2.46px] max-w-4xl font-normal text-white animate-fade-rise"
          style={displayFont}
        >
          Sınırları aşan markalar için{' '}
          <em className="not-italic text-white/60">kapsamlı çözümler.</em>
        </h1>
        <p className="text-white/60 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body animate-fade-rise-delay">
          HeyAlls, standart bir ajansın ötesinde, güvenilir çözüm ortaklıklarını elit operasyonel
          yeteneklerle eşleştiren denetlenmiş bir ağ platformudur. İşte vizyonunuzu gerçeğe
          dönüştürdüğümüz ana hatlar.
        </p>
      </main>

      <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 py-16 space-y-24">
        {/* E-Commerce */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-normal text-white mb-6" style={displayFont}>
              Küresel E-Ticaret ve Yönetim.
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Yerel pazarlara sıkışıp kalmayın. Ürünlerinizi uluslararası standartlarda
              konumlandırarak global pazar yerlerinde rekabet edebilir hale getiriyoruz.
            </p>
            <ul className="text-sm text-white/80 space-y-3 mt-6">
              <li className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                Etsy ve Shopify gibi küresel pazar yeri trend analizleri ve optimizasyonları.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                Sınır ötesi e-ticaret için yüksek standartlarda katalog ve ürün veri yönetimi.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                Dönüşüm odaklı vitrin tasarımı ve güven brokerlığı operasyonları.
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2 liquid-glass w-full aspect-square md:aspect-[4/3] rounded-[2rem] flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent shadow-inner group">
            <span className="text-6xl transition-transform duration-500 group-hover:scale-110">🌍</span>
          </div>
        </div>

        {/* Web */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="liquid-glass w-full aspect-square md:aspect-[4/3] rounded-[2rem] flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent shadow-inner group">
            <span className="text-6xl transition-transform duration-500 group-hover:scale-110">💻</span>
          </div>
          <div>
            <h2 className="text-4xl font-normal text-white mb-6" style={displayFont}>
              Kapsayıcı İnteraktif Web Ortamları.
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Dijital dünyadaki eviniz, markanızın en büyük prestij kaynağıdır. Hazır ve hantal
              şablonları reddediyoruz. Markanıza özel, yüksek performanslı ve kullanıcıyı büyüleyen
              mimariler inşa ediyoruz.
            </p>
            <ul className="text-sm text-white/80 space-y-3 mt-6">
              <li className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                Three.js ve GSAP entegrasyonlarıyla güçlendirilmiş akıcı, interaktif web deneyimleri.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                İhtiyacınıza tam uyumlu, özel kodlanmış WordPress CMS altyapıları.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                SEO uyumlu, ışık hızında yüklenen ve tüm cihazlarda kusursuz çalışan tasarımlar.
              </li>
            </ul>
          </div>
        </div>

        {/* Marketing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-normal text-white mb-6" style={displayFont}>
              Stratejik Dijital Konumlandırma.
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Harika bir ürün veya hizmet, doğru kitleye anlatılamadığında görünmez olur.
              Markanızın hikayesini, doğru algı yönetimi ve veri odaklı performans pazarlaması ile
              kitlelere ulaştırıyoruz.
            </p>
            <ul className="text-sm text-white/80 space-y-3 mt-6">
              <li className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                Modern görsel ve işitsel araçlarla kurgulanmış sinematik içerik stratejileri.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                Hedef kitle analizi ve dönüşüm odaklı performans (Meta/Google) reklam kampanyaları.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400">✓</span>
                Marka sesinin oluşturulması ve kurumsal güvenilirliğin sosyal mecralarda inşası.
              </li>
            </ul>
          </div>
          <div className="liquid-glass w-full aspect-square md:aspect-[4/3] rounded-[2rem] flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent shadow-inner group">
            <span className="text-6xl transition-transform duration-500 group-hover:scale-110">👁️</span>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
        <h3 className="text-4xl font-normal text-white mb-6" style={displayFont}>
          Hazırsanız, Başlayalım.
        </h3>
        <p className="text-white/60 text-base mb-10">
          Projelerinizi sadece dinlemiyor, doğru uzman ağıyla hayata geçiriyoruz.
        </p>
        
        {/* Yumuşak geçiş sağlayan SPA yönlendirmesi */}
        <Link
          to="/#intake"
          className="liquid-glass rounded-full px-12 py-4 text-base text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-block border border-white/20 hover:border-white/50"
        >
          Projeyi Değerlendirin
        </Link>
      </section>

      <footer className="relative z-10 w-full text-center py-8 text-xs tracking-widest text-white/40 border-t border-white/5 bg-[#001a2c]/80 backdrop-blur-md">
        © 2026 HEYALLS. TÜM HAKLARI SAKLIDIR.
      </footer>
    </div>
  )
}