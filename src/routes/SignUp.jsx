import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from '../Auth/constants.js'

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorResponse, setErrorResponse] = useState('');

  const auth = useAuth();
  const goTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (response.ok) {
        console.log('EL usuario se creó correctamente!');
        setErrorResponse('');
        goTo('/');
      } else {
        console.log('Error! Algo salio mal.')
        const json = await response.json();
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (auth.isAuthenticated) {
    return <Navigate to='/dashboard' />
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
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

        <form className='divInputs' onSubmit={handleSubmit}>
          <section className='containerInput'>
            <h4 className='inputH4'>Nombre de usuario</h4>
            <input
              type="text"
              id='userName'
              className='input'
              placeholder='Carpincho Eficiente'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <a onClick={()=>goTo('/')} className='linkRegister'>Iniciar sesión</a>
          </section>
        </form>

      </article>
    </section>
  );
}