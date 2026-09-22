import { useState } from "react"

function Lancamentos({ contas, categorias, lancamentos, setLancamentos }) {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [data, setData] = useState('')
  const [contaId, setContaId] = useState('')
  const [categoriaId, setCategoriaId] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const categoriaEscolhida = categorias.find(c => c.id === Number(categoriaId))
    const valorComSinal = categoriaEscolhida.tipo === 'despesa'
      ? -Math.abs(Number(valor))
      : Math.abs(Number(valor))

    fetch('http://127.0.0.1:8000/api/lancamentos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descricao: descricao,
        valor: valorComSinal,
        data: data,
        conta: Number(contaId),
        categoria: Number(categoriaId)
      })
    })
      .then(response => response.json())
      .then(novoLancamento => {
        setLancamentos([...lancamentos, novoLancamento])
        setDescricao('')
        setValor('')
        setData('')
      })
  }

  return (
    <div>
      <h2>Lançamentos</h2>
      <ul>
        {lancamentos.map(lancamento => (
          <li key={lancamento.id}>
            {lancamento.data} - {lancamento.descricao} - R$ {lancamento.valor}
            ({lancamento.categoria_nome} / {lancamento.conta_nome})
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <select value={contaId} onChange={(e) => setContaId(e.target.value)}>
          <option value="">Selecione a conta</option>
          {contas.map(conta => (
            <option key={conta.id} value={conta.id}>{conta.nome}</option>
          ))}
        </select>

        <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
          <option value="">Selecione a categoria</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
          ))}
        </select>

        <button type="submit">Adicionar</button>
      </form>
    </div>
  )
}

export default Lancamentos