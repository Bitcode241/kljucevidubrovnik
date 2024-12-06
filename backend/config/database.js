const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

// Učitaj environment varijable
dotenv.config({ 
  path: path.resolve(__dirname, '../.env') 
});

// Funkcija za testiranje database konekcije
async function testDatabaseConnection(sequelize) {
  try {
    await sequelize.authenticate();
    console.log('✅ Uspješna konekcija na bazu podataka');
    return true;
  } catch (error) {
    console.error('❌ Greška prilikom spajanja na bazu:', error.message);
    return false;
  }
}

// Dinamička konfiguracija baze
const createSequelizeInstance = () => {
  const { 
    DB_HOST, 
    DB_PORT, 
    DB_USER, 
    DB_PASS, 
    DB_NAME 
  } = process.env;

  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: process.env.DEBUG === 'true' ? console.log : false,
    
    // Advanced opcije
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    
    // Automatsko kreiranje tablica
    define: {
      timestamps: true,
      underscored: true
    }
  });

  // Dodaj metodu za testiranje
  sequelize.testConnection = () => testDatabaseConnection(sequelize);

  return sequelize;
};

module.exports = createSequelizeInstance();