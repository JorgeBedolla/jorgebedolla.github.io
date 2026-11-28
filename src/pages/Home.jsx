import { Link } from '../router/RouterContext.jsx';

function Home() {
  return (
    <section className="page-section">
      <h1>Bienvenido a mi Portafolio</h1>
      <p>
        Estructura inicial de proyecto React con enrutamiento por hash listo
        para publicarse en GitHub Pages.
      </p>
      <div className="page-actions">
        <Link to="/proyectos" className="btn-primary">
          Ver proyectos
        </Link>
        <Link to="/contacto" className="btn-secondary">
          Contacto
        </Link>
      </div>
    </section>
  );
}

export default Home;
