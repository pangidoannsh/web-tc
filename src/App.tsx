import './App.css'
import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoadingPage from './pages/LoadingPage';

const HomePage = lazy(() => import('./pages/Home'));
const ChatsPage = lazy(() => import('./pages/Chats'));
const LoginPage = lazy(() => import('./pages/Login'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    element: <HomePage />,
  },
  {
    path: "/chats",
    element: <ChatsPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
]);

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
