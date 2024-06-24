import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { Loader2 } from "lucide-react"
import { ContentCreateRequestParam } from "@/shared/types/content-create-request-pareams"

type ContentCreateFormProps ={
	isLoading: boolean;
	onSubmit:(params:ContentCreateRequestParam)=>void;
}
export default function ContentCreateForm({isLoading, onSubmit}:ContentCreateFormProps){

	const [form, setForm] = useState<ContentCreateRequestParam>({
		title:'',
		description:'',
	});

	const handleChange = (event:FormEvent<HTMLInputElement| HTMLTextAreaElement>)=>{
		const {name, value} = event.currentTarget;
		setForm({...form, [name]:value})
	}

	const handleSubmit = (event: FormEvent)=> {
		event.preventDefault();
		onSubmit(form)
	}

	return(
					<form action="" className="mt-4" onSubmit={handleSubmit}>
						<div className="grid w-full gap-1.5 mb-4"> 
							<Label htmlFor="title">Title</Label>
							<Input type="title" id="title" placeholder="title" name="title" 
							onChange={handleChange}
							disabled={isLoading}
							/>
						</div>
						<div className="grid w-full gap-1.5 mb-4">
						<Label htmlFor="message">Description</Label>
						<Textarea 
						placeholder="Type your description" 
						id="message" 
						name="description"
						onChange={handleChange}
						disabled={isLoading}
						/>
					</div>
						<Button disabled={isLoading}>
							{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Generate
						</Button>
					</form> 
	)
}