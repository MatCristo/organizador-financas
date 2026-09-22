import { useState, useEffect } from 'react'

function App() {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categorias/')
      .then(response => response.json())
      .then(data => setCategorias(data))
  }, [])

  return (
    <div>
      <h1>Organizador de Finanças</h1>
      <h2>Categorias</h2>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id}>
            {categoria.nome} ({categoria.tipo})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App