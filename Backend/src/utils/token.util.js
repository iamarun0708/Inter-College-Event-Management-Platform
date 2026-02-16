const jwt = require('jsonwebtoken');

const generateToken = (id) => {
<<<<<<< HEAD
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token expires in 7 days
    });
};

module.exports = generateToken;
=======
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
>>>>>>> origin/dev-varshini
