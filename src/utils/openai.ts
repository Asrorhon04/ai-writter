import { OpenAI } from "openai"

let openAi : OpenAI;

export const generateArticle = async (title:string, description:string)=>{
	if(!openAi){
		openAi = new OpenAI({
			apiKey: import.meta.env.VITE_OPEN_AI_KEY,
			baseURL: "https://api.aimlapi.com",
			dangerouslyAllowBrowser: true
		});
	}
	const result = await openAi.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      { 
				role: "system", 
				content: "You are a helpful assistant designer to assist users in creating engaging content, such as blogs, articles, or any written material" 
			},
			{
				role: "user",
				content: `
				Please create an article based on the
				following information. Here is the list
				of information:
				\ntitle: ${title}
				\ndescription: ${description}
				\nRemember the post should be based on the information that I have mention above. Output 
				should be Markdown text format strictly.`
			}
    ],
  });
	return result.choices[0].message.content
};
