import EmptyState from '../../shared/components/empty';
import { Button, EditIcon, TrashIcon } from '../../shared/components';
import type { Task } from '../../shared/types/task';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string) => void;
}

export function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskListProps) {
  if (!tasks?.length) {
    return (
      <EmptyState
        title="ops, lista vazia!"
        message="nenhuma tarefa por enquanto... que tal criar a primeira?"
      />
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${
            task.completed ? 'opacity-75' : ''
          }`}
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <button
                  onClick={() => onToggleComplete?.(task.id)}
                  className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                    task.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  {task.completed && (
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-medium ${
                      task.completed
                        ? 'text-gray-500 line-through'
                        : 'text-gray-900'
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      task.completed ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {task.description}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    Criado em{' '}
                    {new Date(task.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {onEdit && (
                  <Button
                    onClick={() => onEdit(task.id)}
                    variant="ghost"
                    size="sm"
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Editar tarefa"
                  >
                    <EditIcon size={16} />
                  </Button>
                )}

                {onDelete && (
                  <Button
                    onClick={() => onDelete(task.id)}
                    variant="ghost"
                    size="sm"
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                    title="Excluir tarefa"
                  >
                    <TrashIcon size={16} />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div
            className={`h-1 ${task.completed ? 'bg-green-500' : 'bg-gray-200'}`}
          />
        </div>
      ))}
    </div>
  );
}
