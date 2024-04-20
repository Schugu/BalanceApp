import './App.css'

function App() {
  return (
    <>
      <section className='portada'>
        <article className='logoAndTitulo'>
          <div className='logoImg'>
            <img src="CarpinchoPlatudo.jpg" alt="" />
          </div>

          <h1 className='tituloPortada'>Carpincho Eficiente</h1>
        </article>




        <article className='articleInputs'>
          <h3 className='inputsH2'>Inicio de sesion</h3>

          <div className='divInputs'>
            <section className='containerInput'>
              <h4 className='inputH4'>Nombre de usuario</h4>
              <input type="text" id='user' className='input' placeholder='carpincho_eficiente@gmail.com' />
            </section>

            <section className='containerInput'>
              <h4 className='inputH4'>Contraseña:</h4>
              <input type="password" id='password' className='input' placeholder='*********' />

              <article className='containerIinkForgetPassword'>
                <a href="#" className='linkForgetPassword'>Olvidaste tu contraseña?</a>
              </article>
            </section>

            <button className='botonIngresar'>Acceder</button>

            <section className='containerLinkRegister'>
              <a href="#" className='linkRegister'>Registrarse</a>
            </section>
          </div>
      
        </article>
      </section>
    </>
  )
}

export default App
