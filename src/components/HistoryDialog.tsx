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
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useState } from "react";

const mockData: Record<string, Todo[]> = {
  "2023-10-01": [
    {
      id: "1",
      text: "Buy groceries",
      dueTime: "10:00 AM",
      priority: "High",
      completed: true,
    },
    {
      id: "2",
      text: "Walk the dog",
      dueTime: "5:00 PM",
      priority: "Medium",
      completed: false,
    },
  ],
  "2023-10-02": [
    {
      id: "3",
      text: "Read a book",
      dueTime: "8:00 PM",
      priority: "Low",
      completed: true,
    },
  ],
};

const HistoryDialog: FC = () => {
  const [history] = useState<Record<string, Todo[]>>(mockData);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const renderTodos = (todos: Todo[]) => {
    return todos.map((todo, index) => (
      <motion.div
        key={todo.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="p-4 border rounded-lg bg-foreground/10"
      >
        <p className="font-semibold">{`${index + 1}. ${todo.text}`}</p>
        <p>Due Time: {todo.dueTime || "No Time"}</p>
        <p>Priority: {todo.priority}</p>
        <p>Status: {todo.completed ? "Completed" : "Not Completed"}</p>
      </motion.div>
    ));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">History</Button>
      </DialogTrigger>
      <DialogContent className="min-h-[600px] min-w-[800px] max-w-[800px] rounded-lg flex flex-col">
        <DialogHeader>
          <DialogTitle>Todo History</DialogTitle>
          <DialogDescription>
            Click on a date to view your todos for that day.
          </DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {!selectedDate ? (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="grid grid-cols-3 gap-4 mt-6"
            >
              {Object.keys(history).map((date) => (
                <motion.div
                  key={date}
                  className="p-4 bg-foreground/10 rounded-lg flex flex-col items-center justify-center text-center shadow-md hover:bg-foreground/20 transition cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(date)}
                >
                  <h3 className="text-lg font-semibold select-none">
                    {format(new Date(date), "EEEE, dd MMMM yyyy")}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="details-view"
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              className="space-y-4 mt-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold select-none">
                  {format(new Date(selectedDate), "EEEE, dd MMMM yyyy")}
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
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {renderTodos(history[selectedDate])}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryDialog;
