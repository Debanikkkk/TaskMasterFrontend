import { useState } from "react";
import { Search, Plus } from "lucide-react";
import CreateWorkspaceModal from "../CreateWorkspaceModal/CreateWorkspaceModal";
import styles from "./Header.module.css";

const Header = ({
  title = "Workspaces",
  userFirstName = "Debanik",
  subtitle = "Here's what's happening with your projects today.",
  onCreateWorkspace,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <header className={styles.header}>
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.greeting}>
          Good morning, {userFirstName}! 
        </p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.actions}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search workspaces..."
            className={styles.searchInput}
            readOnly
          />
        </div>
        <button className={styles.primaryButton} type="button" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          New Workspace
        </button>
      </div>
    </header>
    {isModalOpen && (
      <CreateWorkspaceModal
        onClose={() => setIsModalOpen(false)}
        onCreateWorkspace={onCreateWorkspace}
      />
    )}
    </>
  );
};

export default Header;
