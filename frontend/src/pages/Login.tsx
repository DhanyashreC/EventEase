import { useState } from "react";
import Navbar from "../components/Navbar";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Store the JWT token returned by the backend
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Store user information if returned
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Login successful
      navigate("/events");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <div className="auth-glow"></div>

        <div className="auth-card">
          <span className="auth-badge">
            <Sparkles size={15} />
            Welcome back
          </span>

          <h1>
            Sign in to <span>EventEase.</span>
          </h1>

          <p className="auth-subtitle">
            Your next unforgettable experience is waiting.
          </p>

          <form className="auth-form" onSubmit={handleLogin}>
            <label>Email address</label>
            <div className="auth-input">
              <Mail size={18} />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <label>Password</label>
            <div className="auth-input">
              <Lock size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="auth-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#">Forgot password?</a>
            </div>

            {error && (
              <p style={{ color: "#ff6b6b", fontSize: "14px" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default Login;