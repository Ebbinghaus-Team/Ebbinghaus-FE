import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <h1 className="text-3xl font-bold text-white">Ebbinghaus FE</h1>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
