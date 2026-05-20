import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import Navbar from '@/components/Navbar'
import VideoBackground from '@/components/VideoBackground'
import Footer from '@/components/Footer'
import { displayFont } from '@/utils/styles'
import { useSEO } from '@/hooks/useSEO'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

const services = [
  { id: 'hizmet-al', label: 'Projem İçin Hizmet Almak İstiyorum' },
  { id: 'cozum-ortagi', label: 'Onaylı Çözüm Ortağı Ağına Katıl' },
  { id: 'danismanlik', label: 'Proje Danışmanlığı' },
]

export default function Home() {
  useSEO(
    'HeyAlls | Uçtan Uca Dijital Çözüm Merkezi',
    'Web mimarisinden küresel e-ticarete kadar tüm dijital süreçlerinizi tek merkezden yürüten entegre çözüm merkezi.'
  )

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
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="inline-block mb-6 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs md:text-sm text-white/80 animate-fade-rise">
          Uçtan Uca Dijital Çözüm Merkezi
        </div>
        <h1
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-white animate-fade-rise"
          style={displayFont}
        >
          Dijitalde büyüme,{' '}
          <em className="not-italic text-white/60">entegre sistemimizle</em>{' '}
          <em className="not-italic text-white/60">başlar.</em>
        </h1>
        <p className="text-white/60 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body animate-fade-rise-delay">
          Web mimarisinden küresel e-ticarete kadar tüm dijital süreçlerinizi, deneyimli ekibimiz
          ve %100 güven temelli in-house altyapımızla tek bir çatı altında birleştiriyoruz.
        </p>
        <a
          href="#intake"
          className="bg-white/10 backdrop-blur-md rounded-full px-12 md:px-14 py-4 md:py-5 text-base text-white mt-10 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] inline-block text-center cursor-pointer border border-white/10 animate-fade-rise-delay-2"
        >
          Projeyi Başlat
        </a>
      </main>

      {/* Güven Sinyalleri & Metrikler */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-12">
        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="text-center md:text-left flex-1">
            <h4 className="text-4xl text-white mb-2" style={displayFont}>3+</h4>
            <p className="text-white/50 text-xs tracking-widest uppercase">Ülkede Küresel Operasyon</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <div className="text-center md:text-left flex-1">
            <h4 className="text-4xl text-white mb-2" style={displayFont}>%100</h4>
            <p className="text-white/50 text-xs tracking-widest uppercase">Proje Teslim ve Başarı Oranı</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <div className="text-center md:text-left flex-1">
            <h4 className="text-4xl text-white mb-2" style={displayFont}>1</h4>
            <p className="text-white/50 text-xs tracking-widest uppercase">Merkez, Uçtan Uca Yönetim</p>
          </div>
        </div>

        {/* Markalar */}
        <div className="mt-12 text-center">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-8">Altyapısını Kurduğumuz Markalar</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 hover:opacity-100 transition-opacity duration-500">
            <span className="text-2xl text-white font-medium tracking-wider" style={displayFont}>Bimeeting</span>
            <span className="text-2xl text-white font-medium tracking-wider" style={displayFont}>Orimo Auto</span>
            <span className="text-2xl text-white font-medium tracking-wider" style={displayFont}>Carreas</span>
          </div>
        </div>
      </section>

      {/* İletişim Formu */}
      <section id="intake" className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20">

        {/* Çalışma Taahhüdü */}
        <div className="mb-16 bg-white/5 backdrop-blur-lg rounded-[2rem] p-8 md:p-12 border border-white/10 text-center shadow-2xl">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Çalışma Taahhüdümüz</p>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed" style={displayFont}>
            Her proje, lansman öncesi tam kalite denetiminden geçer.
            Teslimat gerçekleşene kadar süreç sizinle şeffaf biçimde paylaşılır.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-[2rem] p-6 md:p-14 border border-white/10 shadow-2xl">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-xs font-medium uppercase tracking-widest text-white/50 block mb-3 md:mb-4">
              Sisteme Dahil Olun
            </span>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-white mb-4" style={displayFont}>
              Birlikte Büyüyelim.
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto">
              HeyAlls ekosisteminde hangi rolde yer almak istediğinizi seçin. Uzman ekibimiz sizinle iletişime geçsin.
            </p>
          </div>

          <form ref={formRef} onSubmit={sendEmail} onChange={() => setIsError(false)} className="space-y-8">
            <input
              type="hidden"
              name="selected_service"
              value={services.find((s) => s.id === selectedService)?.label ?? 'Belirtilmedi'}
            />

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
                <p className="text-red-400 text-xs mt-1 animate-pulse">Lütfen bir hizmet türü seçin.</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <label htmlFor="user_name" className="text-xs uppercase tracking-widest text-white/70 cursor-pointer">
                  İsim / Marka Adı
                </label>
                <input
                  id="user_name"
                  type="text"
                  name="user_name"
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors"
                  placeholder="Kişi veya kurum adınız"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="user_email" className="text-xs uppercase tracking-widest text-white/70 cursor-pointer">
                  İletişim (E-posta)
                </label>
                <input
                  id="user_email"
                  type="email"
                  name="user_email"
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors"
                  placeholder="Size nasıl ulaşabiliriz?"
                />
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <label htmlFor="message" className="text-xs uppercase tracking-widest text-white/70 cursor-pointer">
                Beklentileriniz veya Proje Detayları
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="Lütfen detayları bizimle paylaşın..."
              />
            </div>

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
                  Talebiniz başarıyla alındı. En kısa sürede dönüş yapılacaktır.
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

      <Footer />
    </div>
  )
}