import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Admin from './pages/Admin.jsx'
import Student from './pages/Student.jsx'
import { isContractOwner } from './utils/contract.js'

export default function App() {
  const [walletAddress, setWalletAddress] = useState(null)
  const [isOwner, setIsOwner] = useState(false)

  // Vérifie si l'adresse connectée est l'owner
  useEffect(() => {
    async function checkOwnerStatus() {
      if (walletAddress) {
        const ownerStatus = await isContractOwner(walletAddress)
        setIsOwner(true)
      } else {
        setIsOwner(false)
      }
    }
    checkOwnerStatus()
  }, [walletAddress])

  // Écoute les événements MetaMask
  useEffect(() => {
    if (window.ethereum) {
      // 1. Récupère le compte déjà connecté si l'utilisateur a choisi de se connecter
      if (localStorage.getItem('wallet_connected') === 'true') {
        window.ethereum.request({ method: 'eth_accounts' })
          .then(accounts => {
            if (accounts.length > 0) {
              setWalletAddress(accounts[0])
            }
          })
          .catch(err => console.error("Erreur eth_accounts:", err))
      }

      // 2. Écouteur changement de compte
      const handleAccounts = (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          localStorage.setItem('wallet_connected', 'true')
        } else {
          setWalletAddress(null)
          setIsOwner(false)
          localStorage.removeItem('wallet_connected')
        }
      }

      // 3. Écouteur changement de réseau
      const handleChain = () => {
        window.location.reload()
      }

      window.ethereum.on('accountsChanged', handleAccounts)
      window.ethereum.on('chainChanged', handleChain)

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccounts)
          window.ethereum.removeListener('chainChanged', handleChain)
        }
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
        isOwner={isOwner}
        setIsOwner={setIsOwner}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin walletAddress={walletAddress} isOwner={isOwner} />} />
        <Route path="/mon-diplome" element={<Student walletAddress={walletAddress} />} />
      </Routes>
    </BrowserRouter>
  )
}

