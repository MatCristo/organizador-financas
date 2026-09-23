import { useState } from 'react'

function Categorias({ categorias, setCategorias, lancamentos, setLancamentos }) {
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('despesa')

  function handleSubmit(event) {
    event.preventDefault()

    fetch('http://127.0.0.1:8000/api/categorias/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: nome, tipo: tipo })
    })
      .then(response => response.json())
      .then(novaCategoria => {
        setCategorias([...categorias, novaCategoria])
        setNome('')
      })
  }

  function handleDelete(id) {
    fetch(`http://127.0.0.1:8000/api/categorias/${id}/`, {
      method: 'DELETE'
    })
      .then(() => {
        setCategorias(categorias.filter(categoria => categoria.id !== id))
        setLancamentos(lancamentos.filter(lancamento => lancamento.categoria !== id))
      })
  }

  return (
    <div>
      <h2>Categorias</h2>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id}>
            {categoria.nome} ({categoria.tipo})
            <button onClick={() => handleDelete(categoria.id)}>Apagar</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome da categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  )
}

export default Categorias