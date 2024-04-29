import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
  });

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
          registerErrors.map((error, i) => (
            <div key={i} className="errorMessage">
              {error}
            </div>
          ))
        }

        <h3 className='inputsH2'>Crear una cuenta</h3>

        <form className='divInputs' onSubmit={onSubmit}>
          <section className='containerInput'>
            <h4 className='inputH4'>Nombre de usuario</h4>
            <input
              type="text"
              name="username"
              placeholder='Carpincho Eficiente'
              {...register('username', { required: true })}
              className='input'
            />
            {
              errors.username && (
                <p className="errorMessage">Username is requiere</p>
              )
            }
          </section>

          <section className='containerInput'>
            <h4 className='inputH4'>Correo electrónico</h4>
            <input
              type="email"
              name="email"
              placeholder='carpincho_eficiente@gmail.com'
              {...register('email', { required: true })}
              className='input'
            />
            {
              errors.email && (
                <p className="errorMessage">Email is requiere</p>
              )
            }
          </section>

          <section className='containerInput'>
            <h4 className='inputH4'>Contraseña</h4>
            <input
              type="password"
              name="password"
              placeholder='*********'
              {...register('password', { required: true })}
              className='input'
            />
            {
              errors.password && (
                <p className="errorMessage">Password is requiere</p>
              )
            }
          </section>

          {/* <section className='containerInput'>
            <h4 className='inputH4'>Confirmar contraseña</h4>
            <input
              type="password"
              id='confirmPassword'
              className='input'
              placeholder='*********'
            />
          </section> */}

          <button type="submit" className='botonIngresar'>Registrarse</button>

          <section className='containerLinkRegister'>
            <p>¿Ya tienes una cuenta?</p>
            <Link to='/login' className='linkRegister'>Inicia Sesión</Link>
          </section>
        </form>

      </article>
    </section>
  );
}

export default RegisterPage;