import { useState, useEffect } from 'react';
import { Dialog, Button, FileTextIcon, MessageSquareIcon, XIcon, SaveIcon, PlusIcon } from '../../shared/components';

interface TaskFormData {
  title: string;
  description: string;
}

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  isSubmitting?: boolean;
  initialTask?: TaskFormData;
  isEditMode?: boolean;
}

export function TaskForm({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isSubmitting = false, 
  initialTask,
  isEditMode = false 
}: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialTask?.title || '',
    description: initialTask?.description || '',
  });
  const [errors, setErrors] = useState<Partial<TaskFormData>>({});

  useEffect(() => {
    setFormData({
      title: initialTask?.title || '',
      description: initialTask?.description || '',
    });
    setErrors({});
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    const newErrors: Partial<TaskFormData> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
    
    setFormData({ title: '', description: '' });
  };

  const handleClose = () => {
    setFormData({ title: '', description: '' });
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? 'editar tarefa' : 'nova tarefa'}
      className="sm:max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <FileTextIcon size={16} className="text-gray-500" />
            <span>título</span>
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white transition-all duration-200"
            placeholder="ex: organizar a mesa de trabalho"
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="flex items-center space-x-1 text-sm text-red-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{errors.title}</span>
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <MessageSquareIcon size={16} className="text-gray-500" />
            <span>descrição</span>
          </label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white transition-all duration-200 resize-none"
            placeholder="ex: tá uma bagunça, precisa de uma geral"
            disabled={isSubmitting}
          />
          {errors.description && (
            <p className="flex items-center space-x-1 text-sm text-red-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{errors.description}</span>
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
            leftIcon={<XIcon size={16} />}
          >
            cancelar
          </Button>
          
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            leftIcon={isSubmitting ? undefined : (isEditMode ? <SaveIcon size={16} /> : <PlusIcon size={16} />)}
          >
            {isSubmitting ? 'salvando...' : (isEditMode ? 'salvar' : 'criar')}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

export type { TaskFormData };