import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, Navbar } from '../../core';
import { useTasks } from '../../shared/hooks';
import { Button, PlusIcon, AlertTriangleIcon, LoaderIcon, ConfirmDialog } from '../../shared/components';
import { TaskForm, type TaskFormData } from './task-form';
import { TaskList } from './task-list';

export function TaskPage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTask, setEditingTask] = useState<{ id: string; title: string; description: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; taskId: string | null; isDeleting: boolean }>({
    isOpen: false,
    taskId: null,
    isDeleting: false
  });
  
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
    completedTasks,
  } = useTasks();

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  const handleCreateTask = async (data: TaskFormData) => {
    setIsSubmitting(true);
    
    try {
      if (editingTask) {
        await updateTask(editingTask.id, {
          title: data.title,
          description: data.description,
        });
      } else {
        await createTask({
          title: data.title,
          description: data.description,
        });
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    try {
      await toggleTask(taskId);
    } catch (error) {
      console.error('Erro ao alterar status da tarefa:', error);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setDeleteConfirm({
      isOpen: true,
      taskId: taskId,
      isDeleting: false
    });
  };

  const confirmDeleteTask = async () => {
    if (!deleteConfirm.taskId) return;
    
    setDeleteConfirm(prev => ({ ...prev, isDeleting: true }));
    
    try {
      await deleteTask(deleteConfirm.taskId);
      setDeleteConfirm({ isOpen: false, taskId: null, isDeleting: false });
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      setDeleteConfirm(prev => ({ ...prev, isDeleting: false }));
    }
  };

  const cancelDeleteTask = () => {
    setDeleteConfirm({ isOpen: false, taskId: null, isDeleting: false });
  };

  const handleEditTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTask({
        id: task.id,
        title: task.title,
        description: task.description
      });
      setIsModalOpen(true);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSignOut={handleSignOut} />

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header com estatísticas */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                minhas tarefas
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {loading ? 'carregando...' : tasks.length === 0 ? 'nenhuma tarefa ainda' : `${tasks.length} tarefa${tasks.length > 1 ? 's' : ''}`}
                {!loading && completedTasks.length > 0 && ` • ${completedTasks.length} concluída${completedTasks.length > 1 ? 's' : ''}`}
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingTask(null);
                setIsModalOpen(true);
              }}
              disabled={loading}
              variant="primary"
              size="md"
              leftIcon={<PlusIcon size={16} />}
            >
              nova tarefa
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangleIcon size={20} className="text-red-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    ops! algo deu errado
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                  
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-16">
              <LoaderIcon size={64} className="mx-auto text-blue-500" />
              <p className="mt-4 text-gray-600">carregando tarefas...</p>
            </div>
          )}

          {!loading && (
            <div>
              <TaskList
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            </div>
          )}
        </div>
      </main>

      {/* Modal de Criação/Edição de Tarefa */}
      <TaskForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleCreateTask}
        isSubmitting={isSubmitting}
        initialTask={editingTask ? {
          title: editingTask.title,
          description: editingTask.description
        } : undefined}
        isEditMode={!!editingTask}
      />

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={cancelDeleteTask}
        onConfirm={confirmDeleteTask}
        title="Excluir Tarefa"
        message="Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        isLoading={deleteConfirm.isDeleting}
      />
    </div>
  );
}