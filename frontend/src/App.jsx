import { useState, useEffect } from 'react'
import Login from './components/Login'
import Categorias from './components/Categorias'
import Contas from './components/Contas'
import Lancamentos from './components/Lancamentos'
import { apiGet } from './api'
import GraficoResumo from './components/GraficoResumo'
import GraficoCategorias from './components/GraficoCategorias'

function App() {
  const [autenticado, setAutenticado] = useState(!!localStorage.getItem('accessToken'))

  const [contas, setContas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [lancamentos, setLancamentos] = useState([])

  useEffect(() => {
    if (!autenticado) return

    apiGet('/contas/').then(data => setContas(data))
    apiGet('/categorias/').then(data => setCategorias(data))
    apiGet('/lancamentos/').then(data => setLancamentos(data))
  }, [autenticado])

  function handleLogout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setAutenticado(false)
  }

  if (!autenticado) {
    return <Login onLogin={() => setAutenticado(true)} />
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-600">Organizador de Finanças</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sair
          </button>
        </div>

        <GraficoResumo lancamentos={lancamentos} />
        <GraficoCategorias lancamentos={lancamentos} />

        <Categorias
          categorias={categorias}
          setCategorias={setCategorias}
          lancamentos={lancamentos}
          setLancamentos={setLancamentos}
        />
        <Contas
          contas={contas}
          setContas={setContas}
          lancamentos={lancamentos}
          setLancamentos={setLancamentos}
        />
        <Lancamentos
          contas={contas}
          categorias={categorias}
          lancamentos={lancamentos}
          setLancamentos={setLancamentos}
        />
        
      </div>
    </div>
  )
}

export default App