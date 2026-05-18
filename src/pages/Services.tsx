import { Link } from 'react-router-dom';

export default function Services() {
  const displayFont = { fontFamily: "'Instrument Serif', serif" };

  return (
    <div className="relative min-h-screen w-full bg-[#001a2c] text-white selection:bg-white/20">
      
      {/* --- ALT SAYFA VİDEO ARKA PLANI (Daha Koyu & Odaklı) --- */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>
        {/* Yazıların okunurluğu için %85 lacivert karartma ve buzlu cam efekti eklendi */}
        <div className="absolute inset-0 bg-[#001a2c]/85 backdrop-blur-sm" />
      </div>

      <nav className="relative z-10 w-full px-8 py-6 max-w-7xl mx-auto flex flex-row justify-between items-center">
        <Link to="/" className="text-3xl tracking-tight text-white select-none" style={displayFont}>
          HeyAlls<sup className="text-xs font-sans ml-0.5">®</sup>
        </Link>
        <div className="hidden md:flex flex-row items-center gap-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-white transition-colors">Ana Sayfa</Link>
          <Link to="/hizmetlerimiz" className="text-sm text-white transition-colors">Hizmetlerimiz</Link>
          <Link to="/surecimiz" className="text-sm text-muted-foreground hover:text-white transition-colors">Sürecimiz</Link>
          <Link to="/calismalarimiz" className="text-sm text-muted-foreground hover:text-white transition-colors">Çalışmalarımız</Link>
        </div>
        <a href="/#intake" className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
          İletişime Geçin
        </a>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground block mb-4">Uzmanlık Alanlarımız</span>
        <h1 className="text-5xl md:text-7xl leading-[0.95] tracking-[-2.46px] max-w-4xl font-normal text-white animate-fade-rise" style={displayFont}>
          Sınırları aşan markalar için <em className="not-italic text-muted-foreground">kapsamlı çözümler.</em>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body animate-fade-rise-delay">
          HeyAlls, standart bir ajansın ötesinde, güvenilir çözüm ortaklıklarını elit operasyonel yeteneklerle eşleştiren denetlenmiş bir ağ platformudur. İşte vizyonunuzu gerçeğe dönüştürdüğümüz ana hatlar.
        </p>
      </main>

      <section className="relative z-10 max-w-5xl mx-auto px-8 py-16 space-y-24">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-normal text-white mb-6" style={displayFont}>Küresel E-Ticaret ve Yönetim.</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Yerel pazarlara sıkışıp kalmayın. Ürünlerinizi uluslararası standartlarda konumlandırarak global pazar yerlerinde rekabet edebilir hale getiriyoruz.
            </p>
            <ul className="text-sm text-white/80 space-y-3 mt-6">
              <li className="flex items-start gap-3"><span className="text-white">✓</span> Etsy ve Shopify gibi küresel pazar yeri trend analizleri ve optimizasyonları.</li>
              <li className="flex items-start gap-3"><span className="text-white">✓</span> Sınır ötesi e-ticaret için yüksek standartlarda katalog ve ürün veri yönetimi.</li>
              <li className="flex items-start gap-3"><span className="text-white">✓</span> Dönüşüm odaklı vitrin tasarımı ve güven brokerlığı operasyonları.</li>
            </ul>
          </div>
          <div className="order-1 md:order-2 liquid-glass w-full aspect-square md:aspect-[4/3] rounded-[2rem] flex items-center justify-center">
             <span className="text-6xl">🌍</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="liquid-glass w-full aspect-square md:aspect-[4/3] rounded-[2rem] flex items-center justify-center">
             <span className="text-6xl">💻</span>
          </div>
          <div>
            <h2 className="text-4xl font-normal text-white mb-6" style={displayFont}>Kapsayıcı İnteraktif Web Ortamları.</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Dijital dünyadaki eviniz, markanızın en büyük prestij kaynağıdır. Hazır ve hantal şablonları reddediyoruz. Markanıza özel, yüksek performanslı ve kullanıcıyı büyüleyen mimariler inşa ediyoruz.
            </p>
            <ul className="text-sm text-white/80 space-y-3 mt-6">
              <li className="flex items-start gap-3"><span className="text-white">✓</span> Three.js ve GSAP entegrasyonlarıyla güçlendirilmiş akıcı, interaktif web deneyimleri.</li>
              <li className="flex items-start gap-3"><span className="text-white">✓</span> İhtiyacınıza tam uyumlu, özel kodlanmış WordPress CMS altyapıları.</li>
              <li className="flex items-start gap-3"><span className="text-white">✓</span> SEO uyumlu, ışık hızında yüklenen ve tüm cihazlarda kusursuz çalışan tasarımlar.</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-normal text-white mb-6" style={displayFont}>Stratejik Dijital Konumlandırma.</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Harika bir ürün veya hizmet, doğru kitleye anlatılamadığında görünmez olur. Markanızın hikayesini, doğru algı yönetimi ve veri odaklı performans pazarlaması ile kitlelere ulaştırıyoruz.
            </p>
            <ul className="text-sm text-white/80 space-y-3 mt-6">
              <li className="flex items-start gap-3"><span className="text-white">✓</span> Modern görsel ve işitsel araçlarla kurgulanmış sinematik içerik stratejileri.</li>
              <li className="flex items-start gap-3"><span className="text-white">✓</span> Hedef kitle analizi ve dönüşüm odaklı performans (Meta/Google) reklam kampanyaları.</li>
              <li className="flex items-start gap-3"><span className="text-white">✓</span> Marka sesinin oluşturulması ve kurumsal güvenilirliğin sosyal mecralarda inşası.</li>
            </ul>
          </div>
          <div className="order-1 md:order-2 liquid-glass w-full aspect-square md:aspect-[4/3] rounded-[2rem] flex items-center justify-center">
             <span className="text-6xl">👁️</span>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-8 py-32 text-center">
        <h3 className="text-4xl font-normal text-white mb-6" style={displayFont}>Hazırsanız, Başlayalım.</h3>
        <p className="text-muted-foreground text-base mb-10">Projelerinizi sadece dinlemiyor, doğru uzman ağıyla hayata geçiriyoruz.</p>
        <a href="/#intake" className="liquid-glass rounded-full px-12 py-4 text-base text-white transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-block">
          Projeyi Değerlendirin
        </a>
      </section>

      <footer className="relative z-10 w-full text-center py-10 text-xs tracking-widest text-muted-foreground border-t border-white/5 bg-[#001a2c]/80 backdrop-blur-md">
        © 2026 HEYALLS AGENCY. TÜM HAKLARI SAKLIDIR.
      </footer>
    </div>
  );
}   