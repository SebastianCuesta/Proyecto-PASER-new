import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { sendEmail } from '../utils/sendEmail.js';

export const register = async (req, res) => {
  const {
    nombres,
    apellidos,
    tipoIdentificacion,
    identificacion,
    numTelefono,
    correo,
    programaFormacion,
    numeroFicha,
    jornada,
    password,
    rol
  } = req.body;

  // Validación de campos requeridos
  if (
    !nombres || !apellidos || !tipoIdentificacion || !identificacion ||
    !numTelefono || !correo || !programaFormacion || !numeroFicha || !password
  ) {
    return res.status(400).json({ message: 'Todos los campos obligatorios deben estar completos' });
  }

  try {
    const existingUser = await User.findOne({ correo });

    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      nombres,
      apellidos,
      tipoIdentificacion,
      identificacion,
      numTelefono,
      correo,
      programaFormacion,
      numeroFicha,
      jornada,
      password: hashedPassword,
      rol: rol || 'user',
    });

    await newUser.save();

    // Enviar correo de bienvenida
    const html = `
      <h2>¡Bienvenido a S.I.G.S, ${nombres}!</h2>
      <p>Tu cuenta ha sido creada exitosamente con el correo <strong>${correo}</strong>.</p>
      <p>Gracias por confiar en nosotros.</p>
    `;
    await sendEmail(correo, '🎉 Bienvenido S.I.G.S', html);

    const userWithoutPassword = {
      _id: newUser._id,
      nombre: newUser.nombres,
      correo: newUser.correo,
    };

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: userWithoutPassword });
  } catch (error) {
    console.error("❌ Error en el registro:", error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
