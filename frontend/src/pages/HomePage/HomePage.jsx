import Navbar from "../../components/navbar/Navbar.jsx";
import parrafos from "./parrafos.js";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <Navbar></Navbar> 

      <section className="w-full min-h-screen flex flex-wrap gap-5 p-2.5 justify-center bg-L-B-P text-L-T-P dark:bg-D-B-P dark:text-D-T-P">

        {parrafos.map((parrafo, index) => (
          <article className="flex flex-col gap-2.5 s:max-w-lg" key={index}>
            <p tabIndex={`1${index}1`} className="text-2xl border-b-2 border-dashed border-L-D-P-dark dark:border-D-D-P">{parrafo.titulo}</p>
            {(parrafo.parrafos).map((parrafo, index2)=>(
              <p tabIndex={`1${index}${2 + index2}`} className="text-lg text-wrap indent-5" key={index2}>{parrafo}</p>
            ))}
          </article>
        ))}
      </section>
    </div>
  )
}

export default HomePage