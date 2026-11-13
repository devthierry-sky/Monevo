import { useEffect, useRef, useState } from 'react'
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
    type: "income",
    date: "2026-11-05"
  },
  {
    id: "2",
    description: "Freelance",
    amount: 500,
    type: "income",
    date: "2027-03-10"
  },
  {
    id: "3",
    description: "Aluguel",
    amount: 1200,
    type: "expense",
    date: "2026-11-10"
  },
  {
    id: "4",
    description: "Internet",
    amount: 100,
    type: "expense",
    date: "2027-03-12"
  },
  {
    id: "5",
    description: "Tesouro Direto",
    amount: 500,
    type: "investment",
    date: "2026-11-20"
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

const limiteMensal = 2000

function App() {

  const [mesSelecionado, setMesSelecionado] = useState('2026-11')
  const [seletorAberto, setSeletorAberto] = useState(false)
  const [anoVisivel, setAnoVisivel] = useState(
    Number(mesSelecionado.split ("-")[0])
  )
  const transactionsOfMonth = transactions.filter((transaction) => {
    return transaction.date.startsWith(mesSelecionado)
  })

  const monthlyIncomes = transactionsOfMonth.filter((transaction) => {
  return transaction.type === "income"
  })
  const monthlyExpenses = transactionsOfMonth.filter((transaction) => {
  return transaction.type === "expense"
  })
  const monthlyInvestments = transactionsOfMonth.filter((transaction) => {
  return transaction.type === "investment"
  })

  const monthlyTotalIncome = monthlyIncomes.reduce((total, transaction) => {
  return total + transaction.amount
  }, 0)
  const monthlyTotalExpense = monthlyExpenses.reduce((total, transaction) => {
    return total + transaction.amount
  }, 0)
  const monthlyTotalInvestment = monthlyInvestments.reduce((total, transaction) => {
    return total + transaction.amount
  }, 0)

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
      value: currencyFormatter.format(monthlyTotalIncome),
      type: "income"
    },
    {
      id: "expense",
      title: "Despesas",
      value: currencyFormatter.format(monthlyTotalExpense),
      type: "expense"
    },
    {
      id: "investment",
      title: "Investimentos",
      value: currencyFormatter.format(monthlyTotalInvestment),
      type: "investment"
    }
  ]

  const percentualOrcamento = (monthlyTotalExpense / limiteMensal) * 100

  const orcamentoExcedido = monthlyTotalExpense > limiteMensal

  const statusOrcamento = percentualOrcamento >= 100
    ? "danger"
    : percentualOrcamento >= 80
      ? "warning"
      : "normal"

  const meses = [
    "Janeiro", "Fevereiro", "Março",
    "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro",
    "Outubro", "Novembro", "Dezembro"
  ]
  const seletorRef = useRef(null)
  
  useEffect(() => {
    if (!seletorAberto) return

    function handleClickOutside(event) {
      if (
        seletorRef.current &&
        !seletorRef.current.contains(event.target)
      ) {
        setSeletorAberto(false)
      }
    }

   document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [seletorAberto])

  return (
    <div className="app-layout">

      <aside className="sidebar">
        <h2>Monevo</h2>

        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Movimentações</li>
            <li>Orçamentos</li>
            <li>Metas</li>
            <li>Investimentos</li>
            <li>Categorias</li>
            <li>Configurações</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">

        <header className="header">
          <h1>Dashboard</h1>

          <div className="header-actions">
            <button>Extrato</button>
            <button>+ Nova movimentação</button>
          </div>
        </header>
        <section className="dashboard-filters">
          <div>
            <h2>Visão geral</h2>
            <p>Acompanhe suas finanças por período</p>
          </div>
          <div className="month-selector" ref={seletorRef}>
            <button
              className="month-selector-button"
              onClick={() => {
                if (!seletorAberto) {
                  setAnoVisivel(Number(mesSelecionado.split("-")[0]))
                }

                setSeletorAberto(!seletorAberto)
              }}
              >
              <span>{meses[Number(mesSelecionado.split("-")[1]) - 1]} de {mesSelecionado.split("-")[0]}</span>
              <span className="month-chevron"></span>
            </button>

            {seletorAberto && (
              <div className="month-dropdown">
                <div className="month-dropdown-header">
                  <button
                    onClick={() => setAnoVisivel(anoVisivel - 1)}
                  >
                    ‹
                  </button>

                  <h3 key={anoVisivel} className="year-animation">{anoVisivel}</h3>

                  <button
                    onClick={() => setAnoVisivel(anoVisivel + 1)}
                  >
                    ›
                  </button>
                </div>
                <div className="months-grid">
                  {meses.map((mes, index) => (
                    <button key={mes} className= {
                      Number(mesSelecionado.split("-")[1]) === index + 1 &&
                      Number(mesSelecionado.split("-")[0]) === anoVisivel
                        ? "selected"
                        : ""
                      }
                      onClick={() => {
                        const ano = anoVisivel
                        const numerosMes = String(index + 1).padStart(2, "0")

                        setMesSelecionado(`${ano}-${numerosMes}`)
                        setSeletorAberto(false)
                      }}
                    >
                      {mes.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="cards-container">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              type={stat.type}
            />
          ))}
        </section>
        <section className="budget-section">

          <div className="section-header">
            <h2>Orçamento mensal</h2>
            <span>{Math.round(percentualOrcamento)}% utilizado</span>
          </div>
          <div className="budget-card">

            <div className="budget-info">
              <div>
                <p>Gastos do mês</p>
                <h3>{currencyFormatter.format(monthlyTotalExpense)}</h3>
              </div>
              <div>
                <p>Limite mensal</p>
                <h3>{currencyFormatter.format(limiteMensal)}</h3>
              </div>
            </div>

            <div className="progress-track">
              <div className={`progress-fill ${statusOrcamento}`} style={{
                width: `${Math.min(percentualOrcamento, 100)}%`  
              }}
              ></div>
            </div>
           <p className={`budget-remaining ${statusOrcamento}`}>
              {orcamentoExcedido
                ? `${currencyFormatter.format(monthlyTotalExpense - limiteMensal)} acima do limite mensal`
                : `${currencyFormatter.format(limiteMensal - monthlyTotalExpense)} disponíveis`}
           </p>
          </div>
        </section>
      </main>
    </div>
  )
}
export default App