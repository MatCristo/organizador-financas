import { useState } from "react"

function Contas({ contas, setContas, lancamentos }) {
  const [nome, setNome] = useState('')
  const [saldoInicial, setSaldoInicial] = useState('')

  function calcularSaldoAtual(conta) {
    const lancamentosDaConta = lancamentos.filter(l => l.conta === conta.id)
    const totalLancamentos = lancamentosDaConta.reduce((soma, l) => soma + Number(l.valor), 0)
    return Number(conta.saldo_inicial) + totalLancamentos
  }

  function handleSubmit(event) {
    event.preventDefault()

    fetch('http://127.0.0.1:8000/api/contas/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: nome, saldo_inicial: Number(saldoInicial) })
    })
      .then(response => response.json())
      .then(novaConta => {
        setContas([...contas, novaConta])
        setNome('')
        setSaldoInicial('')
      })
  }

  return (
    <div>
      <h2>Contas</h2>
      <ul>
        {contas.map(conta => (
          <li key={conta.id}>
            {conta.nome} — Saldo atual: R$ {calcularSaldoAtual(conta).toFixed(2)}
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