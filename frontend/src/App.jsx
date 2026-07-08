import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import NotFound from './pages/not-found/NotFound.jsx'
import Recover from './pages/recover/Recover.jsx'
import Security from './pages/security/Security.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recover" element={<Recover />} />
      <Route path="/security" element={<Security />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
