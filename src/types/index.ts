export type Todo = {
  id: string; // Unique identifier for the todo
  text: string; // Text of the todo
  completed: boolean; // Completion status
  dueTime?: string; // Optional due time in HH:mm format
  priority?: "High" | "Medium" | "Low"; // Priority level
  completionTimestamp?: string; // Timestamp of when the todo was completed
};
