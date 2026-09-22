import { useState, useEffect } from "react"


function Contas() {
    const [contas, setContas] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/contas/')
        .then(response => response.json())
        .then(data => setContas(data))
    }, [])


    return (
    <div>
      <h2>Contas</h2>
      <ul>
        {contas.map(conta => (
          <li key={conta.id}>
            {conta.nome} ({conta.saldo_inicial})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Contas