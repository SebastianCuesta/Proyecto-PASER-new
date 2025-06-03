import User from "../models/User.js";

// ✅ Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // omitimos el password por seguridad
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// ✅ Eliminar usuario por ID
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};

// ✅ Editar usuario por ID
export const updateUser = async (req, res) => {
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
    rol,
  } = req.body;

  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Asignar solo si se envía un nuevo valor
    user.nombres = nombres ?? user.nombres;
    user.apellidos = apellidos ?? user.apellidos;
    user.tipoIdentificacion = tipoIdentificacion ?? user.tipoIdentificacion;
    user.identificacion = identificacion ?? user.identificacion;
    user.numTelefono = numTelefono ?? user.numTelefono;
    user.correo = correo ?? user.correo;
    user.programaFormacion = programaFormacion ?? user.programaFormacion;
    user.numeroFicha = numeroFicha ?? user.numeroFicha;
    user.jornada = jornada ?? user.jornada;
    user.rol = rol ?? user.rol;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    // Enviar respuesta sin la contraseña
    const { password: _, ...userWithoutPassword } = updatedUser.toObject();

    res.json({
      message: "Usuario actualizado correctamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};
