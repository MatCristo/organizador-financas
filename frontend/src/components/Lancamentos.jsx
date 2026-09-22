import { useState, useEffect } from "react"

function Lancamentos() {
  const [lancamentos, setLancamentos] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/lancamentos/')
      .then(response => response.json())
      .then(data => setLancamentos(data))
  }, [])

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
    </div>
  )
}

export default Lancamentos