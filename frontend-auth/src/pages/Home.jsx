import { useEffect, useState } from "react";
import senaLogo from "../assets/logowhite.png";
import { Link } from "react-router-dom";
import { FaUserTie, FaFemale } from "react-icons/fa";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start">
      {/* Header con marca SENA y botón Iniciar Sesión ajustado */}
      <header className="w-full bg-green-700 text-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-6">
          <div className="flex items-center space-x-4">
            <img src={senaLogo} alt="SENA Logo" className="h-10" />
            <h1 className="text-xl sm:text-2xl font-bold">
              SIGS - Inventario Granja SENA
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <nav>
              <Link
                to={user ? "/dashboard" : "/login"}
                className="inline-flex items-center px-4 py-2 border-2 border-white rounded-full text-white text-sm font-medium hover:bg-white hover:text-green-700 transition"
              >
                {/* Icono de usuario */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M12 7a4 4 0 110 8 4 4 0 010-8z"
                  />
                </svg>
                {user ? "Ir al Dashboard" : "Iniciar Sesión"}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Sección Hero */}
      <main className="flex-1 w-full max-w-4xl text-center py-12 sm:py-16 px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          Gestión Inteligente de Inventario para la Granja SENA
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          SIGS optimiza el control de herramientas, maquinaria y equipos del SENA, facilitando préstamos digitales y seguimiento en tiempo real.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to={user ? "/dashboard" : "/login"}
            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-center"
          >
            {user ? "Ir al Dashboard" : "Comenzar Ahora"}
          </Link>
          <a
            href="#benefits"
            className="w-full sm:w-auto px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition text-center"
          >
            Ver Beneficios
          </a>
        </div>
      </main>

      {/* Sección Beneficios */}
      <section id="benefits" className="w-full bg-white py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
            Beneficios de SIGS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-lg sm:text-xl font-semibold text-green-700 mb-2">
                Eficiencia Operativa
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Reduce tiempos de gestión y evita duplicidades con procesos digitalizados.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-lg sm:text-xl font-semibold text-green-700 mb-2">
                Disponibilidad en Tiempo Real
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Consulta el estado y ubicación de recursos al instante desde cualquier dispositivo.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-lg sm:text-xl font-semibold text-green-700 mb-2">
                Control Centralizado
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Un dashboard unificado para supervisar préstamos, devoluciones y métricas clave.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-lg sm:text-xl font-semibold text-green-700 mb-2">
                Notificaciones Automáticas
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Recibe alertas de vencimiento y disponibilidad directamente en tu correo.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-lg sm:text-xl font-semibold text-green-700 mb-2">
                Informes Detallados
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Genera reportes de uso histórico para optimizar compras y mantenimiento.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <h4 className="text-lg sm:text-xl font-semibold text-green-700 mb-2">
                Roles y Permisos
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Define accesos específicos para administradores, instructores y aprendices.
              </p>
            </div>
          </div>
        </div>
      </section>

       {/* Sección de Aprendices */}
      <section id="team" className="w-full bg-gray-100 py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
            Desarrollado por nuestros Aprendices
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Aprendiz 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <FaUserTie className="text-green-600" size={64} />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">DAVID ALEXIS SANCHEZ SANCHEZ</h4>
              <p className="text-gray-600">Aprendiz ADSO</p>
              <a
                href="mailto:juan.perez@sena.edu.co"
                className="text-green-600 hover:underline"
              >
                davidsanchez@soysena.edu.co
              </a>
            </div>
            {/* Aprendiz 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <FaFemale className="text-green-600" size={64} />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">VANESA TRUJILLO COBO</h4>
              <p className="text-gray-600">Aprendiz ADSO</p>
              <a
                href="mailto:maria.gomez@sena.edu.co"
                className="text-green-600 hover:underline"
              >
                vanesatrujillo@soysena.edu.co
              </a>
            </div>
            {/* Aprendiz 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <FaUserTie className="text-green-600" size={64} />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">OSCAR JULIAN MOSQUERA VANEGAS</h4>
              <p className="text-gray-600">Aprendiz ADSO</p>
              <a
                href="mailto:andres.rodriguez@sena.edu.co"
                className="text-green-600 hover:underline"
              >
                oscarmosquera@soysena.edu.co
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center text-gray-500 py-6 px-4">
        <p className="text-sm">
          © {new Date().getFullYear()} SIGS - SENA. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Home;
