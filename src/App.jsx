import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

const ProductListingPage = lazy(() => import('./pages/ProductListingPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))

const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
)

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  )
}

export default App