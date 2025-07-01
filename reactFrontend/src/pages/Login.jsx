import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const token = useAuthStore((state) => state.token);

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { token, user } = await login(form);
      setToken(token);
      setUser(user);
      navigate("/tasks");
    } catch (err) {
      setError("Credenciales incorrectas");
      console.error("Login error:", err);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/tasks");
    }
  }, [token, navigate]);

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Iniciar sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
