import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { Link } from 'react-router-dom'
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

  // 3D Tilt Efekti İçin State ve Mantık
  const [tiltStyles, setTiltStyles] = useState<{[key: string]: string}>({})

 const handleMouseMove = (e: React.MouseEvent<HTMLElement>, id: string) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Eğilme miktarını ayarla (Yüksek değer = Daha fazla eğim)
    const tiltAmount = 10 
    const rotateX = ((y - centerY) / centerY) * -tiltAmount
    const rotateY = ((x - centerX) / centerX) * tiltAmount

    setTiltStyles(prev => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }))
  }

  const handleMouseLeave = (id: string) => {
    setTiltStyles(prev => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    }))
  }

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
      </section>

      {/* ADVANCED AGENCY - 3D TILT BENTO GRID VİTRİNİ */}
      <section className="relative z-10 w-full pb-20 mt-12">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
            <div>
              <span className="text-blue-500 text-xs tracking-widest uppercase mb-2 block font-medium">Seçkin Operasyonlar</span>
              <h2 className="text-4xl md:text-5xl text-white font-normal" style={displayFont}>Çözüm Ortaklarımız</h2>
            </div>
            <Link to="/calismalarimiz" className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2 pb-2 md:pb-0">
              Tüm Ekosistemi İncele <span className="text-blue-500">→</span>
            </Link>
          </div>

          {/* Bento Grid Yapısı - 3D Perspective Eklendi */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[600px] perspective-1000">
            
            {/* Büyük Kart - Bimeeting */}
            <Link 
              to="/calismalarimiz" 
              id="bimeeting"
              onMouseMove={(e) => handleMouseMove(e, 'bimeeting')}
              onMouseLeave={() => handleMouseLeave('bimeeting')}
              style={{ transform: tiltStyles['bimeeting'] || 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}
              className="group relative col-span-1 md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 ease-out block transform-style-3d shadow-xl hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#001a2c] via-transparent to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-z-10 group-hover:translate-z-20 transition-transform duration-500">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] text-white/70 uppercase tracking-widest border border-white/10 mb-4 inline-block transform translate-z-5">Platform Mimarisi</span>
                <h3 className="text-4xl text-white mb-2 transform translate-z-10" style={displayFont}>Bimeeting</h3>
                <p className="text-white/50 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-z-5">Modern dil öğrenim vizyonu ve topluluk yönetimi altyapısı.</p>
              </div>
            </Link>

            {/* Orta Kart - Orimo Auto */}
            <Link 
              to="/calismalarimiz" 
              id="orimo"
              onMouseMove={(e) => handleMouseMove(e, 'orimo')}
              onMouseLeave={() => handleMouseLeave('orimo')}
              style={{ transform: tiltStyles['orimo'] || 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}
              className="group relative col-span-1 md:col-span-2 md:row-span-1 rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 ease-out block min-h-[250px] transform-style-3d shadow-xl hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#001a2c] via-transparent to-transparent z-10 opacity-80" />
              <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full transform translate-z-10 transition-transform duration-500">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] text-white/70 uppercase tracking-widest border border-white/10 mb-3 inline-block transform translate-z-5">Global E-Ticaret</span>
                <h3 className="text-3xl text-white mb-1 transform translate-z-10" style={displayFont}>Orimo Auto</h3>
                <p className="text-white/50 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-z-5">Avrupa pazarı için katalog ve veri entegrasyonu.</p>
              </div>
            </Link>

            {/* Küçük Kart 1 - Carreas */}
            <Link 
              to="/calismalarimiz" 
              id="carreas"
              onMouseMove={(e) => handleMouseMove(e, 'carreas')}
              onMouseLeave={() => handleMouseLeave('carreas')}
              style={{ transform: tiltStyles['carreas'] || 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}
              className="group relative col-span-1 md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 ease-out block min-h-[250px] transform-style-3d shadow-xl hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#001a2c] via-transparent to-transparent z-10 opacity-80" />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full transform translate-z-10 transition-transform duration-500">
                <span className="text-[10px] text-white/50 uppercase tracking-widest mb-2 block transform translate-z-5">Dönüşüm & SEO</span>
                <h3 className="text-2xl text-white transform translate-z-10" style={displayFont}>Carreas</h3>
              </div>
            </Link>

            {/* Küçük Kart 2 - Çoklu Disiplin (Tilt yok, sabit) */}
            <div className="group relative col-span-1 md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-700 flex flex-col justify-center items-center text-center p-6 min-h-[250px] cursor-default shadow-xl">
              <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-500" />
              <div className="relative z-20">
                <h3 className="text-xl text-white mb-3" style={displayFont}>Gür Sigorta & Patron Tour</h3>
                <p className="text-white/40 text-xs leading-relaxed">Kurumsal kimlik inşasından, agresif Meta reklam operasyonlarına kadar tam kapsamlı yönetim.</p>
              </div>
            </div>

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