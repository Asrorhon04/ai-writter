import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './components/layout/dashboard-layout';
import DashboardHome from './pages/dashboar-home';
import { AppContextProvider } from './contexts/app.context';
import { Toaster } from 'react-hot-toast';
import { ContentContextProvider } from './contexts/content.context';
import DashboardContent from './pages/dashboard-content';
import ContentNotFound from './components/dashboard/content-not-found';
import Share from './pages/share';

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
			},
			{
				path:'content/:id',
				element:<DashboardContent />,
				errorElement: <ContentNotFound />
			}
		]
  },
	{
		path:'share/:id',
		element: <Share />,
		errorElement: <ContentNotFound />
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
		<Toaster/>
		<AppContextProvider>
			<ContentContextProvider>
				<RouterProvider router={router} />
			</ContentContextProvider>
		</AppContextProvider>
  </React.StrictMode>,
)
