import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Layers, CheckCircle2, Sparkles } from "lucide-react";
import styles from "./LoginPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import TaskMasterLogo from '../../../public/TaskMasterLogo.svg'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate=useNavigate()
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook up real auth here
    navigate('/dashboard')
    console.log({ email, password, remember });

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
            Manage projects, tasks and bugs in one beautiful workspace.
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
            <div className={styles.cardIconWrap}>
              <div className={styles.cardIcon}>
                <Layers className={styles.brandIcon} strokeWidth={2.5} />
              </div>
            </div>
            <h2 className={styles.cardTitle}>Welcome Back</h2>
            <p className={styles.cardSubtitle}>Sign in to continue to your workspace</p>
          </div>

          <div className={styles.divider} />

          <form onSubmit={handleSubmit} className={styles.form}>
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

            <div className={styles.formOptions}>
              <label className={styles.formOptions}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className={styles.checkbox}
                />
                Remember me
              </label>
              <a href="#" className={styles.link}>
                Forgot password?
              </a>
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

          <button
            type="button"
            className={styles.googleButton}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className={styles.signupText}>
            Don't have an account?{" "}
            <a href="#" className={styles.link}>
              Sign up
            </a>
          </p>
        </div>
      </div>

      <div className={styles.securityNote}>
        <ShieldIcon />
        Your data is secure and encrypted
      </div>
    </div>
  );
}

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

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.3 35.4 26.8 36 24 36c-5.3 0-9.6-3.1-11.3-7.5l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.3 5.8l6.3 5.3C39.7 37 44 31 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}