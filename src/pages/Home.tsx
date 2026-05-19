import React, { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import Navbar from '@/components/Navbar' // Düzeltildi
import VideoBackground from '@/components/VideoBackground' // Düzeltildi
import { displayFont } from '@/utils/styles' // Düzeltildi: styles
import { updateSEO } from '@/utils/seo' // Düzeltildi: @/utils/seo

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

const services = [
  { id: 'hizmet-al', label: 'Güvenilir Hizmet Almak İstiyorum' },
  { id: 'cozum-ortagi', label: 'Onaylı Çözüm Ortağı Olmak İstiyorum' },
  { id: 'danismanlik', label: 'Proje Danışmanlığı' },
]

export default function Home() {
  useEffect(() => {
    updateSEO({
      title: 'Onaylı Çözüm Ortaklığı Ağı',
      description:
        'HeyAlls – Güvenilir hizmet sağlayıcıları, şeffaf komisyon modeli ve %100 güven temelli pazar yeri altyapısıyla tek çatı altında.',
    })
  }, [])

  const [selectedService, setSelectedService] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [isSending, setIsSending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [serviceError, setServiceError] = useState(false)

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedService) { setServiceError(true); return }
    setServiceError(false); setIsSending(true); setIsError(false)

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current!, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setIsSuccess(true)
        setIsSending(false)
        setTimeout(() => setIsSuccess(false), 5000)
        if (formRef.current) formRef.current.reset()
        setSelectedService(null)
      })
      .catch((err: unknown) => {
        if (import.meta.env.DEV) console.error('EmailJS Hatası:', err)
        setIsError(true)
        setIsSending(false)
      })
  }

  return (
    <div className="relative min-h-screen w-full bg-[#001a2c] text-white selection:bg-white/20">
      <VideoBackground overlayOpacity="light" />
      <Navbar activePage="home" />

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 md:pt-32 pb-32 md:pb-40">
        <div className="inline-block mb-6 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs md:text-sm text-white/80 animate-fade-rise">
          Güven Odaklı Çözüm Ortaklığı Ağı
        </div>
        <h1
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-white animate-fade-rise"
          style={displayFont}
        >
          Doğru hizmet,{' '}
          <em className="not-italic text-white/60">onaylı ağımızla</em>{' '}
          <em className="not-italic text-white/60">başlar.</em>
        </h1>
        <p className="text-white/60 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body animate-fade-rise-delay">
          Sektörün en seçkin hizmet sağlayıcılarını, şeffaf komisyon modeli ve %100 güven temelli
          pazar yeri altyapımızla tek bir çatı altında birleştiriyoruz.
        </p>
        <a
          href="#intake"
          className="bg-white/10 backdrop-blur-md rounded-full px-12 md:px-14 py-4 md:py-5 text-base text-white mt-10 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] inline-block text-center cursor-pointer border border-white/10 animate-fade-rise-delay-2"
        >
          Hemen Değerlendirin
        </a>
      </main>

      {/* İletişim / Intake Formu */}
      <section id="intake" className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 py-20 md:py-32">
        <div className="bg-white/5 backdrop-blur-lg rounded-[2rem] p-6 md:p-14 border border-white/10 shadow-2xl">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-xs font-medium uppercase tracking-widest text-white/50 block mb-3 md:mb-4">
              Platforma Dahil Olun
            </span>
            <h2
              className="text-3xl md:text-5xl font-normal tracking-tight text-white mb-4"
              style={displayFont}
            >
              Birlikte Güven İnşa Edelim.
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto">
              HeyAlls ekosisteminde hangi rolde yer almak istediğinizi seçin. Uzman ekibimiz
              sizinle iletişime geçsin.
            </p>
          </div>

          <form ref={formRef} onSubmit={sendEmail} onChange={() => setIsError(false)} className="space-y-8">
            <input
              type="hidden"
              name="selected_service"
              value={services.find((s) => s.id === selectedService)?.label ?? 'Belirtilmedi'}
            />

            {/* Hizmet Seçimi */}
            <div className="space-y-4">
              <label className="text-xs uppercase tracking-widest text-white/70">
                Nasıl bir çözüm arıyorsunuz?
              </label>
              <div className="flex flex-col md:flex-row flex-wrap gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => { setSelectedService(service.id); setServiceError(false) }}
                    className={`px-5 py-3 rounded-full text-sm transition-all duration-300 border text-left md:text-center ${
                      selectedService === service.id
                        ? 'bg-white text-black border-white shadow-lg scale-[1.01]'
                        : 'bg-transparent text-white/60 border-white/20 hover:border-white/50'
                    }`}
                  >
                    {service.label}
                  </button>
                ))}
              </div>
              {serviceError && (
                <p className="text-red-400 text-xs mt-1 animate-pulse">
                  Lütfen bir hizmet türü seçin.
                </p>
              )}
            </div>

            {/* İsim & E-posta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70">
                  İsim / Marka Adı
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors"
                  placeholder="Kişi veya kurum adınız"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/70">
                  İletişim (E-posta)
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors"
                  placeholder="Size nasıl ulaşabiliriz?"
                />
              </div>
            </div>

            {/* Mesaj */}
            <div className="space-y-2 pt-4">
              <label className="text-xs uppercase tracking-widest text-white/70">
                Beklentileriniz veya Sunduğunuz Çözümler
              </label>
              <textarea
                name="message"
                required
                rows={3}
                className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="Lütfen detayları bizimle paylaşın..."
              />
            </div>

            {/* Gönder */}
            <div className="pt-8 text-center flex flex-col items-center">
              <button
                type="submit"
                disabled={isSending}
                className={`bg-white/10 backdrop-blur-md w-full md:w-auto rounded-full px-10 md:px-12 py-4 text-sm md:text-base text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-medium border border-white/20 ${
                  isSending ? 'opacity-50 cursor-wait' : 'cursor-pointer'
                }`}
              >
                {isSending ? 'Gönderiliyor...' : 'Talebi Gönder'}
              </button>
              {isSuccess && (
                <p className="text-green-400 mt-4 text-sm animate-fade-rise">
                  Talebiniz başarıyla alındı. Dönüş yapılacaktır.
                </p>
              )}
              {isError && (
                <p className="text-red-400 mt-4 text-sm animate-fade-rise">
                  Bir hata oluştu. Lütfen tekrar deneyin.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>

      <footer className="relative z-10 w-full text-center py-8 text-xs tracking-widest text-white/40 border-t border-white/5 bg-[#001a2c]/80 backdrop-blur-md">
        © 2026 HEYALLS. TÜM HAKLARI SAKLIDIR.
      </footer>
    </div>
  )
}