require('dotenv').config(); // Cargar variables de entorno

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const bcrypt = require('bcryptjs'); // Comentado o eliminado
// const jwt = require('jsonwebtoken'); // Comentado o eliminado

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- Middlewares ---
app.use(cors({})); // Permite peticiones desde tu frontend
app.use(express.json()); // Permite que el servidor entienda JSON en el cuerpo de las peticiones

// --- Configuración JWT (Comentado o Eliminado) ---
// const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

// --- Conexión a MongoDB ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Definición del Esquema y Modelo de Usuario ---
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  nickname: String,
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String }, // Modificado: NO 'required: true' aquí si lo manejas en la ruta,
                              // y NO tiene 'required: true' para que no falle si insertas sin password al inicio.
                              // Para la comparación directa, DEBE existir, pero sin hash.
  mobileNumber: String,
  age: Number,
  weight: {
    value: Number,
    unit: String,
    timestamp: Date
  },
  height: {
    value: Number,
    unit: String,
    timestamp: Date
  },
  goal: String,
  activityLevel: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// --- Middleware de Mongoose para hashear la contraseña (Comentado o Eliminado) ---
// userSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

const User = mongoose.model('User', userSchema);

// --- Middleware de Autenticación (Comentado o Eliminado) ---
// const protect = (req, res, next) => { /* ... */ };

// --- Rutas (Endpoints API) ---

//Confirmar la existencia de un email
app.get('/api/users/check-email', async (req, res) => {
    try {
        const { email } = req.query; // Get email from query parameters (e.g., /check-email?email=test@example.com)

        if (!email) {
            return res.status(400).json({ message: 'Email parameter is required.' });
        }

        // Normalize the email to lowercase before searching, consistent with your schema
        const normalizedEmail = email.toLowerCase();

        const userExists = await User.findOne({ email: normalizedEmail });

        if (userExists) {
            return res.status(200).json({ exists: true, message: 'This email is already registered.' });
        } else {
            return res.status(200).json({ exists: false, message: 'Email is available.' });
        }
    } catch (err) {
        console.error('Error checking email existence:', err);
        res.status(500).json({ message: 'Server error while checking email.' });
    }
});
// 1. Ruta para Registrar un Nuevo Usuario
app.post('/api/users', async (req, res) => {
  const { fullName, nickname, email, password, mobileNumber, age, weight, height, goal, activityLevel } = req.body;

  try {
    // Verificar si el usuario ya existe por email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // AHORA guardamos la contraseña en texto plano. ¡NO HACER ESTO EN PRODUCCIÓN!
    const newUser = new User({
      fullName,
      nickname,
      email,
      password, // Contraseña en texto plano
      mobileNumber,
      age,
      weight: weight ? { ...weight, timestamp: weight.timestamp ? new Date(weight.timestamp) : new Date() } : undefined,
      height: height ? { ...height, timestamp: height.timestamp ? new Date(height.timestamp) : new Date() } : undefined,
      goal,
      activityLevel
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: err.message || 'Error registering user' });
  }
});

// 2. Ruta para Iniciar Sesión de Usuario (Comparación Directa)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por email
    const user = await User.findOne({ email });

    // Si el usuario no existe O la contraseña no coincide (comparación directa)
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas (email o contraseña incorrectos).' });
    }

    // Si las credenciales son correctas
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      message: 'Inicio de sesión exitoso!' // Mensaje de éxito simple
    });
  } catch (err) {
    console.error('Error al intentar iniciar sesión:', err);
    res.status(500).json({ message: err.message || 'Error en el servidor al intentar iniciar sesión.' });
  }
});

// 3. Ejemplo de Ruta Protegida (Comentado o Eliminado)
// app.get('/api/profile', protect, async (req, res) => { /* ... */ });


// --- Iniciar el servidor ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});