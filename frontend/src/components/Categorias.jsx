import { useState, useEffect} from 'react'


function Categorias() {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categorias/')
      .then(response => response.json())
      .then(data => setCategorias(data))
  }, [])

  return (
    <div>
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

export default Categorias