import { useState } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Layers,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import styles from "./RegisterPage.module.css";
import TaskMasterLogo from "../../assets/TaskMasterLogo.svg";
import { api } from "../../redux/services/api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    if (!username.includes("@")) {
  setError("Please enter a valid email address.");
  return;
}

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      navigate("/", {
        state: {
          message: "Account created successfully. Please sign in.",
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Background */}
      <div
        className={styles.backgroundImage}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop')",
        }}
      />

      <div className={styles.backgroundTint} />

      {/* Logo */}
      <div className={styles.brand}>
        <img
          src={TaskMasterLogo}
          className={styles.brandLogo}
          alt="TaskMaster"
        />

        <span className={styles.brandName}>
          TaskMaster
        </span>
      </div>

      {/* Main */}
      <div className={styles.content}>
        {/* Left panel */}
        <div className={styles.intro}>
          <h1 className={styles.introTitle}>
            Build. Organize.
            <br />
            <span className={styles.introAccent}>
              Achieve.
            </span>
          </h1>

          <p className={styles.introDescription}>
            Create your TaskMaster account and start
            organizing your projects in one beautiful
            workspace.
          </p>

          <div className={styles.features}>
            <Feature
              icon={<Layers className={styles.smallIcon} />}
              label="Create Workspaces"
            />

            <Feature
              icon={<CheckCircle2 className={styles.smallIcon} />}
              label="Track Your Tasks"
            />

            <Feature
              icon={<Sparkles className={styles.smallIcon} />}
              label="Get Work Done"
            />
          </div>

          <blockquote className={styles.quote}>
            "Great work starts with
            <br />
            great organization."
          </blockquote>
        </div>

        {/* Register card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img
              src={TaskMasterLogo}
              className={styles.cardLogo}
              alt="TaskMaster"
            />

            <h2 className={styles.cardTitle}>
              Create Account
            </h2>

            <p className={styles.cardSubtitle}>
              Join TaskMaster and organize your work
            </p>
          </div>

          <div className={styles.divider} />

          <form
            onSubmit={handleSubmit}
            className={styles.form}
          >
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className={styles.label}
              >
                Email
              </label>

              <div className={styles.inputWrap}>
                <User className={styles.inputIcon} />

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  placeholder="Choose a username"
                  className={styles.input}
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className={styles.label}
              >
                Password
              </label>

              <div className={styles.inputWrap}>
                <Lock className={styles.inputIcon} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Create a password"
                  className={`${styles.input} ${styles.passwordInput}`}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  className={styles.passwordToggle}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className={styles.smallIcon} />
                  ) : (
                    <Eye className={styles.smallIcon} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className={styles.label}
              >
                Confirm Password
              </label>

              <div className={styles.inputWrap}>
                <Lock className={styles.inputIcon} />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Confirm your password"
                  className={`${styles.input} ${styles.passwordInput}`}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) => !current
                    )
                  }
                  className={styles.passwordToggle}
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className={styles.smallIcon} />
                  ) : (
                    <Eye className={styles.smallIcon} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>
          </form>

          <div className={styles.socialDivider}>
            <div className={styles.dividerLine} />

            <span className={styles.dividerLabel}>
              or
            </span>

            <div className={styles.dividerLine} />
          </div>

          <p className={styles.signupText}>
            Already have an account?{" "}

            <button
              type="button"
              className={styles.linkButton}
              onClick={() => navigate("/")}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

function Feature({ icon, label }) {
  return (
    <div className={styles.feature}>
      <div className={styles.featureIcon}>
        {icon}
      </div>

      <span className={styles.featureLabel}>
        {label}
      </span>
    </div>
  );
}