// Importar el componente createContext de react.
import { createContext, useState, useContext, useEffect } from "react";

// Importar el auth.js
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  updateProfileRequest,
  getProfileRequest
} from "../api/auth.js";

// Importar el js-cookie
import Cookies from "js-cookie";

// Ejecutar el componente y almacenarlo en una const
export const AuthContext = createContext();

// Exportar hook del uso del contexto
export const useAuth = () => {
  // useContext lee nuestro contexto y nos arroja un nuevo contexto.
  const context = useContext(AuthContext);

  // Si no existe un contexto arrojar un mensaje de error.
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Si existe un contexto, devolverlo. 
  return context;
}

// Crear el provider que es basicamente un componente que engloba a otros.
export const AuthProvider = ({ children }) => {
  // Crear un estado
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Guardar el error en un estado para mostrarlo en pantalla
  const [errors, setErrors] = useState([]);

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      // Si es un array devolverlo solamente
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      // Sino devolverlo como un array
      setErrors([error.response.data.message]);
    }
  }

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true); // Indicar si el usuario esta autentificado o no
      setUser(res.data); // Guardar los datos del usuario
    } catch (error) {
      // Si es un array devolverlo solamente
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      // Sino devolverlo como un array
      setErrors([error.response.data.message]);
    }
  }

  // Función para cerrar sesión 
  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
  }

  // Editar profile
  const updateProfile = async (id, balance) => {
    try {
      await updateProfileRequest(id, balance);
    } catch (error) {
      // Si es un array devolverlo solamente
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      // Sino devolverlo como un array
      setErrors([error.response.data.message]);
    }
  };

  // Get profile
  const getProfile = async () => {
    try {
      const res = await getProfileRequest();
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };







  // Funcion para eliminar los mensajes de error despues de un tiempo.
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Funcion para validar el token cada vez que se inicia la página o se actualiza.
  useEffect(() => {
    // Se hace esta función por que no se puede poner directamente el async/await dentro del useEffect
    async function checkLogin() {
      // Si es que hay token almacenarlo en una const
      const cookies = Cookies.get();

      // Si no hay token, cambiar los estados y retornar
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      // Si hay token, hacer toda la validación
      try {
        // Si hay un token verificarlo y almacenar la respuesta en un res
        // Se hace esta verificación por que el token se puede establecer manualmente en el navegador.
        const res = await verifyTokenRequest(cookies.token);

        // Si no hay respuesta, cambiar los estados y retornar.
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Si hay una respuesta, realizar lo siguiente.
        setIsAuthenticated(true);
        setUser(res.data)
        setLoading(false);

      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }

    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{
      signUp,
      signIn,
      logout,
      user,
      isAuthenticated,
      errors,
      loading,
      updateProfile,
      getProfile,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}