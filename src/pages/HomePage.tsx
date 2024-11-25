import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Todo } from "@/types";
import { Check, Pen, Trash, XCircle } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const HomePage: FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const [todos, setTodos] = useState<Record<string, Todo[]>>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : {};
  });
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    const updatedTodos = {
      ...todos,
      [today]: [
        ...(todos[today] || []),
        { id: uuidv4(), text: newTodo.trim(), completed: false },
      ],
    };
    setTodos(updatedTodos);
    setNewTodo("");
  };

  const handleEditTodo = (id: string) => {
    const todo = todos[today]?.find((t) => t.id === id);
    if (todo) {
      setEditingTodo(id);
      setEditingText(todo.text);
    }
  };

  const handleSaveEdit = () => {
    if (!editingText.trim() || !editingTodo) return;
    const updatedTodos = {
      ...todos,
      [today]: todos[today].map((todo) =>
        todo.id === editingTodo ? { ...todo, text: editingText } : todo
      ),
    };
    setTodos(updatedTodos);
    setEditingTodo(null);
    setEditingText("");
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = {
      ...todos,
      [today]: todos[today].map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (editingTodo) {
        handleSaveEdit();
      } else {
        handleAddTodo();
      }
    }
  };

  return (
    <div className="h-screen w-screen px-8 flex flex-col items-center justify-start py-4">
      <h1 className="text-4xl font-bold mb-10">🌟 Today's Todos</h1>
      <div className="w-full max-w-4xl space-y-6">
        {/* Todo Input */}
        <div className="flex w-full items-center space-x-4">
          <input
            type="text"
            className="w-full p-2 border-b text-6xl bg-transparent outline-none"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            size="mega"
            onClick={handleAddTodo}
            disabled={!newTodo.trim()}
          >
            Add
          </Button>
        </div>

        {/* Todo Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">#</TableHead>
              <TableHead>Task</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos[today]?.map((todo, index) => (
              <TableRow key={todo.id}>
                <TableCell className="text-left">{index + 1}</TableCell>
                <TableCell>
                  {editingTodo === todo.id ? (
                    <input
                      type="text"
                      className="w-full p-1 border-b bg-transparent outline-none"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoFocus
                    />
                  ) : (
                    <span
                      className={
                        todo.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }
                    >
                      {todo.text}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      todo.completed
                        ? "bg-green-100 text-green-600"
                        : "bg-muted"
                    }`}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </span>
                </TableCell>
                <TableCell className="text-center space-x-2">
                  {/* Toggle Complete Button */}
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

                  {editingTodo === todo.id ? (
                    <>
                      {/* Save Button */}
                      <Button onClick={handleSaveEdit}>Save</Button>
                    </>
                  ) : (
                    <>
                      {/* Edit Button */}
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEditTodo(todo.id)}
                      >
                        <Pen className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  {/* Delete Button */}

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => removeTodo(todo.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
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
