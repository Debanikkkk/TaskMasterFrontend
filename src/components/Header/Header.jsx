import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Search, Bell, Plus, X } from "lucide-react";
import styles from "./Header.module.css";

const workspaceColors = ["#f4638a", "#4d8dfa", "#8a6bf5", "#34c98f", "#f4b740"];

export default function Header({
  title = "Workspaces",
  userFirstName = "Debanik",
  subtitle = "Here's what's happening with your projects today.",
  notificationCount = 3,
  onCreateWorkspace,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(workspaceColors[0]);

  useEffect(() => {
    if (!isModalOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsModalOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    setWorkspaceName("");
    setDescription("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateWorkspace?.({
      title: workspaceName.trim(),
      description: description.trim() || "A new TaskMaster workspace",
      iconBg: selectedColor,
    });
    closeModal();
  };

  return (
    <>
    <header className={styles.header}>
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.greeting}>
          Good morning, {userFirstName}! <span className={styles.wave}>👋</span>
        </p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.actions}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search workspaces, tasks..."
            className={styles.searchInput}
            readOnly
          />
          <kbd className={styles.kbd}>⌘K</kbd>
        </div>

        {/* <button className={styles.iconButton} type="button" aria-label="Notifications">
          <Bell size={18} />
          {notificationCount > 0 && (
            <span className={styles.badge}>{notificationCount}</span>
          )}
        </button> */}

        <button className={styles.primaryButton} type="button" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          New Workspace
        </button>
      </div>
    </header>
    {isModalOpen && createPortal(
      <div className={styles.modalOverlay} onMouseDown={closeModal}>
        <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="new-workspace-title" onMouseDown={(event) => event.stopPropagation()}>
          <div className={styles.modalHeader}>
            <div>
              <p className={styles.modalEyebrow}>Workspace setup</p>
              <h2 id="new-workspace-title" className={styles.modalTitle}>Create a workspace</h2>
            </div>
            <button className={styles.closeButton} type="button" onClick={closeModal} aria-label="Close modal"><X size={18} /></button>
          </div>
          <form onSubmit={handleSubmit}>
            <label className={styles.fieldLabel} htmlFor="workspace-name">Workspace name</label>
            <input id="workspace-name" className={styles.fieldInput} value={workspaceName} onChange={(event) => setWorkspaceName(event.target.value)} placeholder="e.g. Product Launch" required autoFocus />
            <label className={styles.fieldLabel} htmlFor="workspace-description">Description <span>(optional)</span></label>
            <textarea id="workspace-description" className={styles.fieldInput} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What is this workspace for?" rows="3" />
            <fieldset className={styles.colorField}>
              <legend className={styles.fieldLabel}>Workspace color</legend>
              <div className={styles.colorOptions}>
                {workspaceColors.map((color) => (
                  <button key={color} type="button" className={`${styles.colorButton} ${selectedColor === color ? styles.colorButtonSelected : ""}`} style={{ backgroundColor: color }} onClick={() => setSelectedColor(color)} aria-label={`Choose ${color} workspace color`} aria-pressed={selectedColor === color} />
                ))}
              </div>
            </fieldset>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} type="button" onClick={closeModal}>Cancel</button>
              <button className={styles.submitButton} type="submit">Create workspace</button>
            </div>
          </form>
        </section>
      </div>,
      document.getElementById("portal-root"),
    )}
    </>
  );
}
