import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Bars3Icon } from "@heroicons/react/16/solid"
import { useAppContext } from "@/contexts/app.context";
import { useAuthContext } from "@/contexts/auth.context";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate();
	const {toggleSidebar}= useAppContext();
	const {user, logOutUser} = useAuthContext();
	
	const handleLogOUt = () =>{
		logOutUser();
		navigate('/auth/login');
	}

	return(
		<div className="border-b">
			<nav className="flex justify-between items-center p-4 h-16">
				<div className="flex items-center gap-2">
					<Button variant="outline" onClick={toggleSidebar} className="block md:hidden">
						<Bars3Icon className="w-4 h-4"/>
					</Button>
				</div>
				<h4 className="font-semibold">Dashboard</h4>
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger>{user?.login}</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuSeparator /> 
							<DropdownMenuItem onClick={handleLogOUt}>Logout</DropdownMenuItem>
						</DropdownMenuContent>
				</DropdownMenu>
				</div>
			</nav>
		</div>
	)
}