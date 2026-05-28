import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Admin from './pages/Admin.jsx'
import Student from './pages/Student.jsx'

export default function App() {
  // const [walletAddress, setWalletAddress] = useState(null)
  // const [isOwner, setIsOwner] = useState(false)

  // Temporaire :
  const [walletAddress, setWalletAddress] = useState('0x71C7656EC7ab88b098defB75187401B5f6d8976F')
  const [isOwner, setIsOwner] = useState(true)

  return (
    <BrowserRouter>
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
        isOwner={isOwner}
        setIsOwner={setIsOwner}
      />
      <Routes>
        <Route path="/" element={<Home walletAddress={walletAddress} />} />
        <Route path="/admin" element={<Admin walletAddress={walletAddress} isOwner={isOwner} />} />
        <Route path="/mon-diplome" element={<Student walletAddress={walletAddress} />} />
      </Routes>
    </BrowserRouter>
  )
}
