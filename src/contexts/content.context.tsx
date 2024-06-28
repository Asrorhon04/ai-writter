import { TContentCreateRequestParam } from "@/shared/types/content-create-request-params";
import { TGeneratedContent } from "@/shared/types/generated-content";
import { TPromptHistory, TPromptLink } from "@/shared/types/prompt-history.type";
import { generateArticle } from "@/utils/openai";
import { FC, ReactNode, createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLocalStorage } from 'react-use';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

interface IContentContext{
	generatingContent:boolean;
	setgeneratingContent:(value:boolean)=>void;
	generateContent:(
		params:TContentCreateRequestParam
	) => Promise<string | null>
	getPromptHistory: () => TPromptHistory[];
}

export const ContentContext = createContext<IContentContext | null>(null);
const useContentContext =()=>{
	const context = useContext(ContentContext);
	if(!context){
		throw new Error("Content context must be used within a ContentProvider");
	} 
	return context;
}

interface IProps{
	children:ReactNode;
}

const ContentContextProvider: FC<IProps> = ({children})=>{
	const [generatingContent, setgeneratingContent] = useState(false);
	const [contentItems, setContentItems] = useLocalStorage<TGeneratedContent[]>(
		'contentItems',
		[],
	);
	const generateContent = async(params:TContentCreateRequestParam)=>{
		let content = null; 
		getPromptHistory();
		setgeneratingContent(true);
		const {title ,description} = params;
		try {
			content = await generateArticle(title, description);
			if(content){
				const generatedContentItem : TGeneratedContent ={
					id:uuidv4(),
					title,
					description,
					content,
					createdAt: new Date(),
				};
				setContentItems([generatedContentItem, ...(contentItems || [])])
			}
		} catch (error) {
			console.log(`[Error] Failed to generate article`, error);
			toast.error("Error occurred while generating content.")
		}
		finally{
			setgeneratingContent(false);
		}
		return content; 
	}

	const getPromptHistory = ():TPromptHistory[] =>{
		if(!contentItems){
			return []
		}
		const groupedItems = contentItems.reduce(
			(prev: { [date:string] : TPromptLink[] }, next) => {
			const date = dayjs(next.createdAt).format('MMM DD, YYYY');
				if (!prev[date]) {
					prev[date]=[];
				}
				prev[date].push({
					title:next.title,
					url:`/dashboard/content/${next.id}`,
				});
				return prev;
			}, 
		{}
	);
	return Object.keys(groupedItems)
	.sort((a , b) => dayjs(b).diff(a))
	.map((date)=>({
		date,
		links:groupedItems[date]
	}));
};

	return (
		<ContentContext.Provider
			value={{
				generatingContent,
				setgeneratingContent,
				generateContent,
				getPromptHistory,
			}}
		>
			{children}
		</ContentContext.Provider>
	);
}


export {ContentContextProvider, useContentContext};