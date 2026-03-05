import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LandingPage from "./pages/landing/LandingPage.tsx";
import GalleryPage from "./pages/gallery/GalleryPage.tsx";
import AuthCallback from "./pages/auth/AuthCallback.tsx";
import NavBar from "./components/NavBar.tsx";
import FloatingWords from "./components/FloatingWords.tsx";

function App() {
  return (
    <>
      <FloatingWords />
      <div className="app-content">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
