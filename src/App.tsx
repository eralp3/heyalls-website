import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, lazy, Suspense, Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

// FIX: React.lazy for route-based code splitting — reduces initial bundle size
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const Process = lazy(() => import('./pages/Process'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Bimeeting = lazy(() => import('./pages/Bimeeting'))

// FIX: Error boundary prevents a single page crash from blanking the entire app
interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Page error caught by boundary:', error, info)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative min-h-screen w-full bg-[#001a2c] text-white flex flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="text-4xl text-white/80">Bir şeyler ters gitti.</h1>
          <p className="text-white/50 text-sm max-w-sm">
            Sayfa yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 rounded-full border border-white/20 bg-white/10 text-white text-sm hover:bg-white/20 transition-all"
          >
            Sayfayı Yenile
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// Minimal loading fallback — matches site background
function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-[#001a2c] flex items-center justify-center">
      <div className="w-8 h-[1px] bg-white/20 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-white animate-[loading-bar_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  )
}

function App() {
  useEffect(() => {
    const loader = document.getElementById('initial-loader')
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = '0'
        loader.style.visibility = 'hidden'
        setTimeout(() => {
          loader.remove()
        }, 800)
      }, 500)
    }
  }, [])

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hizmetlerimiz" element={<Services />} />
            <Route path="/surecimiz" element={<Process />} />
            <Route path="/calismalarimiz" element={<Portfolio />} />
            <Route path="/calismalarimiz/bimeeting" element={<Bimeeting />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  )
}

export default App