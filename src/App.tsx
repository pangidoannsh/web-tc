import './App.css'
import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoadingPage from './pages/LoadingPage';
import SessionProvider from './providers/SessionProvider';
import AuthRoutes from './lib/AuthRoutes';
import { ConfigProvider } from 'antd';
import { appThemeConfig } from './config/theme';
import NotifProvider from './providers/NotifProvider';

const DashboardPage = lazy(() => import('./pages/dashboard'));
const ChatsPage = lazy(() => import('./pages/Chats'));
const UsersPage = lazy(() => import('./pages/admin/Users'));
const GroupsPage = lazy(() => import('./pages/admin/Groups'));
const LoginPage = lazy(() => import('./pages/Login'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <AuthRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/groups",
        element: <GroupsPage />,
      },
      {
        path: "/chats",
        element: <ChatsPage />,
      },
    ]
  }
]);

function App() {
  return (
    <SessionProvider>
      <ConfigProvider theme={appThemeConfig}>
        <NotifProvider>
          <Suspense fallback={<LoadingPage />}>
            <RouterProvider router={router} />
          </Suspense>
        </NotifProvider>
      </ConfigProvider>
    </SessionProvider>
  )
}

export default App
