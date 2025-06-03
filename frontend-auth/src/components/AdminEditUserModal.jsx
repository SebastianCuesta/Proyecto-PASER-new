import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminEditUserModal = ({ selectedUser, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    tipoIdentificacion: "CC",
    identificacion: "",
    numTelefono: "",
    correo: "",
    programaFormacion: "",
    numeroFicha: "",
    jornada: "Mañana",
    password: "",
    rol: "user",
  });

  useEffect(() => {
    if (selectedUser) {
      const { password, ...rest } = selectedUser;
      setFormData({ ...rest, password: "" });
    } else {
      setFormData({
        nombres: "",
        apellidos: "",
        tipoIdentificacion: "CC",
        identificacion: "",
        numTelefono: "",
        correo: "",
        programaFormacion: "",
        numeroFicha: "",
        jornada: "Mañana",
        password: "",
        rol: "user",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (selectedUser) {
        const res = await axios.put(
          `http://localhost:5000/api/users/${selectedUser._id}`,
          formData
        );
        onSuccess(res.data.user);
        toast.success("Usuario actualizado correctamente");
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/register",
          formData
        );
        onSuccess(res.data.user);
        toast.success("Usuario creado correctamente");
      }
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      toast.error("Ocurrió un error al guardar el usuario");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          {selectedUser ? "Editar Usuario" : "Crear Usuario"}
        </h2>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <input type="text" name="nombres" placeholder="nombres"
            value={formData.nombres} onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          />
          <input type="text" name="apellidos" placeholder="Apellidos"
            value={formData.apellidos} onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          />
          <select name="tipoIdentificacion" value={formData.tipoIdentificacion}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          >
            <option value="CC">Cédula de ciudadanía</option>
            <option value="TI">Tarjeta de identidad</option>
            <option value="PPT">Permiso por Protección Temporal</option>
            <option value="CE">Cédula de extranjería</option>
          </select>
          <input type="number" name="identificacion" placeholder="Identificación"
            value={formData.identificacion} onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          />
          <input type="number" name="numTelefono" placeholder="Teléfono"
            value={formData.numTelefono} onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          />
          <input type="email" name="correo" placeholder="Correo"
            value={formData.correo} onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          />
          <input type="text" name="programaFormacion" placeholder="Programa de formación"
            value={formData.programaFormacion} onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          />
          <input type="number" name="numeroFicha" placeholder="Número de ficha"
            value={formData.numeroFicha} onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          />
          <select name="jornada" value={formData.jornada}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          >
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
          </select>
          {!selectedUser && (
            <input type="password" name="password" placeholder="Contraseña"
              value={formData.password} onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
          )}
          <select name="rol" value={formData.rol} onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {selectedUser ? "Guardar Cambios" : "Crear Usuario"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditUserModal;
