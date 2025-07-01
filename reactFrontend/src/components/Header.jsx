import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Header = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/tasks">
          Evaluación 04
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/tasks">
                Tareas
              </Link>
            </li>
          </ul>

          <span className="navbar-text me-3 text-light">
            {user?.username}
          </span>
          <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
