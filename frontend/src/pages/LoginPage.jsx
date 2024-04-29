
import { Link } from "react-router-dom";

export default function LoginPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

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

        <form className='divInputs' onSubmit={handleSubmit}>
          <section className='containerInput'>
            <h4 className='inputH4'>Nombre de usuario</h4>
            <input
              type="text"
              id='user'
              className='input'
              placeholder='carpincho_eficiente@gmail.com'
            />
          </section>

          <section className='containerInput'>
            <h4 className='inputH4'>Contraseña:</h4>
            <input
              type="password"
              id='password'
              className='input'
              placeholder='*********'
            />

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