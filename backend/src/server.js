import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// Inicialização do servidor
const app = express()
const PORT = process.env.PORT || 3001

// Middlewares
app.use(cors())
app.use(express.json())

// Primeira rota da API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Monevo API is running'
  })
})

// Inicialização
app.listen(PORT, () => {
  console.log(`Monevo API running at http://localhost:${PORT}`)
})