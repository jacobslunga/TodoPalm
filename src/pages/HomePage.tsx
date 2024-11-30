import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Todo } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Sliders, Trash, XCircle } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const HomePage: FC = () => {
  const today = new Date().toISOString().split("T")[0];

  const [todos, setTodos] = useState<Record<string, Todo[]>>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : {};
  });
  const [newTodo, setNewTodo] = useState<string>("");
  const [dueTime, setDueTime] = useState<string>("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [filter, setFilter] = useState<"All" | "Completed" | "Pending">("All");
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [isValidTime, setIsValidTime] = useState(true);
  const [sortCriteria, setSortCriteria] = useState<"priority" | "dueTime">(
    "priority"
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (!newTodo.trim() || !isValidTime) return;

    const updatedTodos = {
      ...todos,
      [today]: [
        ...(todos[today] || []),
        {
          id: uuidv4(),
          text: newTodo.trim(),
          completed: false,
          dueTime: dueTime || null,
          priority,
        },
      ],
    };

    setTodos(updatedTodos as Record<string, Todo[]>);
    toast.success("Todo added successfully!");
    setNewTodo("");
    setDueTime("");
    setPriority("Medium");
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = {
      ...todos,
      [today]: todos[today].map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completionTimestamp: !todo.completed
                ? new Date().toISOString()
                : undefined,
            }
          : todo
      ),
    };
    setTodos(updatedTodos);
  };

  const removeTodo = (id: string) => {
    const updatedTodos = {
      ...todos,
      [today]: todos[today].filter((todo) => todo.id !== id),
    };
    setTodos(updatedTodos);
    toast.error("Todo removed.");
  };

  const validateTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);
    setIsValidTime(selectedTime > new Date());
  };

  const filteredTodos =
    todos[today]
      ?.filter((todo) => {
        if (filter === "All") return true;
        if (filter === "Completed") return todo.completed;
        if (filter === "Pending") return !todo.completed;
      })
      ?.sort((a, b) => {
        if (sortCriteria === "priority") {
          const priorityOrder: Record<"High" | "Medium" | "Low", number> = {
            High: 1,
            Medium: 2,
            Low: 3,
          };

          const priorityA = priorityOrder[a.priority || "Medium"];
          const priorityB = priorityOrder[b.priority || "Medium"];

          if (priorityA !== priorityB) return priorityA - priorityB;
        }

        if (sortCriteria === "dueTime") {
          if (a.dueTime && b.dueTime) {
            return a.dueTime.localeCompare(b.dueTime);
          }

          if (a.dueTime) return -1;
          if (b.dueTime) return 1;
        }

        return 0;
      }) || [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="min-h-screen overflow-auto w-screen px-4 md:px-8 flex flex-col items-center py-4 overflow-x-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="md:w-5/6 lg:w-2/3 space-y-6 mt-20">
        {/* Todo Input */}
        <div className="flex flex-col md:space-y-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              className="w-full p-2 text-2xl md:text-4xl lg:text-6xl bg-transparent outline-none placeholder-foreground/40"
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              size="mega"
              onClick={handleAddTodo}
              disabled={!newTodo.trim() || !isValidTime}
              className="w-full md:w-auto"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Time Picker */}
            <Popover open={timePickerOpen} onOpenChange={setTimePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="font-normal w-full md:w-auto"
                >
                  {dueTime ? dueTime : "Select Time"}
                  <Clock className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Input
                  type="time"
                  value={dueTime}
                  onChange={(e) => {
                    setDueTime(e.target.value);
                    validateTime(e.target.value);
                  }}
                  className={!isValidTime ? "border-red-500" : ""}
                />
                {!isValidTime && (
                  <p className="text-red-500 text-sm mt-1">
                    Please select a future time.
                  </p>
                )}
              </PopoverContent>
            </Popover>

            {/* Priority Selector */}
            <Select
              value={priority}
              onValueChange={(value) => setPriority(value as any)}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High Priority</SelectItem>
                <SelectItem value="Medium">Medium Priority</SelectItem>
                <SelectItem value="Low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Filter & Sort Buttons */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "All" ? "default" : "outline"}
              onClick={() => setFilter("All")}
            >
              All
            </Button>
            <Button
              variant={filter === "Pending" ? "default" : "outline"}
              onClick={() => setFilter("Pending")}
            >
              Pending
            </Button>
            <Button
              variant={filter === "Completed" ? "default" : "outline"}
              onClick={() => setFilter("Completed")}
            >
              Completed
            </Button>
          </div>
          <Select
            value={sortCriteria}
            onValueChange={(value) => setSortCriteria(value as any)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
              <Sliders className="ml-2 h-4 w-4" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priority">Sort by Priority</SelectItem>
              <SelectItem value="dueTime">Sort by Due Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Todo Table */}
        <div className="overflow-auto">
          <Table className="rounded-lg bg-foreground/5 p-5 mb-20 w-full">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Due Time</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredTodos.map((todo, index) => (
                  <motion.tr
                    key={todo.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={
                      todo.dueTime &&
                      new Date(`${today}T${todo.dueTime}`) < new Date() &&
                      !todo.completed
                        ? "bg-red-100 dark:bg-red-950/50"
                        : ""
                    }
                  >
                    <TableCell className="text-sm">{index + 1}</TableCell>
                    <TableCell className="text-sm">{todo.text}</TableCell>
                    <TableCell className="text-sm">
                      {todo.dueTime || "No Time"}
                    </TableCell>
                    <TableCell
                      className={`text-sm ${
                        todo.priority === "High"
                          ? "text-red-600"
                          : todo.priority === "Medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {todo.priority}
                    </TableCell>
                    <TableCell className="text-sm">
                      {todo.completed ? (
                        <div>
                          <div>Completed</div>
                          <div className="text-xs text-muted-foreground">
                            {todo.completionTimestamp
                              ? new Date(
                                  todo.completionTimestamp
                                ).toLocaleString()
                              : "No Time"}
                          </div>
                        </div>
                      ) : (
                        "Not Completed"
                      )}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild className="z-50">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => toggleTodo(todo.id)}
                            >
                              {todo.completed ? (
                                <XCircle className="w-4 h-4 text-red-600" />
                              ) : (
                                <Check className="w-4 h-4 text-green-600" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent autoFocus={false}>
                            {todo.completed
                              ? "Mark as Not Completed"
                              : "Mark as Completed"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild className="z-50">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => removeTodo(todo.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent autoFocus={false}>
                            Remove Todo
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
