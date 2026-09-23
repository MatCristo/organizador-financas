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
    <div>
      <h2>Contas</h2>
      <ul>
        {contas.map(conta => (
          <li key={conta.id}>
            {editandoId === conta.id ? (
              <>
                <input
                  type="text"
                  value={nomeEdicao}
                  onChange={(e) => setNomeEdicao(e.target.value)}
                />
                <input
                  type="number"
                  step="0.01"
                  value={saldoEdicao}
                  onChange={(e) => setSaldoEdicao(e.target.value)}
                />
                <button onClick={() => salvarEdicao(conta.id)}>Salvar</button>
                <button onClick={cancelarEdicao}>Cancelar</button>
              </>
            ) : (
              <>
                {conta.nome} — Saldo atual: R$ {calcularSaldoAtual(conta).toFixed(2)}
                <button onClick={() => iniciarEdicao(conta)}>Editar</button>
                <button onClick={() => handleDelete(conta.id)}>Apagar</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome da conta"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Saldo inicial"
          value={saldoInicial}
          onChange={(e) => setSaldoInicial(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  )
}

export default Contas