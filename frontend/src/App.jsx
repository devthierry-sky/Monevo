import './App.css'

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
          <div className="card card-balance">
            <h3>Saldo total</h3>
            <p>R$ 0,00</p>
          </div>
          <div className="card card-income">
            <h3>Receitas</h3>
            <p>R$ 0,00</p>
          </div>
          <div className="card card-expense">
            <h3>Despesas</h3>
            <p>R$ 0,00</p>
          </div>
        </section>
        </main>
      </div>
  )
}

export default App
