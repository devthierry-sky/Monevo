import './App.css'
import StatCard from './components/StatCard'

const stats = [
  {
    id: "balance",
    title: "Saldo total",
    value: "R$ 0,00",
    type: "balance"
  },
  {
    id: "income",
    title: "Receitas",
    value: "R$ 0,00",
    type: "income"
  },
  {
    id: "expense",
    title: "Despesas",
    value: "R$ 0,00",
    type: "expense"
  },
  {
  id: "invest",
  title: "Investimentos",
  value: "R$ 0,00",
  type: "invest"
  }
]
const transactions = [
  {
    id: "1",
    description: "Salário",
    amount: 3000,
    type: "income"
  },
  {
    id: "2",
    description: "Freelance",
    amount: 500,
    type: "income"
  },
  {
    id: "3",
    description: "Aluguel",
    amount: 1200,
    type: "expense"
  },
  {
    id: "4",
    description: "Internet",
    amount: 100,
    type: "expense"
  }
]

const incomes = transactions.filter ((transaction) => {
  return transaction.type === "income"
})

const totalIncome = incomes.reduce((total, transaction) => {
  return total + transaction.amount
}, 0)
const totalExpense = expenses.reduce((total, transaction) => {
  return total + transaction.amount
}, 0)

function App() {

  return (
      <div className="container">
        <header className="header">
          <h1>Monevo</h1>
        </header>
        <main className="main-content">
          <h2 className="welcome-title">Bem-vindo ao Monevo</h2>
          <p className="welcome-description">Aqui ficara todas as suas despesas do mês.</p>
        <section className="cards-container">
          {stats.map((stat)=>(
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              type={stat.type}
            />
          ))}
        </section>
        </main>
      </div>
  )
}
export default App
