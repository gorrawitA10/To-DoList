import { Task } from "../model/TaskModel";

export function saveTasksToLocalStorage(tasks: Task[]): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function getTasksFromLocalStorage(): Task[] {
  const tasksFromLocalStorage = localStorage.getItem("tasks");
  return tasksFromLocalStorage ? JSON.parse(tasksFromLocalStorage) : [];
}
