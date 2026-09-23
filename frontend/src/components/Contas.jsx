import { useState } from "react"
import { apiPost, apiPut, apiDelete } from '../api'

function Contas({ contas, setContas, lancamentos, setLancamentos }) {
  const [nome, setNome] = useState('')
  const [saldoInicial, setSaldoInicial] = useState('')

  const [editandoId, setEditandoId] = useState(null)
  const [nomeEdicao, setNomeEdicao] = useState('')
  const [saldoEdicao, setSaldoEdicao] = useState('')

  function calcularSaldoAtual(conta) {
    const lancamentosDaConta = lancamentos.filter(l => l.conta === conta.id)
    const totalLancamentos = lancamentosDaConta.reduce((soma, l) => soma + Number(l.valor), 0)
    return Number(conta.saldo_inicial) + totalLancamentos
  }

  function handleSubmit(event) {
    event.preventDefault()

    apiPost('/contas/', { nome: nome, saldo_inicial: Number(saldoInicial) })
      .then(novaConta => {
        setContas([...contas, novaConta])
        setNome('')
        setSaldoInicial('')
      })
  }

  function handleDelete(id) {
    apiDelete(`/contas/${id}/`)
      .then(() => {
        setContas(contas.filter(conta => conta.id !== id))
        setLancamentos(lancamentos.filter(lancamento => lancamento.conta !== id))
      })
  }

  function iniciarEdicao(conta) {
    setEditandoId(conta.id)
    setNomeEdicao(conta.nome)
    setSaldoEdicao(conta.saldo_inicial)
  }

  function cancelarEdicao() {
    setEditandoId(null)
  }

  function salvarEdicao(id) {
    apiPut(`/contas/${id}/`, { nome: nomeEdicao, saldo_inicial: Number(saldoEdicao) })
      .then(contaAtualizada => {
        setContas(contas.map(conta =>
          conta.id === id ? contaAtualizada : conta
        ))
        setEditandoId(null)
      })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Contas</h2>

      <ul className="space-y-2 mb-4">
        {contas.map(conta => {
          const saldo = calcularSaldoAtual(conta)
          return (
            <li
              key={conta.id}
              className="flex items-center justify-between border-b border-gray-100 pb-2"
            >
              {editandoId === conta.id ? (
                <div className="flex flex-1 gap-2 items-center flex-wrap">
                  <input
                    type="text"
                    value={nomeEdicao}
                    onChange={(e) => setNomeEdicao(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 flex-1"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={saldoEdicao}
                    onChange={(e) => setSaldoEdicao(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-28"
                  />
                  <button
                    onClick={() => salvarEdicao(conta.id)}
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
                    {conta.nome} —{' '}
                    <span className={saldo >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                      R$ {saldo.toFixed(2)}
                    </span>
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => iniciarEdicao(conta)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(conta.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Apagar
                    </button>
                  </div>
                </>
              )}
            </li>
          )
        })}
      </ul>

      <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Nome da conta"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Saldo inicial"
          value={saldoInicial}
          onChange={(e) => setSaldoInicial(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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

export default Contas