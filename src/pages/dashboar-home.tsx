import ContentCreateForm from "@/components/dashboard/content-create-form";
import { useContentContext } from "@/contexts/content.context";
import { TContentCreateRequestParam } from "@/shared/types/content-create-request-params";
import { useNavigate } from "react-router-dom";

export default function DashboardHome (){
	const {generateContent, generatingContent}=useContentContext();
	const navigate = useNavigate();

	const  handleSubmit = async (params: TContentCreateRequestParam) =>{
		const result = await generateContent(params);
		if(result){
			navigate(`/dashboard/content/${result.id}`)
		}
	}


	return(
		<div >
			<ContentCreateForm 
				isLoading={generatingContent} 
				onSubmit={handleSubmit}
			/>
		</div>
	)
}