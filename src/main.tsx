import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './components/layout/dashboard-layout';
import DashboardHome from './pages/dashboar-home';
import { AppContextProvider } from './contexts/app.context';
import { Toaster } from 'react-hot-toast';
import { ContentContextProvider } from './contexts/content.context';
import DashboardContent from './pages/dashboard-content';
import ContentNotFound from './components/dashboard/content-not-found';
import Share from './pages/share';
import AuthLayout from './components/layout/auth-layout';
import Register from './components/auth/register';
import { AuthProvider } from './contexts/auth.context';
import Login from './components/auth/login';
import ProtectedRoute from './components/auth/protected-route';
import './i18n';
import HomePage from './pages/homepage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "dashboard",
    element: 
			<ProtectedRoute>
				<DashboardLayout />
			</ProtectedRoute>,
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
	},
	{
		path:'auth',
		element:<AuthLayout/>,
		children:[
			{
				index:true,
				element: <Navigate to='/auth/login' replace/>
			},
			{
				path:'register',
				element: <Register/>
			},
			{
				path:'login',
				element: <Login />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
		<Toaster/>
		<AppContextProvider>
			<AuthProvider>
				<ContentContextProvider>
					<RouterProvider router={router} />
				</ContentContextProvider>
			</AuthProvider>
		</AppContextProvider>
  </React.StrictMode>,
)
