import Navbar from "../../components/navbar/Navbar.jsx";

function HomePage() {
  return (
    <div>
      <Navbar></Navbar>

      <section className="homePageSection">
        <article className="homePageArticle">
          <h2 className="homePageArticleTitle">Sobre Nosotros</h2>
          <p className="homePageArticleParagraph">
            ¡Bienvenido a Carpincho Eficiente, tu compañero en la gestión inteligente de tus finanzas! <br /><br />

            En Carpincho Eficiente, nos apasiona ayudarte a llevar un control claro y eficaz de tus ingresos y gastos.
            Nuestra misión es proporcionarte las herramientas necesarias para que puedas tomar decisiones
            financieras informadas y alcanzar tus objetivos económicos con confianza.
          </p>
        </article>

        <article className="homePageArticle">
          <h2 className="homePageArticleTitle">Nuestra Historia</h2>
          <p className="homePageArticleParagraph">
            El equipo de Carpincho Eficiente surgió de una necesidad personal:
            queríamos una manera simple pero poderosa de llevar un registro de
            nuestros propios gastos e ingresos. Después de buscar y probar varias
            aplicaciones, nos dimos cuenta de que ninguna cumplía con todos nuestros
            requisitos. Así que decidimos crear nuestra propia solución: una aplicación
            que fuera fácil de usar, pero también lo suficientemente robusta
            como para satisfacer las necesidades de cualquier usuario, desde
            principiantes hasta expertos en finanzas personales.
          </p>
        </article>

        <article className="homePageArticle">
          <h2 className="homePageArticleTitle">¿Por qué Carpincho Eficiente?</h2>
          <p className="homePageArticleParagraph">
            En un mundo donde el dinero puede ser una fuente de estrés y ansiedad,
            creemos que es fundamental tener un control claro de nuestras finanzas.
            Con Carpincho Eficiente, puedes realizar un seguimiento detallado de tus
            gastos e ingresos en tiempo real, establecer presupuestos personalizados
            y recibir análisis útiles para optimizar tu situación financiera. Nuestra
            aplicación está diseñada para ser intuitiva y fácil de usar, para que
            puedas concentrarte en tus metas financieras sin complicaciones.
          </p>
        </article>

        <article className="homePageArticle">
          <h2 className="homePageArticleTitle">Nuestro Compromiso</h2>
          <p className="homePageArticleParagraph">
            En Carpincho Eficiente, nos comprometemos a seguir mejorando y actualizando
            nuestra aplicación para ofrecerte la mejor experiencia posible. Valoramos
            tus comentarios y sugerencias, así que no dudes en ponerte en contacto con
            nosotros si tienes alguna pregunta o idea para mejorar. <br /><br />

            Gracias por confiar en Carpincho Eficiente para gestionar tus finanzas personales.
            ¡Estamos aquí para ayudarte a alcanzar la estabilidad financiera que deseas! <br /> <br />

            ¡Controla tus finanzas con Carpincho Eficiente hoy mismo!
          </p>
        </article>
      </section>

    </div>
  )
}

export default HomePage