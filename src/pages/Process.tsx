import { Link } from 'react-router-dom';

export default function Process() {
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
          <Link to="/surecimiz" className="text-sm text-white transition-colors">Sürecimiz</Link>
          <Link to="/calismalarimiz" className="text-sm text-muted-foreground hover:text-white transition-colors">Çalışmalarımız</Link>
        </div>
        <a href="/#intake" className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
          İletişime Geçin
        </a>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground block mb-4">İşleyiş Metodolojisi</span>
        <h1 className="text-5xl md:text-7xl leading-[0.95] tracking-[-2.46px] max-w-4xl font-normal text-white animate-fade-rise" style={displayFont}>
          Şansa değil, <em className="not-italic text-muted-foreground">sisteme güvenin.</em>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body animate-fade-rise-delay">
          Standart ajans kaosunu reddediyoruz. Başarıyı tesadüflere bırakmayan, adım adım planlanmış ve şeffaf bir "Güven Brokerlığı" sistemi ile projenizi sıfırdan zirveye taşıyoruz.
        </p>
      </main>

      <section className="relative z-10 max-w-4xl mx-auto px-8 py-16 space-y-12">
        <div className="liquid-glass rounded-[2rem] p-10 flex flex-col md:flex-row gap-8 items-start group hover:bg-white/5 transition-colors duration-500">
          <div className="w-16 h-16 shrink-0 rounded-full bg-white text-black flex items-center justify-center text-3xl font-bold font-sans transition-transform duration-500 group-hover:scale-110">1</div>
          <div>
            <h2 className="text-3xl font-normal text-white mb-4" style={displayFont}>Derin Analiz ve Kapsam Belirleme</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Her şey dinlemekle ve doğru soruları sormakla başlar. Markanızın mevcut darboğazlarını inceler, vizyonunuzu anlar ve pazarın gerçekleriyle yüzleştiririz. 
            </p>
            <ul className="text-sm text-white/70 space-y-2">
              <li>• Mevcut dijital varlıkların denetimi</li>
              <li>• Sektörel rakip ve pazar analizi</li>
              <li>• Zaman çizelgesi ve bütçe optimizasyon planı</li>
            </ul>
          </div>
        </div>

        <div className="liquid-glass rounded-[2rem] p-10 flex flex-col md:flex-row gap-8 items-start group hover:bg-white/5 transition-colors duration-500">
          <div className="w-16 h-16 shrink-0 rounded-full bg-white text-black flex items-center justify-center text-3xl font-bold font-sans transition-transform duration-500 group-hover:scale-110">2</div>
          <div>
            <h2 className="text-3xl font-normal text-white mb-4" style={displayFont}>Elit Uzman Eşleştirmesi (Brokerage)</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              İhtiyacınız olan şey sıradan çalışanlar değil, projenizin doğasına en uygun uzmanlardır. HeyAlls'un test edilmiş ve onaylanmış yetenek ağından, projeniz için en mükemmel ekibi bir araya getiriyoruz.
            </p>
            <ul className="text-sm text-white/70 space-y-2">
              <li>• Doğrulanmış geliştirici ve tasarımcı tahsisi</li>
              <li>• Proje yöneticisinin atanması</li>
              <li>• Şeffaf iletişim kanallarının kurulması</li>
            </ul>
          </div>
        </div>

        <div className="liquid-glass rounded-[2rem] p-10 flex flex-col md:flex-row gap-8 items-start group hover:bg-white/5 transition-colors duration-500">
          <div className="w-16 h-16 shrink-0 rounded-full bg-white text-black flex items-center justify-center text-3xl font-bold font-sans transition-transform duration-500 group-hover:scale-110">3</div>
          <div>
            <h2 className="text-3xl font-normal text-white mb-4" style={displayFont}>Kusursuz İcra ve Kalite Denetimi</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Operasyon başladığı andan itibaren tüm süreç HeyAlls güvencesiyle denetlenir. Teslim tarihlerine sadık kalınarak, vaat edilen kalite standartlarından asla ödün verilmeden projeniz hayata geçirilir.
            </p>
            <ul className="text-sm text-white/70 space-y-2">
              <li>• Çevik (Agile) yönetim ile düzenli raporlama</li>
              <li>• A/B testleri ve performans optimizasyonu</li>
              <li>• Anahtar teslim lansman ve devamlılık desteği</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-8 py-32 text-center">
        <h3 className="text-4xl font-normal text-white mb-6" style={displayFont}>Sürecin Bir Parçası Olun.</h3>
        <a href="/#intake" className="liquid-glass rounded-full px-12 py-4 text-base text-white transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-block">
          Sisteme Giriş Yapın
        </a>
      </section>

      <footer className="relative z-10 w-full text-center py-10 text-xs tracking-widest text-muted-foreground border-t border-white/5 bg-[#001a2c]/80 backdrop-blur-md">
        © 2026 HEYALLS AGENCY. TÜM HAKLARI SAKLIDIR.
      </footer>
    </div>
  );
}