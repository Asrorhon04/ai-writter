import { ClipboardIcon, ShareIcon, StarIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import { TGeneratedContent } from "@/shared/types/generated-content";

type ContentViewerProps = {
	generatedContent:TGeneratedContent;
	onSave: (generatedContent:TGeneratedContent) => void;
}

enum Mode{
	View,
	Edit,
}

export default function ContentViewer ({generatedContent, onSave}:ContentViewerProps){
	const [editedContent, setEditedContent] = useState<string>(generatedContent.content);
	const [mode, setMode] = useState<Mode>(Mode.View);
	const handleCopy = async() =>{
		try{
			await navigator.clipboard.writeText(generatedContent.content);
			toast.success('Successfully copy to clipboard');
		}
		catch(e){
			console.log('[Error] Failed to copy to clipboard', e);
			toast.error("Error occurred while to copying to clipboard");
		}
	};

	const handleEdit =() =>{
		setMode(Mode.Edit);
	} 

	const handleContentChange = (value?:string) =>{
		setEditedContent(value || '');
	}

	const handleCancel = () =>{
		setMode(Mode.View);
		setEditedContent(generatedContent.content); 
	}

	const handleSave = ()=>{
		onSave({...generatedContent, content: editedContent});
		setMode(Mode.View)
	}

	return mode === Mode.View ? (
		<Card className="mt-4">
		<CardContent className="p-4 md:p-6 lg:p-8">
			<div className="prose lg:prose-xl">
				<MDEditor.Markdown source={editedContent} style={{ whiteSpace: 'pre-wrap' }} />
			</div>
		</CardContent>
		<CardFooter className="flex gap-2 justify-end">
			<Button variant="outline" onClick={handleEdit}>
				<Pencil className="w-4 h-4"/>
			</Button>
			<Button variant="outline">
				<ShareIcon className="w-4 h-4"/>
			</Button>
			<Button variant="outline" onClick={handleCopy}>
				<ClipboardIcon className="w-4 h-4" />
			</Button>
			<Button variant="outline">
				<StarIcon className="w-4 h-4"/>
			</Button>
		</CardFooter>
	</Card>
	) : (
		<div>
			<MDEditor 
				height={400} 
				className='mt-4' 
				value={editedContent} 
				onChange={handleContentChange} 
			/>
			<div className='mt-4 flex gap-2'>
			<Button onClick={handleSave}>
					Save
			</Button>
			<Button variant="destructive" onClick={handleCancel}>
				Cancel
			</Button>
			</div>
		</div>
	)
}