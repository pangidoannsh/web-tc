import './App.css'
import { lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const HomePage = lazy(() => import('./pages/HomePage'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
