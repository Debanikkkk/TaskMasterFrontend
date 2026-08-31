import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Layers, CheckCircle2, Sparkles } from "lucide-react";
import styles from "./LoginPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import TaskMasterLogo from '../../assets/TaskMasterLogo.svg'

// Enums matching User entity schema from backend
const USER_FIELDS = [
  { id: 'id', label: 'ID', required: false },
  { id: 'username', label: 'Username', required: true },
  { id: 'password', label: 'Password', required: true }
];

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate=useNavigate()
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook up real auth here
    navigate('/dashboard')
    console.log({ email, username, password, remember });
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
                <img src={TaskMasterLogo} style={{width:'50px'}}alt="" />

        </div>
        <span className={styles.brandName}>TaskMaster</span>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        {location.state?.message && <div className={styles.logoutMessage}>{location.state.message}</div>}
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
            Manage personal projects and tasks in one beautiful workspace.
          </p>

          <div className={styles.features}>
            <Feature icon={<Layers className={styles.smallIcon} />} label="Organize Workspaces" />
            <Feature icon={<CheckCircle2 className={styles.smallIcon} />} label="Track Progress" />
            <Feature icon={<Sparkles className={styles.smallIcon} />} label="Ship Quality Work" />
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
                <img src={TaskMasterLogo} style={{width:'100px'}}alt="" />

            <h2 className={styles.cardTitle}>Welcome Back</h2>
            <p className={styles.cardSubtitle}>Sign in to continue to your workspace</p>
          </div>

          <div className={styles.divider} />

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Email field (kept for compatibility, maps to username in backend) */}
            <div>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <div className={styles.inputWrap}>
                <Mail className={styles.inputIcon} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            {/* Username field (matches backend User.entity.username) */}
            <div>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <div className={styles.inputWrap}>
                <Layers className={styles.inputIcon} />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrap}>
                <Lock className={styles.inputIcon} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`${styles.input} ${styles.passwordInput}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className={styles.passwordToggle}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className={styles.smallIcon} /> : <Eye className={styles.smallIcon} />}
                </button>
              </div>
            </div>


            <button
              type="submit"
              className={styles.submitButton}
            >
              Sign In
            </button>
          </form>

          <div className={styles.socialDivider}>
            <div className={styles.dividerLine} />
            <span className={styles.dividerLabel}>or</span>
            <div className={styles.dividerLine} />
          </div>

          <p className={styles.signupText}>
            Don't have an account?{" "}
            <a href="#" className={styles.link}>
              Sign up
            </a>
          </p>
        </div>
      </div>
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
      <span className={styles.featureLabel}>{label}</span>
    </div>
  );
}
