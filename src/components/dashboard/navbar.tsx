import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
	return(
		<div className="border-b">
			<nav className="flex justify-between items-center p-4 h-16">
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