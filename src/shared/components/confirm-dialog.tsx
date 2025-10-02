import { Dialog, Button, AlertTriangleIcon, XIcon, TrashIcon } from '../../shared/components';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar ação',
  message = 'Tem certeza que deseja continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
  isLoading = false,
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return <AlertTriangleIcon size={24} className="text-red-500" />;
      case 'warning':
        return <AlertTriangleIcon size={24} className="text-yellow-500" />;
      case 'info':
        return <AlertTriangleIcon size={24} className="text-blue-500" />;
      default:
        return <AlertTriangleIcon size={24} className="text-red-500" />;
    }
  };

  const getConfirmVariant = () => {
    switch (variant) {
      case 'danger':
        return 'danger' as const;
      case 'warning':
        return 'primary' as const;
      case 'info':
        return 'primary' as const;
      default:
        return 'danger' as const;
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="sm:max-w-md"
    >
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-4">
          {getIcon()}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-6">
          {message}
        </p>
        
        <div className="flex space-x-3 justify-center">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
            leftIcon={<XIcon size={16} />}
          >
            {cancelText}
          </Button>
          
          <Button
            variant={getConfirmVariant()}
            onClick={handleConfirm}
            disabled={isLoading}
            isLoading={isLoading}
            leftIcon={variant === 'danger' ? <TrashIcon size={16} /> : undefined}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}