import TaskList from "@/components/dashboard/tasks/TaskList";
import TaskForm from "@/components/dashboard/tasks/TaskForm";
import TaskCalendar from "@/components/dashboard/tasks/TaskCalendar";
import { ToastContainer } from "react-toastify";

export default function TasksPage() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
      <h1 className="text-3xl font-bold text-moss-shadow">Task Scheduler</h1>

      <TaskForm />
      <TaskList />
      <TaskCalendar />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
