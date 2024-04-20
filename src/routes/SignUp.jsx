import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";

export default function SignUp() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    console.log("Formulario enviado:", { userName, email, password });
  };

  const auth = useAuth();
  if (auth.isAuthenticated) {
    return <Navigate to='/dashboard'/>
  } 
  

  return (
    <section className='portada'>
      <article className='logoAndTitulo'>
        <div className='logoImg'>
          <img src="CarpinchoPlatudo.jpg" alt="" />
        </div>
        <h1 className='tituloPortada'>Carpincho Eficiente</h1>
      </article>

      <article className='articleInputs'>
        <h3 className='inputsH2'>Crear una cuenta</h3>

        <form className='divInputs' onSubmit={handleSubmit}>
          <section className='containerInput'>
            <h4 className='inputH4'>Nombre de usuario</h4>
            <input
              type="text"
              id='userName'
              className='input'
              placeholder='Carpincho Eficiente'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </section>

          <section className='containerInput'>
            <h4 className='inputH4'>Correo electrónico</h4>
            <input
              type="email"
              id='email'
              className='input'
              placeholder='carpincho_eficiente@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </section>

          <section className='containerInput'>
            <h4 className='inputH4'>Contraseña</h4>
            <input
              type="password"
              id='password'
              className='input'
              placeholder='*********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </section>

          <section className='containerInput'>
            <h4 className='inputH4'>Confirmar contraseña</h4>
            <input
              type="password"
              id='confirmPassword'
              className='input'
              placeholder='*********'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </section>

          <button type="submit" className='botonIngresar'>Registrarse</button>

          <section className='containerLinkRegister'>
            <span>¿Ya tienes una cuenta? </span>
            <a href="#" className='linkRegister'>Iniciar sesión</a>
          </section>
        </form>

      </article>
    </section>
  );
}