import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from "react";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { signIn, errors: signInErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate();


  const onSubmit = handleSubmit(data => {
    signIn(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated]);


  return (
    <section className='portada'>
      <article className='logoAndTitulo'>
        <div className='logoImg'>
          <img src="CarpinchoPlatudo.jpg" alt="" />
        </div>

        <h1 className='tituloPortada'>Carpincho Eficiente</h1>
      </article>

      <article className='articleInputs'>
        {
          signInErrors.map((error, i) => (
            <div key={i} className="errorMessage">
              {error}
            </div>
          ))
        }

        <h3 className='inputsH2'>Inicio de sesion</h3>

        <form className='divInputs' onSubmit={onSubmit}>
          <section className='containerInput'>
            <h4 className='inputH4'>Correo electrónico</h4>
            <input
              type="email"
              name='email'
              {...register('email', { required: true })}
              className='input'
              placeholder='carpincho_eficiente@gmail.com'
            />
            {
              errors.email && (
                <p className="errorMessage">Email is requiere</p>
              )
            }
          </section>

          <section className='containerInput'>
            <h4 className='inputH4'>Contraseña:</h4>
            <input
              type="password"
              name='password'
              {...register('password', { required: true })}
              className='input'
              placeholder='*********'
            />
            {
              errors.password && (
                <p className="errorMessage">Password is requiere</p>
              )
            }

            <article className='containerIinkForgetPassword'>
              <a href="#" className='linkForgetPassword'>Olvidaste tu contraseña?</a>
            </article>
          </section>

          <button type="submit" className='botonIngresar'>Acceder</button>

          <section className='containerLinkRegister'>
            <p>No tienes cuenta?</p>
            <Link to='/register' className='linkRegister'>Registrarse</Link>
          </section>
        </form>

      </article>
    </section>
  )
}