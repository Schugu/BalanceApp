import Navbar from "../../components/navbar/Navbar.jsx";
import parrafos from "./parrafos.js";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <Navbar></Navbar>

      <section className="w-full min-h-screen flex flex-wrap gap-5 p-2.5 justify-center bg-L-B-P text-L-T-P dark:bg-D-B-P dark:text-D-T-P">

        {parrafos.map((parrafo, index) => (
          <article className="flex flex-col gap-2.5 s:max-w-lg" key={index}>
            <h2 className="text-2xl border-b-2 border-dashed border-L-D-P-dark dark:border-D-D-P">{parrafo.titulo}</h2>
            {(parrafo.parrafos).map((parrafo, index)=>(
              <p className="text-lg text-wrap indent-5" key={index}>{parrafo}</p>
            ))}
          </article>
        ))}
      </section>
    </div>
  )
}

export default HomePage