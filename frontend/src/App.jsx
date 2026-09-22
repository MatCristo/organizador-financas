import Categorias from './components/Categorias'
import Contas from './components/Contas'
import Lancamentos from './components/Lancamentos'

function App() {
  return (
    <div>
      <h1>Organizador de Finanças</h1>
      <Categorias />
      <Contas />
      <Lancamentos />
    </div>
  )
}

export default App