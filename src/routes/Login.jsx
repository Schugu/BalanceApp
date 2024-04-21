import { useState } from "react"
import { useAuth } from "../Auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from '../Auth/constants.js'

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [errorResponse, setErrorResponse] = useState('');
  const goTo = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/login`, {
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
        console.log('Login successful!');
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
        <h3 className='inputsH2'>Inicio de sesion</h3>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

        <form className='divInputs' onSubmit={handleSubmit}>
          <section className='containerInput'>
            <h4 className='inputH4'>Nombre de usuario</h4>
            <input
              type="text"
              id='user'
              className='input'
              placeholder='carpincho_eficiente@gmail.com'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </section>

          <section className='containerInput'>
            <h4 className='inputH4'>Contraseña:</h4>
            <input
              type="password"
              id='password'
              className='input'
              placeholder='*********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <article className='containerIinkForgetPassword'>
              <a href="#" className='linkForgetPassword'>Olvidaste tu contraseña?</a>
            </article>
          </section>

          <button type="submit" className='botonIngresar'>Acceder</button>

          <section className='containerLinkRegister'>
            <a onClick={()=> goTo('/signup')} className='linkRegister'>Registrarse</a>
          </section>
        </form>

      </article>
    </section>
  )
}