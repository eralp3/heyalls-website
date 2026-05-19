import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import VideoBackground from '@/components/VideoBackground';
import { displayFont } from '@/utils/styles';
import { updateSEO } from '@/utils/seo';

export default function Services() {
  useEffect(() => {
    updateSEO({
      title: 'Hizmetlerimiz | Uçtan Uca Çözümler',
      description: 'Web geliştirme, e-ticaret yönetimi ve dijital pazarlama alanlarında HeyAlls güvencesiyle sunduğumuz entegre hizmet paketleri.',
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#001a2c] text-white selection:bg-white/20">
      <VideoBackground overlayOpacity="dark" />
      <Navbar activePage="services" />

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <span className="text-xs font-medium uppercase tracking-widest text-white/50 block mb-4 animate-fade-rise">
          Hizmet Yelpazemiz
        </span>
        <h1
          className="text-5xl md:text-7xl leading-[0.95] tracking-[-2.46px] max-w-4xl font-normal text-white animate-fade-rise"
          style={displayFont}
        >
          Dijitalde,{' '}
          <em className="not-italic text-white/60">uçtan uca hakemlik.</em>
        </h1>
        <p className="text-white/60 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body animate-fade-rise-delay">
          İhtiyacınız olan her şeyi parçalar halinde dışarıda aramayın. HeyAlls olarak markanızı sıfırdan alıyor, kodluyor, tasarlıyor ve küresel pazara hazırlıyoruz.
        </p>
      </main>

      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Paket 1 */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all duration-500 flex flex-col h-full">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          </div>
          <h3 className="text-2xl mb-4 text-white" style={displayFont}>Web Mimarisi & Geliştirme</h3>
          <p className="text-white/60 text-sm leading-relaxed flex-grow">
            Dinamik animasyonlar ve esnek altyapılarla markanızın dijital vitrinini inşa ediyoruz. Sadece güzel görünen değil, hızlı ve SEO uyumlu web sistemleri kuruyoruz.
          </p>
          <ul className="text-sm text-white/40 mt-6 space-y-2">
            <li className="flex items-center gap-2">▪ Modern UI/UX Tasarımı</li>
            <li className="flex items-center gap-2">▪ Kurumsal Web & Blog Altyapıları</li>
            <li className="flex items-center gap-2">▪ Topluluk & Platform Yönetimi</li>
          </ul>
        </div>

        {/* Paket 2 */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all duration-500 flex flex-col h-full">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
          <h3 className="text-2xl mb-4 text-white" style={displayFont}>Küresel E-Ticaret</h3>
          <p className="text-white/60 text-sm leading-relaxed flex-grow">
            Ürünlerinizi yerel ve global pazaryerlerinde başarıyla konumlandırıyoruz. Sınır ötesi e-ticaret süreçlerinde entegre mağaza ve dönüşüm yönetimi sağlıyoruz.
          </p>
          <ul className="text-sm text-white/40 mt-6 space-y-2">
            <li className="flex items-center gap-2">▪ Mağaza Kurulumu & Optimizasyonu</li>
            <li className="flex items-center gap-2">▪ Katalog ve Vitrin Yönetimi</li>
            <li className="flex items-center gap-2">▪ Yurt Dışı Pazaryeri Entegrasyonları</li>
          </ul>
        </div>

        {/* Paket 3 */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all duration-500 flex flex-col h-full">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
          </div>
          <h3 className="text-2xl mb-4 text-white" style={displayFont}>Dijital Marka & Pazarlama</h3>
          <p className="text-white/60 text-sm leading-relaxed flex-grow">
            Markanızın dijitaldeki sesini bulmasını sağlıyoruz. Hedef kitleye özel içerik stratejileri ve dönüşüm odaklı performans reklamlarıyla büyümenizi hızlandırıyoruz.
          </p>
          <ul className="text-sm text-white/40 mt-6 space-y-2">
            <li className="flex items-center gap-2">▪ Sosyal Medya Yönetimi</li>
            <li className="flex items-center gap-2">▪ Meta & Google Ads Reklamları</li>
            <li className="flex items-center gap-2">▪ Kurumsal Kimlik & İçerik Stratejisi</li>
          </ul>
        </div>

      </section>

      <footer className="relative z-10 w-full text-center py-8 text-xs tracking-widest text-white/40 border-t border-white/5 bg-[#001a2c]/80 backdrop-blur-md">
        © 2026 HEYALLS. TÜM HAKLARI SAKLIDIR.
      </footer>
    </div>
  );
}