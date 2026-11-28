import { Link } from '../router/RouterContext.jsx';

function NotFound() {
  return (
    <section className="page-section">
      <h1>Página no encontrada</h1>
      <p>La ruta solicitada no existe dentro del sitio.</p>
      <div className="page-actions">
        <Link to="/" className="btn-primary">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
