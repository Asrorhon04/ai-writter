import { useAppContext } from "@/contexts/app.context";
import PromptHistory from "./prompt-history";
import { TPromptHistory } from "@/shared/types/prompt-history.type";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import { useContentContext } from "@/contexts/content.context";

const mockItems:TPromptHistory[]=[
	{
		date:'Today',
		links:[
			{
				title:"Prompt 1",
				url:"./dashboard/propmt/1"
			},
			{
				title:"Prompt 2",
				url:"./dashboard/propmt/2"
			}
		]
	},
	{
		date:'Yesterday',
		links:[
			{
				title:"Prompt 1",
				url:"./dashboard/propmt/1"
			},
			{
				title:"Prompt 2",
				url:"./dashboard/propmt/2"
			}
		]
	}
]

export default function Sidebar() {
	const {sidebarOpen} = useAppContext();
	const {generatingContent} = useContentContext();
	return(
		<nav className={clsx(`transition-all duration-500 h-screen overflow-x-hidden md:w-80 md:border-r md:p-4`,
			sidebarOpen ? 'w-1/2 border-r p-2':'w-0',
		)}>
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold ">AI Writter</h1>
				{generatingContent ? (
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				):(
					<button>
						<PencilSquareIcon className="w-6 h-6"/>
					</button>
				)}
			</div>
			<PromptHistory items={mockItems}/>
		</nav>
	)
}