import './App.css'
import StatCard from './components/StatCard'

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
})

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
  },
  {
    id: "5",
    description: "Tesouro Direto",
    amount: 500,
    type: "investment"
  }
]

const incomes = transactions.filter ((transaction) => {
  return transaction.type === "income"
})
const expenses = transactions.filter ((transaction) => {
  return transaction.type === "expense"
})
const investments = transactions.filter ((transaction) => {
  return transaction.type === "investment"
})

const totalIncome = incomes.reduce((total, transaction) => {
  return total + transaction.amount
}, 0)
const totalExpense = expenses.reduce((total, transaction) => {
  return total + transaction.amount
}, 0)
const totalInvestment = investments.reduce((total, transaction) => {
  return total + transaction.amount
}, 0)

const balance = totalIncome - totalExpense


const stats = [
  {
    id: "balance",
    title: "Saldo total",
    value: currencyFormatter.format(balance),
    type: "balance"
  },
  {
    id: "income",
    title: "Receitas",
    value: currencyFormatter.format(totalIncome),
    type: "income"
  },
  {
    id: "expense",
    title: "Despesas",
    value: currencyFormatter.format(totalExpense),
    type: "expense"
  },
  {
    id: "investment",
    title: "Investimentos",
    value: currencyFormatter.format(totalInvestment),
    type: "investment"
  }
]

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
        <section className="transaction-section">
          <h2>Movimentações recentes</h2>

          <div className="transaction-list">
            {transactions.map((transaction) => (
              <div className="transaction-item" key= {transaction.id}>
                <h3>{transaction.description}</h3>
                <p className={`transaction-type-${transaction.type}`}>{transaction.type}</p>
                <p className={`transaction-value-${transaction.type}`}>
                  {
                    transaction.type === "income" 
                      ? "+"
                      : transaction.type === "expense"
                        ? "-"
                        : ""
                  }
                  {currencyFormatter.format(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        </section>
        </main>
      </div>
  )
}
export default App