import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export default function Home() {
  const displayFont = { fontFamily: "'Instrument Serif', serif" };
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Hizmetler, Onaylı Pazar Yeri vizyonuna göre güncellendi
  const services = [
    { id: 'hizmet-al', label: 'Güvenilir Hizmet Almak İstiyorum' },
    { id: 'cozum-ortagi', label: 'Onaylı Çözüm Ortağı Olmak İstiyorum' },
    { id: 'danismanlik', label: 'Proje Danışmanlığı' },
  ];

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm('service_kstncxu', 'template_i6mihkk', formRef.current!, 'MPcyZxj2-I-wZO3Uu')
      .then((result) => {
          console.log(result.text);
          setIsSuccess(true);
          setIsSending(false);
          setTimeout(() => setIsSuccess(false), 3000);
          if(formRef.current) formRef.current.reset();
          setSelectedService(null);
      }, (error) => {
          console.log(error.text);
          alert("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
          setIsSending(false);
      });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#001a2c] text-white selection:bg-white/20">
      
      {/* Arka Plan Video & Mobil Performans İçin Fallback Arka Plan */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-gradient-to-b from-[#001a2c] to-[#000a14]">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#001a2c]/50 backdrop-blur-[2px]" />
      </div>

      {/* --- STANDART & MOBİL MENÜ --- */}
      <nav className="relative z-50 w-full px-6 md:px-8 py-6 max-w-7xl mx-auto flex flex-row justify-between items-center">
        <Link to="/" className="text-3xl tracking-tight text-white select-none relative z-50" style={displayFont}>
          HeyAlls<sup className="text-xs font-sans ml-0.5">®</sup>
        </Link>

        {/* Masaüstü Menü */}
        <div className="hidden md:flex flex-row items-center gap-8">
          <Link to="/" className="text-sm text-white transition-colors">Ana Sayfa</Link>
          <Link to="/hizmetlerimiz" className="text-sm text-muted-foreground hover:text-white transition-colors">Onaylı Ortaklar</Link>
          <Link to="/surecimiz" className="text-sm text-muted-foreground hover:text-white transition-colors">Nasıl Çalışır?</Link>
          <a href="#intake" className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
            Ağa Katıl
          </a>
        </div>

        {/* Mobil Hamburger Butonu */}
        <button 
          className="md:hidden relative z-50 text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobil Açılır Menü */}
        <div className={`md:hidden fixed inset-0 bg-[#001a2c]/95 backdrop-blur-xl z-40 transition-all duration-300 flex flex-col items-center justify-center space-y-8 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white">Ana Sayfa</Link>
          <Link to="/hizmetlerimiz" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white/70 hover:text-white">Onaylı Ortaklar</Link>
          <Link to="/surecimiz" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-white/70 hover:text-white">Nasıl Çalışır?</Link>
          <a href="#intake" onClick={() => setIsMobileMenuOpen(false)} className="liquid-glass rounded-full px-8 py-3 text-lg text-white mt-4">
            Ağa Katıl
          </a>
        </div>
      </nav>

      {/* --- KAHRAMAN (HERO) - VİZYON METİNLERİ --- */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 md:pt-32 pb-32 md:pb-40 py-[90px]">
        <div className="inline-block mb-6 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs md:text-sm text-white/80 animate-fade-rise">
          Güven Odaklı Çözüm Ortaklığı Ağı
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-white animate-fade-rise" style={displayFont}>
          Doğru hizmet, <em className="not-italic text-white/60">onaylı ağımızla</em> <em className="not-italic text-white/60">başlar.</em>
        </h1>
        <p className="text-white/60 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body animate-fade-rise-delay">
          Sektörün en seçkin hizmet sağlayıcılarını, şeffaf komisyon modeli ve %100 güven temelli pazar yeri altyapımızla tek bir çatı altında birleştiriyoruz. İhtiyacınız olan her çözüm, denetlenmiş ağımızda mevcut.
        </p>
        <a href="#intake" className="liquid-glass rounded-full px-12 md:px-14 py-4 md:py-5 text-base text-white mt-10 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] inline-block text-center cursor-pointer animate-fade-rise-delay-2">
          Hemen Değerlendirin
        </a>
      </main>

      {/* --- ETKİLEŞİMLİ PROJE BAŞLATMA (İletişim Formu) --- */}
      <section id="intake" className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 py-20 md:py-32">
        <div className="liquid-glass rounded-[2rem] p-6 md:p-14 border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-xs font-medium uppercase tracking-widest text-white/50 block mb-3 md:mb-4">Platforma Dahil Olun</span>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-white mb-4" style={displayFont}>Birlikte Güven İnşa Edelim.</h2>
            <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto">HeyAlls ekosisteminde hangi rolde yer almak istediğinizi seçin. Uzman ekibimiz detaylar için sizinle iletişime geçsin.</p>
          </div>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-8">
            <input type="hidden" name="selected_service" value={selectedService || 'Belirtilmedi'} />

            <div className="space-y-4">
              <label className="text-xs uppercase tracking-widest text-white/70">Nasıl bir çözüm arıyorsunuz?</label>
              <div className="flex flex-col md:flex-row flex-wrap gap-3">
                {services.map((service) => (
                  <button key={service.id} type="button" onClick={() => setSelectedService(service.id)} className={`px-5 py-3 rounded-full text-sm transition-all duration-300 border text-left md:text-center ${selectedService === service.id ? 'bg-white text-black border-white' : 'bg-transparent text-white/60 border-white/20 hover:border-white/50'}`}>
                    {service.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70">İsim / Marka Adı</label>
                <input type="text" name="user_name" required className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors" placeholder="Kişi veya kurum adınız" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70">İletişim (E-posta)</label>
                <input type="email" name="user_email" required className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors" placeholder="Size nasıl ulaşabiliriz?" />
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <label className="text-xs uppercase tracking-widest text-white/70">Beklentileriniz veya Sunduğunuz Çözümler</label>
              <textarea name="message" required rows={3} className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors resize-none" placeholder="Lütfen detayları bizimle paylaşın..."></textarea>
            </div>

            <div className="pt-8 text-center flex flex-col items-center">
              <button type="submit" disabled={isSending} className={`liquid-glass w-full md:w-auto rounded-full px-10 md:px-12 py-4 text-sm md:text-base text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer font-medium tracking-wide border border-white/20 hover:border-white/50 ${isSending ? 'opacity-50 cursor-wait' : ''}`}>
                {isSending ? 'Gönderiliyor...' : 'Talebi Gönder'}
              </button>
              {isSuccess && <p className="text-green-400 mt-4 text-sm animate-fade-rise">Talebiniz başarıyla alındı. En kısa sürede ağ yöneticilerimiz dönüş yapacaktır.</p>}
            </div>
          </form>
        </div>
      </section>

      <footer className="relative z-10 w-full text-center py-8 text-xs tracking-widest text-white/40 border-t border-white/5 bg-[#001a2c]/80 backdrop-blur-md">
        © 2026 HEYALLS. TÜM HAKLARI SAKLIDIR.
      </footer>
    </div>
  );
}