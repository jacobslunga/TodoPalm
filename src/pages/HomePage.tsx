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
import { Check, Clock, Trash, XCircle } from "lucide-react";
import { FC, useEffect, useState } from "react";
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
  };

  const validateTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0);
    setIsValidTime(selectedTime > new Date());
  };

  const filteredTodos = todos[today]?.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Completed") return todo.completed;
    if (filter === "Pending") return !todo.completed;
  });

  return (
    <div className="h-screen w-screen px-8 flex flex-col items-center justify-start py-4">
      <div className="w-full max-w-4xl space-y-6 mt-10">
        {/* Todo Input */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="w-full p-2 border-b text-6xl bg-transparent outline-none placeholder-foreground/40"
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <Button
              size="mega"
              onClick={handleAddTodo}
              disabled={!newTodo.trim() || !isValidTime}
            >
              Add
            </Button>
          </div>
          <div className="flex space-x-4">
            {/* Time Picker */}
            <Popover open={timePickerOpen} onOpenChange={setTimePickerOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline">
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
              <SelectTrigger className="w-[180px]">
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

        {/* Filter Buttons */}
        <div className="flex space-x-4 mb-4">
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

        {/* Todo Table */}
        <Table>
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
            {filteredTodos?.map((todo, index) => (
              <TableRow
                key={todo.id}
                className={
                  todo.dueTime &&
                  new Date(`${today}T${todo.dueTime}`) < new Date() &&
                  !todo.completed
                    ? "bg-red-100"
                    : ""
                }
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{todo.text}</TableCell>
                <TableCell>{todo.dueTime || "No Time"}</TableCell>
                <TableCell
                  className={`${
                    todo.priority === "High"
                      ? "text-red-600"
                      : todo.priority === "Medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {todo.priority}
                </TableCell>
                <TableCell>
                  {todo.completed ? (
                    <div>
                      <div>Completed</div>
                      <div className="text-sm text-muted-foreground">
                        {todo.completionTimestamp
                          ? new Date(todo.completionTimestamp).toLocaleString()
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HomePage;
