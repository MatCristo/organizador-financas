import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

function GraficoCategorias({ lancamentos }) {
  const despesas = lancamentos.filter(l => Number(l.valor) < 0)

  const totaisPorCategoria = {}

  despesas.forEach(lancamento => {
    const nomeCategoria = lancamento.categoria_nome
    const valorAbsoluto = Math.abs(Number(lancamento.valor))

    if (totaisPorCategoria[nomeCategoria]) {
      totaisPorCategoria[nomeCategoria] += valorAbsoluto
    } else {
      totaisPorCategoria[nomeCategoria] = valorAbsoluto
    }
  })

  const dados = Object.keys(totaisPorCategoria).map(nome => ({
    categoria: nome,
    total: totaisPorCategoria[nome]
  }))

  return (
    <div>
      <h2>Gastos por Categoria</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoria" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#f44336" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficoCategorias