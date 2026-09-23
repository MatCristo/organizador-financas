import { useState } from "react"
import { apiPost, apiPut, apiDelete } from '../api'

function Lancamentos({ contas, categorias, lancamentos, setLancamentos }) {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [data, setData] = useState('')
  const [contaId, setContaId] = useState('')
  const [categoriaId, setCategoriaId] = useState('')

  const [editandoId, setEditandoId] = useState(null)
  const [descricaoEdicao, setDescricaoEdicao] = useState('')
  const [valorEdicao, setValorEdicao] = useState('')
  const [dataEdicao, setDataEdicao] = useState('')
  const [contaIdEdicao, setContaIdEdicao] = useState('')
  const [categoriaIdEdicao, setCategoriaIdEdicao] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const categoriaEscolhida = categorias.find(c => c.id === Number(categoriaId))
    const valorComSinal = categoriaEscolhida.tipo === 'despesa'
      ? -Math.abs(Number(valor))
      : Math.abs(Number(valor))

    apiPost('/lancamentos/', {
      descricao: descricao,
      valor: valorComSinal,
      data: data,
      conta: Number(contaId),
      categoria: Number(categoriaId)
    })
      .then(novoLancamento => {
        setLancamentos([...lancamentos, novoLancamento])
        setDescricao('')
        setValor('')
        setData('')
      })
  }

  function handleDelete(id) {
    apiDelete(`/lancamentos/${id}/`)
      .then(() => {
        setLancamentos(lancamentos.filter(lancamento => lancamento.id !== id))
      })
  }

  function iniciarEdicao(lancamento) {
    setEditandoId(lancamento.id)
    setDescricaoEdicao(lancamento.descricao)
    setValorEdicao(Math.abs(Number(lancamento.valor)))
    setDataEdicao(lancamento.data)
    setContaIdEdicao(lancamento.conta)
    setCategoriaIdEdicao(lancamento.categoria)
  }

  function cancelarEdicao() {
    setEditandoId(null)
  }

  function salvarEdicao(id) {
    const categoriaEscolhida = categorias.find(c => c.id === Number(categoriaIdEdicao))
    const valorComSinal = categoriaEscolhida.tipo === 'despesa'
      ? -Math.abs(Number(valorEdicao))
      : Math.abs(Number(valorEdicao))

    apiPut(`/lancamentos/${id}/`, {
      descricao: descricaoEdicao,
      valor: valorComSinal,
      data: dataEdicao,
      conta: Number(contaIdEdicao),
      categoria: Number(categoriaIdEdicao)
    })
      .then(lancamentoAtualizado => {
        setLancamentos(lancamentos.map(lancamento =>
          lancamento.id === id ? lancamentoAtualizado : lancamento
        ))
        setEditandoId(null)
      })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Lançamentos</h2>

      <ul className="space-y-2 mb-4">
        {lancamentos.map(lancamento => (
          <li
            key={lancamento.id}
            className="flex items-center justify-between border-b border-gray-100 pb-2"
          >
            {editandoId === lancamento.id ? (
              <div className="flex flex-1 gap-2 items-center flex-wrap">
                <input
                  type="text"
                  value={descricaoEdicao}
                  onChange={(e) => setDescricaoEdicao(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 flex-1 min-w-[120px]"
                />
                <input
                  type="number"
                  step="0.01"
                  value={valorEdicao}
                  onChange={(e) => setValorEdicao(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-24"
                />
                <input
                  type="date"
                  value={dataEdicao}
                  onChange={(e) => setDataEdicao(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <select
                  value={contaIdEdicao}
                  onChange={(e) => setContaIdEdicao(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  {contas.map(conta => (
                    <option key={conta.id} value={conta.id}>{conta.nome}</option>
                  ))}
                </select>
                <select
                  value={categoriaIdEdicao}
                  onChange={(e) => setCategoriaIdEdicao(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                  ))}
                </select>
                <button
                  onClick={() => salvarEdicao(lancamento.id)}
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
                  <span className="text-gray-400 text-sm">{lancamento.data}</span>
                  {' — '}
                  {lancamento.descricao}
                  {' — '}
                  <span className={Number(lancamento.valor) < 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                    R$ {lancamento.valor}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {' '}({lancamento.categoria_nome} / {lancamento.conta_nome})
                  </span>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => iniciarEdicao(lancamento)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(lancamento.id)}
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
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <select
          value={contaId}
          onChange={(e) => setContaId(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Selecione a conta</option>
          {contas.map(conta => (
            <option key={conta.id} value={conta.id}>{conta.nome}</option>
          ))}
        </select>
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Selecione a categoria</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
          ))}
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

export default Lancamentos