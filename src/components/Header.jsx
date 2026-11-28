import { Link } from '../router/RouterContext.jsx';

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand" activeClassName="">
          Portafolio
        </Link>
        <nav className="nav" aria-label="Navegación principal">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          <Link to="/proyectos" className="nav-link">
            Proyectos
          </Link>
          <Link to="/contacto" className="nav-link">
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
