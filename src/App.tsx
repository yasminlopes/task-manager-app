import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './core';
import { router } from './core/routes';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
