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
import TestPage from './Test';

const DashboardPage = lazy(() => import('./pages/dashboard'));
const ChatsPage = lazy(() => import('./pages/Chats'));
const UsersPage = lazy(() => import('./pages/admin/Users'));
const GroupsPage = lazy(() => import('./pages/admin/Groups'));
const GroupTasksPage = lazy(() => import('./pages/admin/GroupTasks'));
const TasksPage = lazy(() => import('./pages/admin/Tasks'));
const TicketsPage = lazy(() => import('./pages/admin/Tickets'));
const SystemSettingsPage = lazy(() => import('./pages/admin/SystemSettings'));
const LoginPage = lazy(() => import('./pages/Login'));
const ProfilePage = lazy(() => import('./pages/Profile'));

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
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "system-settings",
        element: <SystemSettingsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "groups",
        children: [
          {
            path: "",
            element: <GroupsPage />,
          },
          {
            path: ":id/tasks",
            element: <GroupTasksPage />,
          }
        ]
      },
      {
        path: "/chats",
        element: <ChatsPage />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
      },
      {
        path: "/tickets",
        element: <TicketsPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ]
  },
  {
    path: "/test",
    element: <TestPage />
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
