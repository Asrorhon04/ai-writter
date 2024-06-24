import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './components/layout/dashboard-layout';
import DashboardHome from './pages/dashboar-home';
import { AppContextProvider } from './contexts/app.context';

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1 className='text-5xl'>Hello world!</h1>,
  },
  {
    path: "login",
    element: <h1 className='text-5xl'>Login</h1>,
  },
  {
    path: "register",
    element: <h1 className='text-5xl'>Register</h1>,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
		children:[
			{
				index:true,
				element:<DashboardHome />
			}
		]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
		<AppContextProvider>
			<RouterProvider router={router} />
		</AppContextProvider>
  </React.StrictMode>,
)
