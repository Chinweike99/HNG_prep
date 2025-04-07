
"use client"

export interface ToDoItem {
    id: string;
    title: string;
    completed: boolean;
    subtasks?: ToDoItem[];
}


export const todoList: ToDoItem[] = [
    {
        id: "1",
        title: "Build a todo",
        completed: false,
        subtasks: [
            {
              id: '1-1',
              title: 'Design UI',
              completed: true,
            },
            {
              id: '1-2',
              title: 'Implement state management',
              completed: false,
              subtasks: [
                {
                  id: '1-2-1',
                  title: 'Create types',
                  completed: true,
                },
              ],
            },
            {
                id: '1-3',
                title: 'Complete Course',
                completed: false,
                subtasks: [
                    {
                        id: '1-3-1',
                        title: 'Introduction to Block-Chain',
                        completed: true
                    },
                    {
                        id: '1-3-2',
                        title: 'Authentication',
                        completed: false
                    }
                ]
            }
          ],
    },
    {
        id: "1",
        title: "Build MetaMask",
        completed: false,
        subtasks: [
            {
              id: '1-1',
              title: 'Design UI',
              completed: true,
            },
            {
              id: '1-2',
              title: 'Implement state management',
              completed: false,
              subtasks: [
                {
                  id: '1-2-1',
                  title: 'Create types',
                  completed: true,
                },
              ],
            },
            {
                id: '1-3',
                title: 'Complete Course',
                completed: false,
                subtasks: [
                    {
                        id: '1-3-1',
                        title: 'Introduction to Block-Chain',
                        completed: true
                    },
                    {
                        id: '1-3-2',
                        title: 'Authentication',
                        completed: false
                    }
                ]
            }
          ],
    },
]



//Component implementation
import React, {useState} from 'react';

const ToDoItemComponent: React.FC<{
    item: ToDoItem;
    onToggle: (id: string) => void;
    depth?: number;
}> = ({item, onToggle, depth = 0}) => {
  const [expanded, setExpanded] = useState(false);
  const hasSubtasks = item.subtasks && item.subtasks.length > 0;

  return (
      <div 
        className={`border-l-2 pl-4 ${depth > 0 ? 'ml-4' : ''}`}
        style={{ borderLeftColor: `hsl(${depth * 60}, 70%, 70%)` }}
      >
        <div className="flex items-center gap-2 py-2">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggle(item.id)}
            className="h-4 w-4 rounded"
          />
          <span 
            className={`flex-1 ${item.completed ? 'line-through text-red-500' : 'text-gray-800'}`}
          >
            {item.title}
          </span>
          {hasSubtasks && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {expanded ? '▲' : '▼'}
            </button>
          )}
        </div>
        {expanded && hasSubtasks && (
          <div className="space-y-2">
            {item.subtasks?.map((subtask) => (
              <ToDoItemComponent
                key={subtask.id}
                item={subtask}
                onToggle={onToggle}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
}




const ToDoList: React.FC = () => {
  const [todo, setTodo] = useState<ToDoItem[]>(todoList);

  const toggleTodo = (id: string) => {
    const updateTodos = (items: ToDoItem[]): ToDoItem[] => {
      return items.map(item => {
        if(item.id === id){
          return { ...item, completed: !item.completed}
        }
        if(item.subtasks){
          return {...item, subtasks: updateTodos(item.subtasks)}
        }
        return item
      });
    };
    setTodo(updateTodos(todo))
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Nested To-Do List</h1>
      <div className="space-y-2">
        {todo.map((i) => (
          <ToDoItemComponent
            key={i.id}
            item={i}
            onToggle={toggleTodo}
          />
        ))}
      </div>
    </div>
  )

}
export default ToDoList
