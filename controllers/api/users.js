const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = {
  create,
  login,
  checkToken
};

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    console.log('User created successfully:', user);
    const token = createJWT(user);
    console.log('Token generated:', token);
    res.json(token);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json(err);
  }
}

function createJWT(user) {
  const token = jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );

  console.log('JWT token;', token);
  return token;
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error('user not found');
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error('invalid pw');
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
      console.error('error logging in:' , err);
      res.status(400).json('Bad Credentials');
    }
  }

  function checkToken(req, res) {
    console.log('req.user', req.user)
    res.json(req.exp);
  }