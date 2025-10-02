import { apiClient } from '../../core/interceptors/axios';
import type { 
  Task, 
  CreateTaskRequest, 
  UpdateTaskRequest, 
  TaskResponse, 
  TaskListResponse 
} from '../types/task';

class TaskService {
  private basePath = '/tasks';

  async getTasks(): Promise<Task[]> {
    const response = await apiClient.get<TaskListResponse>(this.basePath);
    return response.data;
  }

  async getTask(id: string): Promise<Task> {
    const response = await apiClient.get<TaskResponse>(`${this.basePath}/${id}`);
    return response.data;
  }

  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    const response = await apiClient.post<TaskResponse>(this.basePath, taskData);
    return response.data;
  }

  async updateTask(id: string, taskData: UpdateTaskRequest): Promise<Task> {
    const response = await apiClient.put<TaskResponse>(`${this.basePath}/${id}`, taskData);
    return response.data;
  }

  async toggleTask(id: string): Promise<Task> {
    const response = await apiClient.patch<TaskResponse>(`${this.basePath}/${id}/complete`);
    return response.data;
  }

  async deleteTask(id: string): Promise<void> {
    await apiClient.delete<{ message: string }>(`${this.basePath}/${id}`);
  }

}

export const taskService = new TaskService();