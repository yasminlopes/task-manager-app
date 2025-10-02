import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/task';
import type { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/task';

interface UseTasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export function useTasks() {
  const [state, setState] = useState<UseTasksState>({
    tasks: [],
    loading: false,
    error: null,
  });

  const loadTasks = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const tasks = await taskService.getTasks();
      setState({ tasks, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar tarefas';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
    }
  }, []);

  const createTask = useCallback(async (taskData: CreateTaskRequest) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setState(prev => ({
        ...prev,
        tasks: [newTask, ...prev.tasks],
        error: null
      }));
      return newTask;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar tarefa';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, []);

  const updateTask = useCallback(async (id: string, taskData: UpdateTaskRequest) => {
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.map(task => 
          task.id === id ? updatedTask : task
        ),
        error: null
      }));
      return updatedTask;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar tarefa';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, []);

  const toggleTask = useCallback(async (id: string) => {
    try {
      const currentTask = state.tasks.find(task => task.id === id);
      if (!currentTask) return;

      const updatedTask = await taskService.toggleTask(id);
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.map(task => 
          task.id === id ? updatedTask : task
        ),
        error: null
      }));
      return updatedTask;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao alterar status da tarefa';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, [state.tasks]);

  const deleteTask = useCallback(async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.filter(task => task.id !== id),
        error: null
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao excluir tarefa';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    ...state,
    loadTasks,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
    // Computed values
    completedTasks: state.tasks.filter(task => task.completed),
    pendingTasks: state.tasks.filter(task => !task.completed),
  };
}