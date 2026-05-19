import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import VideoBackground from '@/components/VideoBackground';
import { displayFont } from '@/utils/styles'; // Düzeltildi: constants -> styles
import { updateSEO } from '@/utils/seo';

export default function Process() {
  useEffect(() => {
    updateSEO({
      title: 'Nasıl Çalışır? | Sürecimiz',
      description:
        'İhtiyacınızı analiz ediyor, en doğru onaylı çözüm ortağı ile eşleştiriyor ve tüm süreci yönetiyoruz.',
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#001a2c] text-white selection:bg-white/20">
      <VideoBackground overlayOpacity="dark" />
      <Navbar activePage="process" />

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
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
          Standart ajans kaosunu reddediyoruz. Başarıyı tesadüflere bırakmayan şeffaf bir "Güven
          Brokerlığı" sistemi ile projenizi zirveye taşıyoruz.
        </p>
      </main>

      <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 py-16 space-y-12">
        {/* Adım 1 */}
        <div className="bg-white/5 backdrop-blur-lg rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start group border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all duration-500 shadow-xl">
          <div className="w-16 h-16 shrink-0 rounded-full border border-white/20 bg-white/5 text-white flex items-center justify-center text-2xl font-semibold transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:scale-105">
            01
          </div>
          <div>
            <h2
              className="text-3xl font-normal text-white mb-4 transition-colors duration-300 group-hover:text-blue-400"
              style={displayFont}
            >
              Derin Analiz ve Kapsam Belirleme
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Her şey dinlemekle başlar. Markanızın mevcut darboğazlarını inceler, vizyonunuzu anlarız.
            </p>
            <ul className="text-sm text-white/40 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-blue-400/70 text-xs">▪</span>
                Mevcut dijital varlıkların denetimi
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400/70 text-xs">▪</span>
                Sektörel rakip ve pazar analizi
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400/70 text-xs">▪</span>
                Zaman çizelgesi ve bütçe optimizasyon planı
              </li>
            </ul>
          </div>
        </div>

        {/* Adım 2 */}
        <div className="bg-white/5 backdrop-blur-lg rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start group border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all duration-500 shadow-xl">
          <div className="w-16 h-16 shrink-0 rounded-full border border-white/20 bg-white/5 text-white flex items-center justify-center text-2xl font-semibold transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:scale-105">
            02
          </div>
          <div>
            <h2
              className="text-3xl font-normal text-white mb-4 transition-colors duration-300 group-hover:text-blue-400"
              style={displayFont}
            >
              Elit Uzman Eşleştirmesi (Brokerage)
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              HeyAlls'un test edilmiş yetenek ağından, projeniz için en mükemmel ekibi bir araya getiriyoruz.
            </p>
            <ul className="text-sm text-white/40 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-blue-400/70 text-xs">▪</span>
                Doğrulanmış geliştirici ve tasarımcı tahsisi
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400/70 text-xs">▪</span>
                Proje yöneticisinin atanması
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400/70 text-xs">▪</span>
                Şeffaf iletişim kanallarının kurulması
              </li>
            </ul>
          </div>
        </div>

        {/* Adım 3 */}
        <div className="bg-white/5 backdrop-blur-lg rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start group border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all duration-500 shadow-xl">
          <div className="w-16 h-16 shrink-0 rounded-full border border-white/20 bg-white/5 text-white flex items-center justify-center text-2xl font-semibold transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:scale-105">
            03
          </div>
          <div>
            <h2
              className="text-3xl font-normal text-white mb-4 transition-colors duration-300 group-hover:text-blue-400"
              style={displayFont}
            >
              Kusursuz İcra ve Kalite Denetimi
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Operasyon başladığı andan itibaren tüm süreç denetlenir. Teslim tarihlerine sadık
              kalınarak proje hayata geçirilir.
            </p>
            <ul className="text-sm text-white/40 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-blue-400/70 text-xs">▪</span>
                Çevik (Agile) yönetim ile düzenli raporlama
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400/70 text-xs">▪</span>
                A/B testleri ve performans optimizasyonu
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400/70 text-xs">▪</span>
                Anahtar teslim lansman ve devamlılık desteği
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
        <h3 className="text-4xl font-normal text-white mb-6" style={displayFont}>
          Sürecin Bir Parçası Olun.
        </h3>
        <a
          href="/#intake"
          className="bg-white/10 backdrop-blur-md rounded-full px-12 py-4 text-base text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-white/20 hover:border-white/40 inline-block"
        >
          Sisteme Giriş Yapın
        </a>
      </section>

      <footer className="relative z-10 w-full text-center py-8 text-xs tracking-widest text-white/40 border-t border-white/5 bg-[#001a2c]/80 backdrop-blur-md">
        © 2026 HEYALLS. TÜM HAKLARI SAKLIDIR.
      </footer>
    </div>
  )
}