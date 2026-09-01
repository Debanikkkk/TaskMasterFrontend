import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Rocket, Monitor, Zap, Heart, Smartphone, Package, Cake, BarChart2 } from "lucide-react";
import styles from "../Header/Header.module.css";
import pageStyles from "../Dashboard/Dashboard.module.css";

// Lucide icon names matching SpringBoot API (backend expects these exact component names)
const LUCIDE_ICONS = [
  { name: "Rocket", value: "Rocket", component: Rocket },
  { name: "Monitor", value: "Monitor", component: Monitor },

  { name: "Zap", value: "Zap", component: Zap },
  { name: "Heart", value: "Heart", component: Heart },
  { name: "Smartphone", value: "Smartphone", component: Smartphone },
  { name: "Package", value: "Package", component: Package },
  { name: "Cake", value: "Cake", component: Cake },
  { name: "BarChart2", value: "BarChart2", component: BarChart2 },

];

const workspaceColors = ["#f4638a", "#4d8dfa", "#8a6bf5", "#34c98f", "#f4b740"];

const CreateWorkspaceModal = ({ onClose, onCreateWorkspace }) => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(workspaceColors[0]);
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Get current selected icon component and name
  const selectedIcon = LUCIDE_ICONS[selectedIconIndex];
  const IconComponent = selectedIcon.component;

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateWorkspace?.({
      title: workspaceName.trim(),
      description: description.trim() || "A new TaskMaster workspace",
      iconBg: selectedColor,
      // SpringBoot API expects exact component name (e.g., "Rocket", "Monitor")
      icon: selectedIcon.value, 
    });
    onClose();
  };

  return createPortal(
      <div className={styles.modalOverlay} onMouseDown={onClose}>
        <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="new-workspace-title" onMouseDown={(event) => event.stopPropagation()}>
          <div className={styles.modalHeader}>
            <div>
              <p className={styles.modalEyebrow}>Workspace setup</p>
              <h2 id="new-workspace-title" className={styles.modalTitle}>Create a workspace</h2>
            </div>
            <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close modal"><X size={18} /></button>
          </div>
          <form onSubmit={handleSubmit}>
            <label className={styles.fieldLabel} htmlFor="workspace-icon">Workspace icon</label>
            <select 
              id="workspace-icon" 
              className={pageStyles.formSelect}
              value={selectedIconIndex}
              onChange={(event) => setSelectedIconIndex(parseInt(event.target.value))}
              aria-label="Choose workspace icon"
            >
              {LUCIDE_ICONS.map((icon, index) => (
                <option key={icon.name} value={index}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconComponent size={18} /> {icon.name}
                  </div>
                </option>
              ))}
            </select>
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
              <button className={styles.cancelButton} type="button" onClick={onClose}>Cancel</button>
              <button className={styles.submitButton} type="submit">Create workspace</button>
            </div>
          </form>
        </section>
      </div>,
      document.getElementById("portal-root"),
    );
};

export default CreateWorkspaceModal;