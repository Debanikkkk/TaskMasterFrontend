import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({ children, as = "div", to, className = "", ...props }) {
  const Component = as === "link" ? Link : as;

  return (
    <Component
      className={`${styles.card} ${className}`.trim()}
      {...(to ? { to } : {})}
      {...props}
    >
      {children}
    </Component>
  );
}
