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

export default function Navbar() {

	const {toggleSidebar}= useAppContext();

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
						<DropdownMenuTrigger>Asrorkhon</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuSeparator /> 
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
				</DropdownMenu>
				</div>
			</nav>
		</div>
	)
}