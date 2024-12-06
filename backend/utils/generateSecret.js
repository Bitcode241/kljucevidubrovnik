const crypto = require('crypto');

function generateJWTSecret() {
  // Generiraj 64 slučajnih bajta i pretvori ih u hex string
  return crypto.randomBytes(64).toString('hex');
}

// Ako se poziva direktno
if (require.main === module) {
  console.log('Generirani JWT Secret:', generateJWTSecret());
}

module.exports = generateJWTSecret;