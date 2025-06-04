// src/components/AdminEditUserModal.js
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminEditUserModal = ({ selectedUser, onClose, onChange, onSave,  }) => {

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

  //NUEVO

  if (!selectedUser) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md animate-fade-in transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Editar Usuario
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            value={selectedUser.nombres}
            onChange={(e) =>
              onChange({ ...selectedUser, nombres: e.target.value })
            }
            placeholder="Nombre"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
          />
          
          <input
            type="text"
            value={selectedUser.apellidos}
            onChange={(e) =>
              onChange({ ...selectedUser, apellidos: e.target.value })
            }
            placeholder="Apellidos"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
          />
          
          <select name="tipoIdentificacion" id="" value={formData.tipoIdentificacion}
            onChange={(e) =>
              onChange({ ...selectedUser, tipoIdentificacion: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none" 
            >
            <option value="CC">Cédula de ciudadanía</option>
            <option value="TI">Tarjeta de identidad</option>
            <option value="PPT">Permiso por Protección Temporal</option>
            <option value="CE">Cédula de extranjería</option>
          </select>

            <input
            type="number"
            value={selectedUser.identificacion}
            onChange={(e) =>
              onChange({ ...selectedUser, apellidos: e.target.value })
            }
            placeholder="Apellidos"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
          />

          <input
            type="email"
            value={selectedUser.correo}
            onChange={(e) =>
              onChange({ ...selectedUser, correo: e.target.value })
            }
            placeholder="Correo"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
          />
          <select
            value={selectedUser.rol}
            onChange={(e) =>
              onChange({ ...selectedUser, rol: e.target.value })
            }
            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-200 focus:border-green-600 outline-none"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
            <option value="pasante">Pasante</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditUserModal;
