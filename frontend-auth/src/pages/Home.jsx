import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductGallery from "../components/ProductGallery";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center px-4">
      <header className="w-full max-w-4xl flex justify-between items-center py-6">
        <h1 className="text-2xl font-bold text-blue-800">MiProyecto</h1>
        <nav className="space-x-2">
          {!user ? (
            <>
              <Link
                to="/login"
                className="inline-block px-5 py-2 bg-white text-blue-600 border border-blue-600 rounded-full font-medium hover:bg-blue-50 transition duration-200"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="inline-block px-5 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition duration-200"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="inline-block px-5 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition duration-200"
            >
              Ir al Dashboard
            </Link>
          )}
        </nav>
      </header>

      <main className="flex-1 w-full max-w-3xl text-center py-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Bienvenido a <span className="text-blue-600">MiProyecto</span>
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mb-8">
          Esta es una aplicación moderna construida con React, Vite y
          TailwindCSS. Úsala como base para cualquier proyecto web profesional.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!user ? (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-base font-semibold"
            >
              Empezar
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition text-base font-semibold"
            >
              Ir al Dashboard
            </Link>
          )}
          <a
            href="#features"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition text-base font-semibold"
          >
            Ver más
          </a>
        </div>
      </main>

      <section id="features" className="w-full max-w-6xl py-16 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Características principales
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-gray-700 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">Gestión de Productos</h4>
            <p>
              CRUD completo con subida de imágenes, vista previa, edición,
              búsqueda y paginación desde un panel administrativo.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">Scroll Infinito</h4>
            <p>
              Vista pública con scroll infinito que carga dinámicamente los
              productos destacados desde el backend.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">Modal de Detalle</h4>
            <p>
              Visualización detallada de cada producto al hacer clic, usando
              modales reutilizables.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">Autenticación JWT</h4>
            <p>
              Login, registro y protección de rutas mediante tokens. Roles de
              usuario y administrador diferenciados.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">Recuperación de contraseña</h4>
            <p>
              Funcionalidad de “¿Olvidaste tu contraseña?” con generación de
              token, correo de recuperación y formulario de reseteo.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">Correos automáticos</h4>
            <p>
              Envío de correos automáticos al registrarse y al solicitar
              recuperación de contraseña usando nodemailer.
            </p>
          </div>
        </div>
      </section>

      <ProductGallery />

      <footer className="w-full text-center text-gray-600 py-6">
        © {new Date().getFullYear()} MiProyecto. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Home;
