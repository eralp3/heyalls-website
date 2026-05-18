import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export default function Home() {
  const displayFont = { fontFamily: "'Instrument Serif', serif" };
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const services = [
    { id: 'ecom', label: 'E-Ticaret Danışmanlığı' },
    { id: 'marketing', label: 'Dijital Pazarlama' },
    { id: 'web', label: 'Web Geliştirme' },
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
      
      {/* Arka Plan Video */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#001a2c]/40" />
      </div>

      {/* --- STANDART MENÜ --- */}
      <nav className="relative z-10 w-full px-8 py-6 max-w-7xl mx-auto flex flex-row justify-between items-center">
        <Link to="/" className="text-3xl tracking-tight text-white select-none" style={displayFont}>
          HeyAlls Agency<sup className="text-xs font-sans ml-0.5">®</sup>
        </Link>

        <div className="hidden md:flex flex-row items-center gap-8">
          <Link to="/" className="text-sm text-white transition-colors">Ana Sayfa</Link>
          <Link to="/hizmetlerimiz" className="text-sm text-muted-foreground hover:text-white transition-colors">Hizmetlerimiz</Link>
          <Link to="/surecimiz" className="text-sm text-muted-foreground hover:text-white transition-colors">Sürecimiz</Link>
          <Link to="/calismalarimiz" className="text-sm text-muted-foreground hover:text-white transition-colors">Çalışmalarımız</Link>
        </div>

        {/* Ana sayfada olduğumuz için href="#intake" kullanıyoruz ki yumuşakça aşağı kaysın */}
        <a href="#intake" className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
          İletişime Geçin
        </a>
      </nav>

      {/* --- KAHRAMAN (HERO) --- */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px]">
        <h1 className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-white animate-fade-rise" style={displayFont}>
          Dijital dönüşümünüz <em className="not-italic text-muted-foreground">doğru stratejiyle</em> <em className="not-italic text-muted-foreground">başlar.</em>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body animate-fade-rise-delay">
          E-ticarete güçlü bir adım atmanızı sağlıyor, dijital pazarlama süreçlerinizi uçtan uca yönetiyor ve markanıza özel kusursuz web altyapıları inşa ediyoruz.
        </p>
        <Link to="/hizmetlerimiz" className="liquid-glass rounded-full px-14 py-5 text-base text-white mt-12 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] inline-block text-center cursor-pointer animate-fade-rise-delay-2">
          Neler Yapıyoruz?
        </Link>
      </main>

      {/* --- ETKİLEŞİMLİ PROJE BAŞLATMA (İletişim Formu) --- */}
      <section id="intake" className="relative z-10 max-w-4xl mx-auto px-8 py-32">
        <div className="liquid-glass rounded-[2rem] p-8 md:p-14">
          <div className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground block mb-4">Bir Sonraki Adım</span>
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-white mb-4" style={displayFont}>Projenizi Birlikte Büyütelim.</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">Hangi alanda yardıma ihtiyacınız olduğunu seçin. Uzman ekibimiz, markanız için en uygun stratejik planla size geri dönüş yapsın.</p>
          </div>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-8">
            <input type="hidden" name="selected_service" value={selectedService || 'Belirtilmedi'} />

            <div className="space-y-4">
              <label className="text-xs uppercase tracking-widest text-white/70">Öncelikli İhtiyacınız Nedir?</label>
              <div className="flex flex-wrap gap-3">
                {services.map((service) => (
                  <button key={service.id} type="button" onClick={() => setSelectedService(service.id)} className={`px-5 py-3 rounded-full text-sm transition-all duration-300 border ${selectedService === service.id ? 'bg-white text-black border-white' : 'bg-transparent text-muted-foreground border-white/20 hover:border-white/50'}`}>
                    {service.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70">İsim / Marka Adı</label>
                <input type="text" name="user_name" required className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors" placeholder="İsminiz veya şirketiniz" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70">İletişim (E-posta)</label>
                <input type="email" name="user_email" required className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors" placeholder="Size nasıl ulaşabiliriz?" />
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <label className="text-xs uppercase tracking-widest text-white/70">Mevcut Durumunuz ve Hedefiniz</label>
              <textarea name="message" required rows={3} className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors resize-none" placeholder="Örneğin: Avrupa pazarına e-ticaret için açılmak istiyorum..."></textarea>
            </div>

            <div className="pt-8 text-center flex flex-col items-center">
              <button type="submit" disabled={isSending} className={`liquid-glass w-full md:w-auto rounded-full px-12 py-4 text-base text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer font-medium tracking-wide ${isSending ? 'opacity-50 cursor-wait' : ''}`}>
                {isSending ? 'Gönderiliyor...' : 'Projeyi Gönder ve Değerlendir'}
              </button>
              {isSuccess && <p className="text-green-400 mt-4 text-sm animate-fade-rise">Mesajınız başarıyla iletildi. En kısa sürede dönüş yapacağız!</p>}
            </div>
          </form>
        </div>
      </section>

      <footer className="relative z-10 w-full text-center py-10 text-xs tracking-widest text-muted-foreground border-t border-white/5 bg-[#001a2c]/80 backdrop-blur-md">
        © 2026 HEYALLS AGENCY. TÜM HAKLARI SAKLIDIR.
      </footer>
    </div>
  );
}