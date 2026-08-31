# TaskMaster - Frontend Backend Schema Alignment

## Summary of Changes

This document outlines all changes made to align the TaskMasterFrontend with the TaskMasterBackend entity schemas. The frontend now uses `useState` for form handling without API integration, matching the exact field names and enum values from the backend.

---

## 1. CreateWorkspaceModal.jsx

**File:** `TaskMasterFrontend/src/components/CreateWorkspaceModal/CreateWorkspaceModal.jsx`

### Backend Schema (Workspace Entity):
```java
@NotBlank private String icon;          // lucide-react icon name (e.g., "ROCKET", "MONITOR")
@NotBlank private String iconBg;        // color code for background
@NotBlank private String title;
@NotBlank private String description;
private LocalDateTime createdAt;
private LocalDateTime updatedAt;
```

### Frontend Changes:
- Added `selectedIcon` state to track chosen lucide icon
- Added array of lucide icon names: `["ROCKET", "MONITOR", "GITHUB", "ZAP", "HEART", ...]`
- Updated handleSubmit to include all backend fields:
  ```javascript
  onCreateWorkspace?.({
    title: workspaceName.trim(),
    description: description.trim() || "A new TaskMaster workspace",
    iconBg: selectedColor,
    icon: selectedIcon,
  });
  ```

### Props Passed to Parent (Dashboard):
```javascript
{ title, description, iconBg, icon }
```

---

## 2. TaskModal.jsx

**File:** `TaskMasterFrontend/src/components/TaskModal/TaskModal.jsx`

### Backend Enums:

**TaskStatus Enum:**
```java
TODO("Todo"),
IN_PROGRESS("In Progress"),
DONE("Done");
```

**TaskPriority Enum:**
```java
HIGH("High"),
MEDIUM("Medium"),
LOW("Low");
```

### Frontend Changes:
- Added `TASK_STATUS` constant object matching backend labels:
  ```javascript
  const TASK_STATUS = {
    TODO: "Todo",
    IN_PROGRESS: "In Progress",
    DONE: "Done"
  };
  ```
- Added `TASK_PRIORITY` array with values (backend enum names):
  ```javascript
  const TASK_PRIORITY = [
    { value: "HIGH", label: "High" },
    { value: "MEDIUM", label: "Medium" },
    { value: "LOW", label: "Low" }
  ];
  ```
- Updated status select to use backend enum values as option values:
  ```jsx
  <select value={newTask.status || TASK_STATUS.TODO}>
    {Object.entries(TASK_STATUS).map(([value, label]) => (
      <option key={value} value={value}>{label}</option>
    ))}
  </select>
  ```
- Updated priority select to use backend enum values:
  ```jsx
  <select value={newTask.priority || TASK_PRIORITY[0].value}>
    {TASK_PRIORITY.map(({ value, label }) => (
      <option key={value} value={value}>{label}</option>
    ))}
  </select>
  ```

### New Task State Structure:
```javascript
{
  title: "",
  description: "",
  status: "Todo",        // TODO in backend, "Todo" for display
  priority: "High",      // HIGH in backend, "High" for display
  due: ""
}
```

### Props Passed to Parent (WorkspacePage):
```javascript
{ workspaceId, title, description, status, priority, due }
```

---

## 3. LoginPage.jsx

**File:** `TaskMasterFrontend/src/components/LoginPage/LoginPage.jsx`

### Backend Schema (User Entity):
```java
@Column(unique = true, nullable = false, length = 100)
private String username;

@Column(nullable = false)
private String password;
```

### Frontend Changes:
- Added `username` state variable
- Kept `email` state for compatibility (can be mapped to username in backend)
- Updated form to handle both email and username fields:
  ```javascript
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
    console.log({ email, username, password, remember });
  };
  ```

### Form Fields:
| Frontend Field | Backend Entity Field | Type | Required |
|---------------|---------------------|------|----------|
| email | N/A (kept for compatibility) | email | Yes |
| username | User.username | text | Yes |
| password | User.password | password | Yes |

---

## 4. WorkspaceCard Component (Enhanced)

**File:** `TaskMasterFrontend/src/components/WorkspaceCard/WorkspaceCard.jsx`

### Backend Schema Fields Used:
- `id` - Workspace ID (Long, read-only)
- `icon` - Lucide icon name (String)
- `iconBg` - Background color code (String)
- `title` - Workspace title (String)
- `description` - Workspace description (String)

### Component Props:
```javascript
const WorkspaceCard = ({
  icon,           // lucide-react component or string name
  iconBg,         // color code for background
  title,          // workspace title
  description     // workspace description
}) => {
```

---

## 5. Dashboard.jsx

**File:** `TaskMasterFrontend/src/components/Dashboard/Dashboard.jsx`

### Workspace Field Mapping:
Added `WORKSPACE_FIELD_MAP` constant to document backend schema alignment:
```javascript
const WORKSPACE_FIELD_MAP = {
  id: "id",
  icon: "icon",          // lucide-react icon name (e.g., "ROCKET", "MONITOR")
  iconBg: "iconBg",      // color code for background
  title: "title",        // workspace title
  description: "description"
};
```

### HandleCreateWorkspace Function:
Updated to accept all backend Workspace entity fields:
```javascript
const handleCreateWorkspace = ({ title, description, iconBg, icon }) => {
  const IconComponent = Rocket;
  
  setWorkspaces((currentWorkspaces) => [
    ...currentWorkspaces,
    {
      id: Date.now(),
      icon: IconComponent,
      iconBg,
      title,
      description: description || "A new TaskMaster workspace",
      progress: 0,
      progressColor: iconBg,
      tasks: 0,
      bugs: 0,
      updatedText: "Created just now",
    },
  ]);
};
```

### Dashboard State Props Passed to WorkspacePage:
```javascript
{ workspaceId, title, description, icon, iconBg }
```

---

## 6. Task Schema Alignment

### Backend Task Entity:
```java
@NotNull private Long workspaceId;
@NotBlank private String title;
@NotNull @Enumerated(EnumType.STRING) private TaskStatus status;   // TODO/IN_PROGRESS/DONE
@NotNull @Enumerated(EnumType.STRING) private TaskPriority priority; // HIGH/MEDIUM/LOW
@NotBlank private String due;
```

### Frontend Task State Structure:
```javascript
const [newTask, setNewTask] = useState({
  workspaceId: null,     // Long - Workspace ID reference
  title: "",             // String - not empty
  status: "Todo",        // String - TODO/IN_PROGRESS/DONE (display as Todo/In Progress/Done)
  priority: "High",      // String - HIGH/MEDIUM/LOW (display as High/Medium/Low)
  due: ""                // String - date or "No due date"
});
```

---

## Schema Alignment Summary Table

| Entity | Backend Field | Backend Type | Frontend Field | Frontend Type | Example Values |
|--------|---------------|--------------|----------------|---------------|----------------|
| **User** | id | Long | N/A (created on auth) | N/A | 1, 2, 3... |
| | username | String | username | text | "johndoe" |
| | password | String | password | password | "secret123" |
| **Workspace** | id | Long | id | read-only | 1, 2, 3... |
| | icon | String | icon | String/Component | "ROCKET", Rocket |
| | iconBg | String | iconBg | hex color | "#f4638a" |
| | title | String | title | text | "Product Launch" |
| | description | String | description | text | "Launch Q1 product" |
| | createdAt | LocalDateTime | N/A | N/A | 2024-01-15T10:30:00 |
| | updatedAt | LocalDateTime | N/A | N/A | 2024-01-15T10:30:00 |
| **Task** | id | Long | read-only | N/A | 1, 2, 3... |
| | workspaceId | Long | workspaceId | Long | 1, 2, 3... |
| | title | String | title | text | "Review PR" |
| | status | Enum | status | String (display) | TODO/TODO_IN_PROGRESS/DONE |
| | priority | Enum | priority | String (display) | HIGH/MEDIUM/LOW |
| | due | String | due | date string | "2024-01-20" |

---

## Next Steps (API Integration)

When integrating with backend APIs:

1. **Workspace API:**
   - POST `/api/workspaces` - Accept all Workspace entity fields
   - GET `/api/workspaces/:id` - Return all Workspace entity fields
   
2. **Task API:**
   - POST `/api/tasks` - Accept Task entity fields (workspaceId, title, status, priority, due)
   - GET `/api/tasks?workspaceId=:id` - Return tasks with full Task entity structure
   
3. **User/Auth API:**
   - POST `/api/auth/login` - Accept email/username and password
   - Response includes user data matching User entity structure

---

## Notes

1. **Enum Values:** Backend uses uppercase enum names (TODO, HIGH), frontend uses display-friendly versions (Todo, High). When sending to API, use backend enum values.

2. **Icon Handling:** Workspace icons are stored as lucide-react icon names (strings like "ROCKET"). Can be imported as components when rendering.

3. **Date Format:** Backend uses `LocalDateTime`. Frontend can format using:
   ```javascript
   new Date(workspace.createdAt).toLocaleDateString()
   ```

4. **Validation:** All @NotBlank and @NotNull fields should have required validation in frontend forms.

5. **Read-Only Fields:** Backend marks id, createdAt, updatedAt as READ_ONLY via `@JsonProperty(access = JsonProperty.Access.READ_ONLY)`. These are never sent to client on create/update.