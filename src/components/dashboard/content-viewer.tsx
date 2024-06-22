import { ClipboardIcon, ShareIcon, StarIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import Markdown from 'react-markdown'

type ContentViewerProps = {
	content:string;
}


export default function ContentViewer ({content}:ContentViewerProps){
	return(
		<Card className="mt-4">
		<CardContent className="p-8">
			<div className="prose lg:prose-xl">
				<Markdown>
					{content}
				</Markdown>
			</div>
		</CardContent>
		<CardFooter className="flex gap-2 justify-end">
			<Button variant="outline">
				<ShareIcon className="w-4 h-4"/>
			</Button>
			<Button variant="outline">
				<ClipboardIcon className="w-4 h-4" />
			</Button>
			<Button variant="outline">
				<StarIcon className="w-4 h-4"/>
			</Button>
		</CardFooter>
	</Card>
	)
}