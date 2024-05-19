import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";

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
    <section className='w-full min-h-screen p-2 flex justify-center items-center text-2xl bg-L-B-P dark:bg-D-B-P text-L-T-P dark:text-D-T-P'>
      <article className="lg:w-4/6 w-full h-full flex flex-col items-center justify-center gap-2">
        <div className='w-5/6 flex flex-col items-center gap-4 border-b-2 border-solid border-L-D-P '>
          <section className='w-52 h-52	rounded-full overflow-hidden border-4 border-solid border-L-D-P'>
            <img className="w-full h-auto object-cover object-center" src="CarpinchoPlatudo.jpg" alt="CarpinchoPlatudo" />
          </section>

          <Link to='/' className='pb-1.5 text-center transition-colors duration-300 ease-in-out hover:text-L-D-P-dark dark:hover:text-L-D-P-light'>Carpincho Eficiente</Link>
        </div>

        <div className='w-full flex flex-col place-items-center gap-2.5'>
          {
            registerErrors.map((error, i) => (
              <div key={i} className="w-9/12 bg-red-100 text-red-600 text-center p-1 rounded">
                {error}
              </div>
            ))
          }

          <h3 className='px-2 text-center border-b-2 border-solid border-L-D-P'>Crear una cuenta</h3>

          <form className='w-full flex flex-col items-center gap-3.5' onSubmit={onSubmit}>
            <section className='w-full flex flex-col items-center'>
              <h4 className='w-9/12 text-xl'>Nombre de usuario</h4>
              <input
                type="text"
                name="username"
                placeholder='Carpincho Eficiente'
                {...register('username', { required: true })}
                className='w-9/12 text-base p-2.5 outline-none border-b-2 border-solid border-L-D-P bg-transparent hover:bg-L-D-P-hover rounded'
              />
              {
                errors.username && (
                  <p className="w-9/12 bg-red-100 text-red-600 text-center p-1 rounded">Username is requiere</p>
                )
              }
            </section>

            <section className='w-full flex flex-col items-center'>
              <h4 className='w-9/12 text-xl'>Correo electrónico</h4>
              <input
                type="email"
                name="email"
                placeholder='carpincho_eficiente@gmail.com'
                {...register('email', { required: true })}
                className='w-9/12 text-base p-2.5 outline-none border-b-2 border-solid border-L-D-P bg-transparent hover:bg-L-D-P-hover rounded'
              />
              {
                errors.email && (
                  <p className="w-9/12 bg-red-100 text-red-600 text-center p-1 rounded">Email is requiere</p>
                )
              }
            </section>

            <section className='w-full flex flex-col items-center'>
              <h4 className='w-9/12 text-xl'>Contraseña</h4>
              <input
                type="password"
                name="password"
                placeholder='*********'
                {...register('password', { required: true })}
                className='w-9/12 text-base p-2.5 outline-none border-b-2 border-solid border-L-D-P bg-transparent hover:bg-L-D-P-hover rounded'
              />
              {
                errors.password && (
                  <p className="w-9/12 bg-red-100 text-red-600 text-center p-1 rounded">Password is requiere</p>
                )
              }
            </section>

            <button type="submit" className='w-9/12 bg-L-D-P pt-1.5 no-underline transition-colors duration-300 ease-in-out border-b-4 border-solid border-L-D-P-dark hover:bg-L-D-P-dark hover:border-L-D-P rounded'>Registrarse</button>

            <section className='flex flex-wrap justify-center items-center gap-2.5 text-center'>
              <p className="text-xl">¿Ya tienes una cuenta?</p>
              <Link to='/login' className='no-underline text-xl transition-colors duration-300 ease-in-out hover:text-L-D-P-dark dark:hover:text-L-D-P-dark'>Inicia Sesión</Link>
            </section>
          </form>

        </div>
      </article>
    </section>
  );
}

export default RegisterPage;