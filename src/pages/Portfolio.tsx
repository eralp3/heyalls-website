import { Link } from 'react-router-dom';

export default function Portfolio() {
  const displayFont = { fontFamily: "'Instrument Serif', serif" };

  return (
    <div className="relative min-h-screen w-full bg-[#001a2c] text-white selection:bg-white/20">
      
      {/* --- ALT SAYFA VİDEO ARKA PLANI --- */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#001a2c]/85 backdrop-blur-sm" />
      </div>

      <nav className="relative z-10 w-full px-8 py-6 max-w-7xl mx-auto flex flex-row justify-between items-center">
        <Link to="/" className="text-3xl tracking-tight text-white select-none" style={displayFont}>
          HeyAlls<sup className="text-xs font-sans ml-0.5">®</sup>
        </Link>
        <div className="hidden md:flex flex-row items-center gap-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-white transition-colors">Ana Sayfa</Link>
          <Link to="/hizmetlerimiz" className="text-sm text-muted-foreground hover:text-white transition-colors">Hizmetlerimiz</Link>
          <Link to="/surecimiz" className="text-sm text-muted-foreground hover:text-white transition-colors">Sürecimiz</Link>
          <Link to="/calismalarimiz" className="text-sm text-white transition-colors">Çalışmalarımız</Link>
        </div>
        <a href="/#intake" className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
          İletişime Geçin
        </a>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground block mb-4">Seçilmiş Projeler</span>
        <h1 className="text-5xl md:text-7xl leading-[0.95] tracking-[-2.46px] max-w-4xl font-normal text-white animate-fade-rise" style={displayFont}>
          Fikirden, <em className="not-italic text-muted-foreground">küresel operasyona.</em>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body animate-fade-rise-delay">
          HeyAlls güvencesiyle denetlenen, özel web mimarilerinden sınır ötesi e-ticaret süreçlerine kadar başarıyla uçtan uca yönettiğimiz çözüm ortaklıklarımız.
        </p>
      </main>

      <section className="relative z-10 max-w-6xl mx-auto px-8 py-16 space-y-32">
        
        {/* Bimeeting */}
        <div className="flex flex-col lg:flex-row gap-12 items-center group">
          <div className="w-full lg:w-1/2">
            <div className="liquid-glass w-full aspect-video rounded-[2rem] overflow-hidden relative flex items-center justify-center">
               <span className="text-4xl text-white/50 group-hover:scale-110 transition-transform duration-700" style={displayFont}>Bimeeting Platform</span>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="flex gap-2">
              <span className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/20 rounded-full text-white/70">Özel Altyapı</span>
              <span className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/20 rounded-full text-white/70">Topluluk Yönetimi</span>
            </div>
            <h2 className="text-4xl font-normal text-white" style={displayFont}>Bimeeting Language</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Modern dil öğrenim vizyonuyla yola çıkan Bimeeting için konuşma kulüplerinin entegre edildiği, kesintisiz bir platform mimarisi oluşturduk. Platformun sosyal kampanya süreçlerini baştan sona yönettik.
            </p>
          </div>
        </div>

        {/* Orimo Auto */}
        <div className="flex flex-col lg:flex-row gap-12 items-center group">
          <div className="w-full lg:w-1/2 order-2 lg:order-1 space-y-6">
            <div className="flex gap-2">
              <span className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/20 rounded-full text-white/70">Avrupa Pazarı</span>
              <span className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/20 rounded-full text-white/70">Global Ticaret</span>
            </div>
            <h2 className="text-4xl font-normal text-white" style={displayFont}>Orimo Auto Katalog Operasyonu</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Avrupa pazarına açılan üst segment otomotiv krom aksesuar markası için küresel standartlarda bir e-ticaret veri entegrasyonu sağladık. Ürünlerin yurt dışı pazar yerlerindeki listeleme mimarisini kurguladık.
            </p>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="liquid-glass w-full aspect-video rounded-[2rem] overflow-hidden relative flex items-center justify-center">
               <span className="text-4xl text-white/50 group-hover:scale-110 transition-transform duration-700" style={displayFont}>Orimo Auto</span>
            </div>
          </div>
        </div>

        {/* Carreas */}
        <div className="flex flex-col lg:flex-row gap-12 items-center group">
          <div className="w-full lg:w-1/2">
            <div className="liquid-glass w-full aspect-video rounded-[2rem] overflow-hidden relative flex items-center justify-center">
               <span className="text-4xl text-white/50 group-hover:scale-110 transition-transform duration-700" style={displayFont}>Carreas Streetwear</span>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="flex gap-2">
              <span className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/20 rounded-full text-white/70">Vitrin Yönetimi</span>
              <span className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/20 rounded-full text-white/70">Dönüşüm</span>
            </div>
            <h2 className="text-4xl font-normal text-white" style={displayFont}>Carreas E-Ticaret Yönetimi</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sokak modasının dinamik markalarından biri olan Carreas için Shopier altyapısında kapsamlı bir vitrin ve mağaza optimizasyonu yürüttük. SEO uyumlu ürün metinleri oluşturarak dönüşümü artırdık.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-8 py-32 text-center">
        <h3 className="text-4xl font-normal text-white mb-6" style={displayFont}>Sonraki Başarı Hikayesi Sizin Olsun.</h3>
        <a href="/#intake" className="liquid-glass rounded-full px-12 py-4 text-base text-white transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-block">
          Bizimle Tanışın
        </a>
      </section>

      <footer className="relative z-10 w-full text-center py-10 text-xs tracking-widest text-muted-foreground border-t border-white/5 bg-[#001a2c]/80 backdrop-blur-md">
        © 2026 HEYALLS AGENCY. TÜM HAKLARI SAKLIDIR.
      </footer>
    </div>
  );
}