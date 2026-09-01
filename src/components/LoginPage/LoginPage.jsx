import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Layers,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.css";
import TaskMasterLogo from "../../assets/TaskMasterLogo.svg";
import { api } from "../../redux/services/api";

import LoginErrorModal from "../LoginErrorModal/LoginErrorModal";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loginError, setLoginError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoginError(false);
    setIsLoggingIn(true);

    try {
      const response = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      console.log("Login successful:", response);

      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);
      localStorage.setItem("username", response.username);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(true);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Background photo + tint */}
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
        <div>
          <img
            src={TaskMasterLogo}
            style={{ width: "50px" }}
            alt="TaskMaster"
          />
        </div>

        <span className={styles.brandName}>
          TaskMaster
        </span>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        {location.state?.message && (
          <div className={styles.logoutMessage}>
            {location.state.message}
          </div>
        )}

        {/* Left copy panel */}
        <div className={styles.intro}>
          <h1 className={styles.introTitle}>
            Plan. Track.
            <br />

            <span className={styles.introAccent}>
              Deliver.
            </span>
          </h1>

          <p className={styles.introDescription}>
            Manage personal projects and tasks in one beautiful
            workspace.
          </p>

          <div className={styles.features}>
            <Feature
              icon={
                <Layers className={styles.smallIcon} />
              }
              label="Organize Workspaces"
            />

            <Feature
              icon={
                <CheckCircle2
                  className={styles.smallIcon}
                />
              }
              label="Track Progress"
            />

            <Feature
              icon={
                <Sparkles
                  className={styles.smallIcon}
                />
              }
              label="Ship Quality Work"
            />
          </div>

          <blockquote className={styles.quote}>
            "Projects don't succeed by accident.
            <br />
            They succeed by design."
          </blockquote>
        </div>

        {/* Login card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img
              src={TaskMasterLogo}
              style={{ width: "100px" }}
              alt="TaskMaster"
            />

            <h2 className={styles.cardTitle}>
              Welcome Back
            </h2>

            <p className={styles.cardSubtitle}>
              Sign in to continue to your workspace
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
                <Layers
                  className={styles.inputIcon}
                />

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  placeholder="Enter your Email"
                  className={styles.input}
                  required
                  autoComplete="username"
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
                <Lock
                  className={styles.inputIcon}
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  className={`${styles.input} ${styles.passwordInput}`}
                  required
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  className={styles.passwordToggle}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff
                      className={styles.smallIcon}
                    />
                  ) : (
                    <Eye
                      className={styles.smallIcon}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoggingIn}
            >
              {isLoggingIn
                ? "Signing in..."
                : "Sign In"}
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
            Don't have an account?{" "}

            <button
              type="button"
              className={styles.linkButton}
              onClick={() =>
                navigate("/register")
              }
            >
              Sign up
            </button>
          </p>
        </div>
      </div>

      {/* Login Error Modal */}
      {loginError && (
        <LoginErrorModal
          onClose={() => setLoginError(false)}
        />
      )}
    </div>
  );
};

export default LoginPage;


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