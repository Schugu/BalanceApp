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
    <section className='w-full min-h-screen p-2.5 flex flex-col gap-2 place-items-center text-2xl bg-L-B-P dark:bg-D-B-P text-L-T-P dark:text-D-T-P'>
      <article className='w-full flex flex-col items-center gap-4'>
        <div className='w-48 h-48	rounded-full overflow-hidden border-4 border-solid border-L-D-P'>
          <img className="w-full h-auto object-cover object-center" src="CarpinchoPlatudo.jpg" alt="CarpinchoPlatudo" />
        </div>
        <Link to='/' className='pb-1.5 border-b-2 border-L-D-P w-4/5 text-center'>Carpincho Eficiente</Link>
      </article>

      <article className='w-full flex flex-col place-items-center gap-2.5'>
        {
          registerErrors.map((error, i) => (
            <div key={i} className="bg-red-100 text-red-600 w-9/12 text-center p-2">
              {error}
            </div>
          ))
        }

        <h3 className='text-center border-b-2 border-solid border-L-D-P'>Crear una cuenta</h3>

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
                <p className="bg-red-100 text-red-600 w-9/12 text-center p-2 rounded">Username is requiere</p>
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
                <p className="bg-red-100 text-red-600 w-9/12 text-center p-2 rounded">Email is requiere</p>
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
                <p className="bg-red-100 text-red-600 w-9/12 text-center p-2 rounded">Password is requiere</p>
              )
            }
          </section>

          <button type="submit" className='w-9/12 bg-L-D-P pt-1.5 no-underline transition-colors duration-300 ease-in-out border-b-4 border-solid border-L-D-P-dark hover:bg-L-D-P-dark hover:border-L-D-P rounded'>Registrarse</button>

          <section className='flex flex-wrap justify-center items-center gap-2.5 text-center'>
            <p className="text-xl">¿Ya tienes una cuenta?</p>
            <Link to='/login' className='no-underline text-xl transition-colors duration-300 ease-in-out hover:text-L-D-P-dark dark:hover:text-L-D-P-dark'>Inicia Sesión</Link>
          </section>
        </form>

      </article>
    </section>
  );
}

export default RegisterPage;