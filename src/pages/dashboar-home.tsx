import ContentCreateForm from "@/components/dashboard/content-create-form";
import ContentViewer from "@/components/dashboard/content-viewer";
import { useContentContext } from "@/contexts/content.context";
import { TContentCreateRequestParam } from "@/shared/types/content-create-request-params";
import { useState } from "react";

export default function DashboardHome (){
	const {generateContent, generatingContent}=useContentContext();
	const [content,setContent] = useState<string | null>(null);

	const  handleSubmit = async (params: TContentCreateRequestParam) =>{
		const result = await generateContent(params);
		setContent(result);
	}


	return(
		<div >
				<h1 className="text-3xl font-semibold">Article Writter</h1>
				{content ? (
					<ContentViewer content={content}/>
				) : (
					<ContentCreateForm isLoading={generatingContent} onSubmit={handleSubmit}/>
				)}
		</div>
	)
}