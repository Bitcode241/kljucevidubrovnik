const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Učitaj environment
dotenv.config({ 
  path: path.resolve(__dirname, '.env') 
});

const sequelize = require('./config/database');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Automatsko inicijaliziranje baze
const initializeDatabase = async () => {
  try {
    // Test konekcije
    await sequelize.testConnection();

    // Sinkronizacija modela
    await sequelize.sync({ 
      // force: true - ovo briše postojeće tablice
      alter: true  // sigurnija opcija, dodaje nove kolone
    });

    console.log('✅ Baza podataka uspješno inicijalizirana');
  } catch (error) {
    console.error('❌ Greška prilikom inicijalizacije baze:', error);
    process.exit(1);
  }
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server radi', 
    timestamp: new Date().toISOString() 
  });
});

// Pokretanje servera
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, async () => {
  console.log(`🚀 Server pokrenut na http://${HOST}:${PORT}`);
  await initializeDatabase();
});