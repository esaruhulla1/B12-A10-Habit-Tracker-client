import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './Layout/MainLayout.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import SingUp from './Pages/SingUp.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import PriveteRoute from './PriveteRoute.jsx';
import Habits from './Pages/Habits.jsx';
import AddHabit from './Pages/AddHabit.jsx';
import MyHabits from './Pages/MyHabits.jsx';
import UpdateHabit from './Pages/UpdateHabit.jsx';
import HabitDetails from './Pages/HabitDetails.jsx';
import ErrorPage from './Components/ErrorPage.jsx';
import Loading from './Components/Loading.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/habits',
        element: <Habits></Habits>
      },
      {
        path: '/add-habit',
        element: <PriveteRoute><AddHabit></AddHabit></PriveteRoute>
      },
      {
        path: '/my-habit',
        element: <PriveteRoute><MyHabits></MyHabits></PriveteRoute>
      },
      {
        path: '/update/:id',
        element: <PriveteRoute><UpdateHabit></UpdateHabit></PriveteRoute>
      },
      {
        path: '/habit-details/:id',
        element: <PriveteRoute><HabitDetails></HabitDetails></PriveteRoute>
      },
      {
        path: '/loading',
        element: <Loading></Loading>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SingUp></SingUp>
      },
    ]
  },
  {
    path: '*',
    element: <ErrorPage></ErrorPage>
  }
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
