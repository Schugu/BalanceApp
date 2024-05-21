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
    <section className='w-full min-h-screen p-2 flex justify-center items-center text-2xl bg-L-B-P dark:bg-D-B-P text-L-T-P dark:text-D-T-P'>

      <article className="lg:w-4/6 w-full h-full flex flex-col items-center justify-center gap-2">
        <div className='w-5/6 flex flex-col items-center gap-4 border-b-2 border-solid border-L-D-P '>
          <section className='w-52 h-52	rounded-full overflow-hidden border-4 border-solid border-L-D-P'>
            <img tabIndex={1} className="w-full h-auto object-cover object-center" src="CarpinchoPlatudo.jpg" alt="CarpinchoPlatudo" />
          </section>

          <Link tabIndex={2} to='/' className='pb-1.5 text-center transition-colors duration-300 ease-in-out hover:text-L-D-P-dark dark:hover:text-L-D-P-light'>Carpincho Eficiente</Link>
        </div>

        <div className='w-full flex flex-col place-items-center gap-2.5'>
          {
            signInErrors.map((error, i) => (
              <div tabIndex={3} key={i} className="w-9/12 bg-red-100 text-red-600 text-center p-1 rounded">
                {error}
              </div>
            ))
          }

          <p tabIndex={4} className='px-2 text-center border-b-2 border-solid border-L-D-P'>Inicio de sesion</p>

          <form className='w-full flex flex-col items-center gap-3.5' onSubmit={onSubmit}>
            <section className='w-full flex flex-col items-center'>
              <h4 className='w-9/12 text-xl'>Correo electrónico</h4>
              <input
                tabIndex={5}
                aria-label="Ingrese su correo electrónico"
                type="email"
                name='email'
                {...register('email', { required: true })}
                className='w-9/12 text-base p-2.5 outline-none border-b-2 border-solid border-L-D-P bg-transparent hover:bg-L-D-P-hover rounded'
                placeholder='carpincho_eficiente@gmail.com'
              />
              {
                errors.email && (
                  <p tabIndex={6} className="w-9/12 bg-red-100 text-red-600 text-center p-1 rounded">Email is requiere</p>
                )
              }
            </section>

            <section className='w-full flex flex-col items-center'>
              <h4 className='w-9/12 text-xl'>Contraseña:</h4>
              <input
                tabIndex={7}
                aria-label="Ingrese su contraseña"
                type="password"
                name='password'
                {...register('password', { required: true })}
                className='w-9/12 text-base p-2.5 outline-none border-b-2 border-solid border-L-D-P bg-transparent hover:bg-L-D-P-hover rounded'
                placeholder='*********'
              />
              {
                errors.password && (
                  <p tabIndex={8} className="w-9/12 bg-red-100 text-red-600 text-center p-1 rounded">Password is requiere</p>
                )
              }

              <article className='w-9/12 text-right pt-1'>
                <a tabIndex={9} href="#" className='no-underline text-base transition-colors duration-300 ease-in-out hover:text-L-D-P-dark dark:hover:text-L-D-P'>Olvidaste tu contraseña?</a>
              </article>
            </section>

            <button tabIndex={10} type="submit" className='w-9/12 bg-L-D-P pt-1.5 no-underline transition-colors duration-300 ease-in-out border-b-4 border-solid border-L-D-P-dark hover:bg-L-D-P-dark hover:border-L-D-P rounded'>Acceder</button>

            <section className='flex items-center gap-2.5 text-center'>
              <p tabIndex={11} className="text-xl">No tienes cuenta?</p>
              <Link tabIndex={12} to='/register' className='no-underline text-xl transition-colors duration-300 ease-in-out hover:text-L-D-P-dark dark:hover:text-L-D-P'>Registrarse</Link>
            </section>
          </form>
        </div>
      </article>
    </section>
  )
}