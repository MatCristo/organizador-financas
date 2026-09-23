import { useState } from 'react'

function Categorias({ categorias, setCategorias, lancamentos, setLancamentos }) {
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('despesa')

  const [editandoId, setEditandoId] = useState(null)
  const [nomeEdicao, setNomeEdicao] = useState('')
  const [tipoEdicao, setTipoEdicao] = useState('')

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

  function iniciarEdicao(categoria) {
    setEditandoId(categoria.id)
    setNomeEdicao(categoria.nome)
    setTipoEdicao(categoria.tipo)
  }

  function cancelarEdicao() {
    setEditandoId(null)
  }

  function salvarEdicao(id) {
    fetch(`http://127.0.0.1:8000/api/categorias/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: nomeEdicao, tipo: tipoEdicao })
    })
      .then(response => response.json())
      .then(categoriaAtualizada => {
        setCategorias(categorias.map(categoria =>
          categoria.id === id ? categoriaAtualizada : categoria
        ))
        setEditandoId(null)
      })
  }

  return (
    <div>
      <h2>Categorias</h2>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id}>
            {editandoId === categoria.id ? (
              <>
                <input
                  type="text"
                  value={nomeEdicao}
                  onChange={(e) => setNomeEdicao(e.target.value)}
                />
                <select value={tipoEdicao} onChange={(e) => setTipoEdicao(e.target.value)}>
                  <option value="despesa">Despesa</option>
                  <option value="receita">Receita</option>
                </select>
                <button onClick={() => salvarEdicao(categoria.id)}>Salvar</button>
                <button onClick={cancelarEdicao}>Cancelar</button>
              </>
            ) : (
              <>
                {categoria.nome} ({categoria.tipo})
                <button onClick={() => iniciarEdicao(categoria)}>Editar</button>
                <button onClick={() => handleDelete(categoria.id)}>Apagar</button>
              </>
            )}
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