import { useState, type FormEvent } from "react";
import Navbar from "../components/Navbar";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setSuccess("Account created successfully! You can now sign in.");

      // Wait briefly so the user can see the success message
      setTimeout(() => {
        navigate("/login");
      }, 1500);
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
            Join EventEase
          </span>

          <h1>
            Create your <span>account.</span>
          </h1>

          <p className="auth-subtitle">
            Discover events and create unforgettable experiences.
          </p>

          <form className="auth-form" onSubmit={handleRegister}>
            <label>Full name</label>
            <div className="auth-input">
              <User size={18} />
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Create a password (min. 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p style={{ color: "#ff6b6b", fontSize: "14px" }}>
                {error}
              </p>
            )}

            {success && (
              <p style={{ color: "#54f4df", fontSize: "14px" }}>
                {success}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default Register;