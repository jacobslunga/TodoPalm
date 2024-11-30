import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Todo } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import moment from "moment";
import { FC, useEffect, useState } from "react";

const DAYS_IN_MONTH = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

const HistoryDialog: FC = () => {
  const [history, setHistory] = useState<Record<string, Todo[]>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [direction, setDirection] = useState<"prev" | "next">("next");

  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setHistory(JSON.parse(savedTodos));
    }
  }, []);

  const toggleTodo = (id: string) => {
    const updatedHistory = { ...history };
    const date = selectedDate as string;
    updatedHistory[date] = updatedHistory[date].map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setHistory(updatedHistory);
    localStorage.setItem("todos", JSON.stringify(updatedHistory));
  };

  const removeTodo = (id: string) => {
    const updatedHistory = { ...history };
    const date = selectedDate as string;
    updatedHistory[date] = updatedHistory[date].filter(
      (todo) => todo.id !== id
    );
    setHistory(updatedHistory);
    localStorage.setItem("todos", JSON.stringify(updatedHistory));
  };

  const renderTodos = (todos: Todo[]) => {
    return todos.map((todo, index) => (
      <motion.div
        key={todo.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`p-4 border rounded-lg bg-foreground/5 relative shadow-sm hover:shadow-md transition-shadow ${
          todo.dueTime &&
          new Date(`${moment().format("YYYY-MM-DD")}T${todo.dueTime}`) <
            new Date() &&
          !todo.completed
            ? "border-red-500"
            : "border-foreground/10"
        }`}
      >
        {/* Task Header */}
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{`${index + 1}. ${
            todo.text
          }`}</h3>
          <div
            className={`text-xs font-medium rounded-md px-2 py-1 ${
              todo.priority === "High"
                ? "bg-red-100 text-red-600"
                : todo.priority === "Medium"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {todo.priority} Priority
          </div>
        </div>

        {/* Task Details */}
        <div className="mt-2 space-y-1">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm">
              Due:{" "}
              {todo.dueTime ? (
                <span
                  className={`font-medium ${
                    todo.dueTime &&
                    new Date(
                      `${moment().format("YYYY-MM-DD")}T${todo.dueTime}`
                    ) < new Date() &&
                    !todo.completed
                      ? "text-red-500"
                      : "text-foreground"
                  }`}
                >
                  {todo.dueTime}
                </span>
              ) : (
                "No Time"
              )}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <p
              className={`text-xs font-medium rounded-md px-2 py-1 ${
                todo.completed ? "text-green-600" : "text-gray-500"
              }`}
            >
              {todo.completed ? "Completed" : "Pending"}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-3 flex justify-end space-x-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.completed ? "Mark Pending" : "Mark Completed"}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => removeTodo(todo.id)}>
            Remove
          </Button>
        </div>
      </motion.div>
    ));
  };

  const handleMonthChange = (newDirection: "prev" | "next") => {
    setDirection(newDirection);
    setCurrentMonth((prev) =>
      newDirection === "prev"
        ? prev.clone().subtract(1, "month")
        : prev.clone().add(1, "month")
    );
  };

  const daysInCurrentMonth =
    DAYS_IN_MONTH[currentMonth.format("MMMM") as keyof typeof DAYS_IN_MONTH];

  const calendarDays: string[] = [];
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    calendarDays.push(currentMonth.clone().date(day).format("YYYY-MM-DD"));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">History</Button>
      </DialogTrigger>
      <DialogContent className="min-h-[500px] transition-all duration-200 w-full max-w-[95%] sm:max-w-[800px] max-h-[95%] overflow-auto rounded-lg flex flex-col">
        <DialogHeader>
          <DialogTitle>Todo History</DialogTitle>
          <DialogDescription>
            Click on a date to view your todos for that day.
          </DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {!selectedDate ? (
            <>
              {/* Month Navigation */}
              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleMonthChange("prev")}
                  disabled={currentMonth.diff(moment(), "months") <= -6}
                >
                  <ChevronLeft />
                </Button>
                <h3 className="text-lg font-semibold select-none text-center">
                  {currentMonth.format("MMMM YYYY")}
                </h3>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleMonthChange("next")}
                  disabled={currentMonth.diff(moment(), "months") >= 6}
                >
                  <ChevronRight />
                </Button>
              </div>

              {/* Calendar Grid */}
              <motion.div
                key={currentMonth.format("MMMM YYYY")}
                initial={{
                  opacity: 0,
                  x: direction === "next" ? 200 : -200,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: direction === "next" ? -200 : 200,
                  filter: "blur(10px)",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-6"
              >
                {calendarDays.map((day, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 ${
                      history[day]
                        ? "bg-green-100 dark:bg-green-950/50"
                        : "bg-foreground/5"
                    } rounded-lg relative flex flex-col hover:opacity-90 transition-opacity items-center justify-center text-center shadow-sm ${
                      day ? "transition cursor-pointer" : ""
                    }`}
                    whileHover={{ scale: history[day] ? 1.05 : 1 }}
                    whileTap={{ scale: history[day] ? 0.95 : 1 }}
                    onClick={() => history[day] && setSelectedDate(day)}
                  >
                    <h3 className="text-md sm:text-lg font-semibold select-none">
                      {day === today ? "Today" : moment(day).format("D")}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground select-none">
                      {moment(day).format("ddd")}
                    </p>
                    {history[day] && (
                      <div className="bg-green-500 rounded-full w-2 h-2 sm:w-3 sm:h-3 absolute top-[-5px] left-[-5px]" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <motion.div
              key="details-view"
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              className="space-y-4 mt-6"
            >
              {/* Selected Date Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold select-none">
                  {moment(selectedDate).format("dddd, DD MMMM YYYY")}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedDate(null);
                  }}
                >
                  Back to Grid
                </Button>
              </motion.div>

              {/* Todos Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {renderTodos(history[selectedDate] || [])}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryDialog;
