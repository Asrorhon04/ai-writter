import ContentCreateForm from "@/components/dashboard/content-create-form";
import ContentViewer from "@/components/dashboard/content-viewer";
import { useAppContext } from "@/contexts/app.context";
import { ContentCreateRequestParam } from "@/shared/types/content-create-request-pareams";
import { generateArticle } from "@/utils/openai";
import { useState } from "react";

export default function DashboardHome (){
	const {setgeneratingContent, generatingContent}=useAppContext();
	const [content,setContent] = useState<string | null>(null);

	const  handleSubmit = async (params: ContentCreateRequestParam) =>{
		setgeneratingContent(true);
		const {title ,description} = params
		const result = await generateArticle(title, description);
		setContent(result);
		setgeneratingContent(false);
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