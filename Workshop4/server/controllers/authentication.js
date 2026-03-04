const User = require('../models/user');
const bcrypt = require('bcrypt');

//Middleware para autenticar el token en las rutas protegidas
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({message: 'Token requerido' });
  }
  try {
    const user = await User.findOne({token});
    if (!user) {
      return res.status(401).json({message: 'Token inválido' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({message: 'Error autenticando token' });
  }
};

//Genero un token para el usuario que se loguea
const generateToken = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({message: 'Email y password requeridos' });
  }
  try {
    const user = await User.findOne({email});
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = await bcrypt.hash(email + password, 10);
    user.token = token;
    await user.save();
    return res.status(201).json({token});
  } catch (error) {
    return res.status(500).json({message: 'Error generando token'});
  }
};

module.exports = { authenticateToken, generateToken };