interface Props {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = 'Nenhum dado encontrado',
  message,
}: Props) {
  return (
    <div className="text-center py-12 bg-white/50 rounded-lg border border-gray-200 border-dashed">
      <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
