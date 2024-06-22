import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { Loader2 } from "lucide-react"
import { generateArticle } from "@/utils/openai"

export default function ContentCreate(){

	const [isLoading, setIsLoading]=useState(false);

	const [form, setForm] = useState({
		title:'',
		description:'',
	});

	const  handleSubmit = async (event:FormEvent) =>{
		event.preventDefault();
		setIsLoading(true);
		const result = await generateArticle(form.title, form.description);
		console.log(result);
		setIsLoading(false);
	}

	const handleChange = (event:FormEvent<HTMLInputElement| HTMLTextAreaElement>)=>{
		const {name, value} = event.currentTarget;
		setForm({...form, [name]:value})
	}

	return(
		<div> 
				<h1 className="text-3xl font-semibold">Article Writter</h1>
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
		</div>
	)
}