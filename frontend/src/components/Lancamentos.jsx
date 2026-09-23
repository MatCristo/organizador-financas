import { useState } from "react"

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

  function handleDelete(id) {
    fetch(`http://127.0.0.1:8000/api/lancamentos/${id}/`, {
      method: 'DELETE'
    })
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

    fetch(`http://127.0.0.1:8000/api/lancamentos/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descricao: descricaoEdicao,
        valor: valorComSinal,
        data: dataEdicao,
        conta: Number(contaIdEdicao),
        categoria: Number(categoriaIdEdicao)
      })
    })
      .then(response => response.json())
      .then(lancamentoAtualizado => {
        setLancamentos(lancamentos.map(lancamento =>
          lancamento.id === id ? lancamentoAtualizado : lancamento
        ))
        setEditandoId(null)
      })
  }

  return (
    <div>
      <h2>Lançamentos</h2>
      <ul>
        {lancamentos.map(lancamento => (
          <li key={lancamento.id}>
            {editandoId === lancamento.id ? (
              <>
                <input
                  type="text"
                  value={descricaoEdicao}
                  onChange={(e) => setDescricaoEdicao(e.target.value)}
                />
                <input
                  type="number"
                  step="0.01"
                  value={valorEdicao}
                  onChange={(e) => setValorEdicao(e.target.value)}
                />
                <input
                  type="date"
                  value={dataEdicao}
                  onChange={(e) => setDataEdicao(e.target.value)}
                />
                <select value={contaIdEdicao} onChange={(e) => setContaIdEdicao(e.target.value)}>
                  {contas.map(conta => (
                    <option key={conta.id} value={conta.id}>{conta.nome}</option>
                  ))}
                </select>
                <select value={categoriaIdEdicao} onChange={(e) => setCategoriaIdEdicao(e.target.value)}>
                  {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                  ))}
                </select>
                <button onClick={() => salvarEdicao(lancamento.id)}>Salvar</button>
                <button onClick={cancelarEdicao}>Cancelar</button>
              </>
            ) : (
              <>
                {lancamento.data} - {lancamento.descricao} - R$ {lancamento.valor}
                ({lancamento.categoria_nome} / {lancamento.conta_nome})
                <button onClick={() => iniciarEdicao(lancamento)}>Editar</button>
                <button onClick={() => handleDelete(lancamento.id)}>Apagar</button>
              </>
            )}
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