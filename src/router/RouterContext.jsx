import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const RouterContext = createContext(null);

/**
 * Normaliza un hash o ruta a una ruta limpia iniciada por '/'.
 * Ejemplos: '', '#', '#/' -> '/'; '#/proyectos/' -> '/proyectos'.
 */
export function normalizePath(rawPath) {
  if (!rawPath) return '/';

  const withoutHash = rawPath.startsWith('#') ? rawPath.slice(1) : rawPath;
  const withLeadingSlash = withoutHash.startsWith('/')
    ? withoutHash
    : `/${withoutHash}`;

  if (withLeadingSlash.length > 1 && withLeadingSlash.endsWith('/')) {
    return withLeadingSlash.slice(0, -1);
  }

  return withLeadingSlash || '/';
}

function getCurrentHashPath() {
  return normalizePath(window.location.hash);
}

/**
 * Proveedor de enrutamiento por hash compatible con GitHub Pages.
 */
export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(getCurrentHashPath);

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#/');
    }

    const handleHashChange = () => {
      setCurrentPath(getCurrentHashPath());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((to) => {
    const targetPath = normalizePath(to);
    const targetHash = `#${targetPath}`;

    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    } else {
      setCurrentPath(targetPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const value = useMemo(
    () => ({ currentPath, navigate }),
    [currentPath, navigate]
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}

/**
 * Hook para acceder a la ruta actual y a la función de navegación.
 */
export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter debe usarse dentro de un RouterProvider.');
  }
  return context;
}

/**
 * Enlace declarativo para navegar entre rutas sin recargar la página.
 */
export function Link({
  to,
  children,
  className = '',
  activeClassName = 'active',
  onClick,
  ...rest
}) {
  const { currentPath, navigate } = useRouter();
  const targetPath = normalizePath(to);
  const isActive = currentPath === targetPath;
  const combinedClassName = [className, isActive ? activeClassName : '']
    .filter(Boolean)
    .join(' ');

  const handleClick = (event) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    navigate(targetPath);
  };

  return (
    <a
      href={`#${targetPath}`}
      className={combinedClassName || undefined}
      aria-current={isActive ? 'page' : undefined}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}

/**
 * Define una asociación entre una ruta y el elemento a renderizar.
 */
export function Route({ element }) {
  return element ?? null;
}

/**
 * Selecciona y renderiza la primera ruta coincidente (o la ruta '*').
 */
export function Routes({ children }) {
  const { currentPath } = useRouter();
  const routes = Children.toArray(children).filter(isValidElement);

  const exactMatch = routes.find(
    (route) =>
      route.props.path !== '*' && normalizePath(route.props.path) === currentPath
  );
  if (exactMatch) {
    return exactMatch.props.element ?? null;
  }

  const fallbackRoute = routes.find((route) => route.props.path === '*');
  return fallbackRoute ? fallbackRoute.props.element ?? null : null;
}
