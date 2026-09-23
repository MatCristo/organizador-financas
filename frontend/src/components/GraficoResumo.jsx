import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function GraficoResumo({ lancamentos }) {
  const totalReceitas = lancamentos
    .filter(l => Number(l.valor) > 0)
    .reduce((soma, l) => soma + Number(l.valor), 0)

  const totalDespesas = lancamentos
    .filter(l => Number(l.valor) < 0)
    .reduce((soma, l) => soma + Math.abs(Number(l.valor)), 0)

  const dados = [
    { name: 'Receitas', value: totalReceitas },
    { name: 'Despesas', value: totalDespesas }
  ]

  const cores = ['#4caf50', '#f44336']

  return (
    <div>
      <h2>Receitas vs Despesas</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dados}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {dados.map((entrada, index) => (
              <Cell key={entrada.name} fill={cores[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficoResumo