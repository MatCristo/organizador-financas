import { useState, useEffect } from 'react'
import Login from './components/Login'
import Categorias from './components/Categorias'
import Contas from './components/Contas'
import Lancamentos from './components/Lancamentos'
import { apiGet } from './api'

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
    <div>
      <h1>Organizador de Finanças</h1>
      <button onClick={handleLogout}>Sair</button>
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
  )
}

export default App