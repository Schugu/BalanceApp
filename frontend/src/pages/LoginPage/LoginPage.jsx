import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
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
    <section className='w-full min-h-screen flex flex-col place-items-center text-2xl bg-L-B-P dark:bg-D-B-P text-L-T-P dark:text-D-T-P'>
      <article className='w-full flex flex-col items-center gap-4 p-2.5'>
        <div className='w-52 h-52	rounded-full overflow-hidden border-4 border-solid border-L-D-P'>
          <img className="w-full h-auto object-cover object-center" src="CarpinchoPlatudo.jpg" alt="CarpinchoPlatudo" />
        </div>

        <Link to='/' className='pb-1.5 border-b-2 border-L-D-P w-4/5 text-center transition-colors duration-300 ease-in-out hover:text-L-D-P-dark dark:hover:text-L-D-P-light'>Carpincho Eficiente</Link>
      </article>

      <article className='w-full flex flex-col place-items-center gap-2.5'>
        {
          signInErrors.map((error, i) => (
            <div key={i} className="w-9/12 bg-red-100 text-red-600 text-center p-1 rounded">
              {error}
            </div>
          ))
        }

        <h3 className='px-2 text-center border-b-2 border-solid border-L-D-P'>Inicio de sesion</h3>

        <form className='w-full flex flex-col items-center gap-3.5' onSubmit={onSubmit}>
          <section className='w-full flex flex-col items-center'>
            <h4 className='w-9/12 text-xl'>Correo electrónico</h4>
            <input
              type="email"
              name='email'
              {...register('email', { required: true })}
              className='w-9/12 text-base p-2.5 outline-none border-b-2 border-solid border-L-D-P bg-transparent hover:bg-L-D-P-hover rounded'
              placeholder='carpincho_eficiente@gmail.com'
            />
            {
              errors.email && (
                <p className="w-9/12 bg-red-100 text-red-600 text-center p-1 rounded">Email is requiere</p>
              )
            }
          </section>

          <section className='w-full flex flex-col items-center'>
            <h4 className='w-9/12 text-xl'>Contraseña:</h4>
            <input
              type="password"
              name='password'
              {...register('password', { required: true })}
              className='w-9/12 text-base p-2.5 outline-none border-b-2 border-solid border-L-D-P bg-transparent hover:bg-L-D-P-hover rounded'
              placeholder='*********'
            />
            {
              errors.password && (
                <p className="w-9/12 bg-red-100 text-red-600 text-center p-1 rounded rounded">Password is requiere</p>
              )
            }

            <article className='w-9/12 text-right pt-1'>
              <a href="#" className='no-underline text-base transition-colors duration-300 ease-in-out hover:text-L-D-P-dark dark:hover:text-L-D-P'>Olvidaste tu contraseña?</a>
            </article>
          </section>

          <button type="submit" className='w-9/12 bg-L-D-P pt-1.5 no-underline transition-colors duration-300 ease-in-out border-b-4 border-solid border-L-D-P-dark hover:bg-L-D-P-dark hover:border-L-D-P rounded'>Acceder</button>

          <section className='flex items-center gap-2.5 text-center'>
            <p className="text-xl">No tienes cuenta?</p>
            <Link to='/register' className='no-underline text-xl transition-colors duration-300 ease-in-out hover:text-L-D-P-dark dark:hover:text-L-D-P'>Registrarse</Link>
          </section>
        </form>

      </article>
    </section>
  )
}