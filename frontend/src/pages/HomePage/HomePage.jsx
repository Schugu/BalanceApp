import Navbar from "../../components/navbar/Navbar.jsx";
import parrafos from "./parrafos.js";

function HomePage() {
  return (
    <div>
      <Navbar></Navbar>

      <section className="homePageSection">

        {parrafos.map((parrafo, index) => (
          <article className="homePageArticle" key={index}>
            <h2 className="homePageArticleTitle">{parrafo.titulo}</h2>
            {(parrafo.parrafos).map((parrafo, index)=>(
              <p className="homePageArticleParagraph" key={index}>{parrafo}</p>
            ))}
          </article>
        ))}
      </section>

    </div>
  )
}

export default HomePage