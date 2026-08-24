import { Rocket, Monitor, Megaphone, Wrench } from "lucide-react";

export const initialWorkspaces = [
  { id: 1, icon: Rocket, iconBg: "#f4638a", title: "Mobile App Launch", description: "Revamping and launching our mobile application", progress: 72, progressColor: "#f4638a", tasks: 24, bugs: 3, members: 8, updatedText: "Updated 2h ago" },
  { id: 2, icon: Monitor, iconBg: "#4d8dfa", title: "Website Redesign", description: "Redesigning company website for better UX", progress: 48, progressColor: "#4d8dfa", tasks: 18, bugs: 5, members: 6, updatedText: "Updated 5h ago" },
  { id: 3, icon: Megaphone, iconBg: "#8a6bf5", title: "Marketing Campaign", description: "Q2 marketing campaign planning and execution", progress: 33, progressColor: "#8a6bf5", tasks: 12, bugs: 2, members: 4, updatedText: "Updated 1d ago" },
  { id: 4, icon: Wrench, iconBg: "#34c98f", title: "Internal Tools", description: "Building internal tools to improve productivity", progress: 65, progressColor: "#34c98f", tasks: 16, bugs: 4, members: 5, updatedText: "Updated 3h ago" },
];

export const tasks = [
  { id: 1, title: "Finalize onboarding flow", workspace: "Mobile App Launch", assignee: "Rahul Sharma", status: "In Progress", priority: "High", due: "Today", color: "#f4638a" },
  { id: 2, title: "Fix login API validation", workspace: "Mobile App Launch", assignee: "Priya Singh", status: "Todo", priority: "High", due: "Aug 26", color: "#f4638a" },
  { id: 3, title: "Design landing page", workspace: "Website Redesign", assignee: "Aman Verma", status: "Done", priority: "Medium", due: "Aug 24", color: "#4d8dfa" },
  { id: 4, title: "Review responsive breakpoints", workspace: "Website Redesign", assignee: "Sneha P.", status: "In Progress", priority: "Medium", due: "Aug 28", color: "#4d8dfa" },
  { id: 5, title: "Plan Q2 social calendar", workspace: "Marketing Campaign", assignee: "Debanik P.", status: "Todo", priority: "Low", due: "Sep 02", color: "#8a6bf5" },
  { id: 6, title: "Create analytics dashboard", workspace: "Internal Tools", assignee: "Rahul Sharma", status: "Done", priority: "High", due: "Aug 23", color: "#34c98f" },
];
