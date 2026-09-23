import { useState } from 'react'
import { apiPost, apiPut, apiDelete } from '../api'

function Categorias({ categorias, setCategorias, lancamentos, setLancamentos }) {
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('despesa')

  const [editandoId, setEditandoId] = useState(null)
  const [nomeEdicao, setNomeEdicao] = useState('')
  const [tipoEdicao, setTipoEdicao] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    apiPost('/categorias/', { nome: nome, tipo: tipo })
      .then(novaCategoria => {
        setCategorias([...categorias, novaCategoria])
        setNome('')
      })
  }

  function handleDelete(id) {
    apiDelete(`/categorias/${id}/`)
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
    apiPut(`/categorias/${id}/`, { nome: nomeEdicao, tipo: tipoEdicao })
      .then(categoriaAtualizada => {
        setCategorias(categorias.map(categoria =>
          categoria.id === id ? categoriaAtualizada : categoria
        ))
        setEditandoId(null)
      })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Categorias</h2>

      <ul className="space-y-2 mb-4">
        {categorias.map(categoria => (
          <li
            key={categoria.id}
            className="flex items-center justify-between border-b border-gray-100 pb-2"
          >
            {editandoId === categoria.id ? (
              <div className="flex flex-1 gap-2 items-center flex-wrap">
                <input
                  type="text"
                  value={nomeEdicao}
                  onChange={(e) => setNomeEdicao(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 flex-1"
                />
                <select
                  value={tipoEdicao}
                  onChange={(e) => setTipoEdicao(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="despesa">Despesa</option>
                  <option value="receita">Receita</option>
                </select>
                <button
                  onClick={() => salvarEdicao(categoria.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                >
                  Salvar
                </button>
                <button
                  onClick={cancelarEdicao}
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 text-sm"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <>
                <span className="text-gray-700">
                  {categoria.nome}{' '}
                  <span
                    className={
                      categoria.tipo === 'despesa'
                        ? 'text-red-500 text-sm'
                        : 'text-green-500 text-sm'
                    }
                  >
                    ({categoria.tipo})
                  </span>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => iniciarEdicao(categoria)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(categoria.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Apagar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Nome da categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar
        </button>
      </form>
    </div>
  )
}

export default Categorias