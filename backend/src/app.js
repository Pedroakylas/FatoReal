require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// ── Middlewares de segurança ──
app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: true
}));

// ── Rate Limit ──
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: 'Muitas requisições. Tente em 15 minutos.' }
});
app.use('/api/check', limiter);

// ── Body Parser ──
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Health Check ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Verifica Notícia API rodando! (Sprint 1)' });
});

// ── Rotas ──
// Sprint 1: apenas a verificação de texto está disponível.
const checkRoutes = require('./routes/check');
app.use('/api/check', checkRoutes);

// ── Error Handler ──
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// ── Inicia servidor ──
// Sprint 1 ainda não usa banco de dados: os resultados não são persistidos.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT} (Sprint 1 - sem banco de dados)`);
});

module.exports = app;
