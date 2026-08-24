import {
  LayoutGrid,
  CheckSquare,
  Calendar,
  Activity,
  BarChart3,
  Settings,
  Star,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import TaskMasterLogo from '../../../public/TaskMasterLogo.svg'
const navItems = [
  { icon: LayoutGrid, label: "Workspaces", active: true },
  // { icon: CheckSquare, label: "My Tasks" },
  // { icon: Calendar, label: "Calendar" },
  // { icon: Activity, label: "Activity" },
  // { icon: BarChart3, label: "Reports" },
  // { icon: Settings, label: "Settings" },
];

const starredWorkspaces = [
  { label: "Mobile App Launch", color: "#f4638a", starred: true },
  { label: "Website Redesign", color: "#4d8dfa", starred: true },
  { label: "Marketing Campaign", color: "#9061f9" },
  { label: "Internal Tools", color: "#34c98f" },
];

const user = {
  name: "Debanik P.",
  role: "Product Designer",
  avatarUrl: "https://i.pravatar.cc/80?img=13",
};

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/", { state: { message: "You have been logged out." } });
  };

  return (
    <aside className={styles.sidebar}>
      <Link className={styles.brand} to="/dashboard" aria-label="Go to dashboard">
        
        <img src={TaskMasterLogo} alt="" style={{width:'50px'}}/>
        <span className={styles.brandName}>TaskMaster</span>
      </Link>

      <nav className={styles.nav}>
        {navItems.map(({ icon: Icon, label, active }) => (
          <Link
            key={label}
            to="/dashboard"
            className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.divider} />

      <div className={styles.starredSection}>
        <span className={styles.starredLabel}>Starred Workspaces</span>
        <ul className={styles.starredList}>
          {starredWorkspaces.map((w) => (
            <li key={w.label} className={styles.starredItem}>
              <span
                className={styles.starredDot}
                style={{ backgroundColor: w.color }}
              />
              <span className={styles.starredName}>{w.label}</span>
              {w.starred && (
                <Star size={14} className={styles.starredIcon} fill="#f4b740" strokeWidth={0} />
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.userCard}>
        <img src={user.avatarUrl} alt={user.name} className={styles.avatar} />
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userRole}>{user.role}</span>
        </div>
        <ChevronDown size={16} className={styles.userChevron} />
        <button className={styles.logoutButton} type="button" onClick={handleLogout} aria-label="Log out">
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  );
}
