import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminUserTable from "../../components/AdminUserTable";
import AdminEditUserModal from "../../components/AdminEditUserModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      toast.error("Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará al usuario permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsuarios((prev) => prev.filter((u) => u._id !== id));
        toast.success("Usuario eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        toast.error("Error al eliminar usuario");
      }
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleModalSuccess = (user) => {
    if (selectedUser) {
      // Edición
      setUsuarios((prev) =>
        prev.map((u) => (u._id === user._id ? user : u))
      );
    } else {
      // Creación
      setUsuarios((prev) => [user, ...prev]);
    }
    setShowModal(false);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const filteredUsers = usuarios.filter(
    (u) =>
      u.nombres?.toLowerCase().includes(search.toLowerCase()) ||
      u.correo?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading)
    return (
      <div className="w-full flex justify-center items-center p-8">
        <p className="text-gray-500">Cargando usuarios...</p>
      </div>
    );

  return (
    <div className="w-full px-4">
      <div className="flex justify-end max-w-5xl mx-auto mt-4">
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Crear Usuario
        </button>
      </div>

      <AdminUserTable
        usuarios={paginatedUsers}
        onEdit={openEditModal}
        onDelete={eliminarUsuario}
        searchTerm={search}
        setSearchTerm={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {showModal && (
        <AdminEditUserModal
          selectedUser={selectedUser}
          onClose={() => setShowModal(false)}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
};

export default UserList;
