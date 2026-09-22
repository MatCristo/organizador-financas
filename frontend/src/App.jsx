import { useState, useEffect } from 'react'
import Categorias from './components/Categorias'
import Contas from './components/Contas'
import Lancamentos from './components/Lancamentos'

function App() {
  const [contas, setContas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [lancamentos, setLancamentos] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/contas/')
      .then(response => response.json())
      .then(data => setContas(data))

    fetch('http://127.0.0.1:8000/api/categorias/')
      .then(response => response.json())
      .then(data => setCategorias(data))

    fetch('http://127.0.0.1:8000/api/lancamentos/')
      .then(response => response.json())
      .then(data => setLancamentos(data))
  }, [])

  return (
    <div>
      <h1>Organizador de Finanças</h1>
      <Categorias categorias={categorias} setCategorias={setCategorias} />
      <Contas contas={contas} setContas={setContas} lancamentos={lancamentos} />
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