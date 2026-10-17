import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AssetsPage from './pages/AssetsPage.jsx'
import AssetFormPage from './pages/AssetFormPage.jsx'
import About from './pages/About.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="/assets/new" element={<AssetFormPage />} />
          <Route path="/assets/:id/edit" element={<AssetFormPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}
