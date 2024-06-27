import { Outlet } from "react-router-dom";
import Navbar from "../dashboard/navbar";
import Sidebar from "../dashboard/sidebar";

export default function DashboardLayout (){
	return(
		<div className="h-screen overflow-x-hidden flex">
			<Sidebar />
			<div className="w-full">
				<Navbar />
				<div className="p-4 md:p-6 lg:p-8">
					<Outlet />
				</div>
			</div>
		</div>
	)
}