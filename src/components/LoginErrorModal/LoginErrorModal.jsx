import { createPortal } from "react-dom";
import { AlertCircle, X } from "lucide-react";

import styles from "./LoginErrorModal.module.css";

const LoginErrorModal = ({ onClose }) => {
  const portalRoot = document.getElementById("portal-root");

  if (!portalRoot) {
    return null;
  }

  return createPortal(
    <div
      className={styles.overlay}
      onMouseDown={onClose}
    >
      <section
        className={styles.modal}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="login-error-title"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        {/* Close button */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close error message"
        >
          <X size={18} />
        </button>

        {/* Error icon */}
        <div className={styles.iconWrapper}>
          <AlertCircle size={28} />
        </div>

        {/* Title */}
        <h2
          id="login-error-title"
          className={styles.title}
        >
          Login failed
        </h2>

        {/* Message */}
        <p className={styles.message}>
          The username or password you entered is
          incorrect. Please check your credentials and
          try again.
        </p>

        {/* Button */}
        <button
          type="button"
          className={styles.tryAgainButton}
          onClick={onClose}
        >
          Try again
        </button>
      </section>
    </div>,
    portalRoot
  );
};

export default LoginErrorModal;