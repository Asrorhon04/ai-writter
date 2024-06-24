import { useContext, createContext, FC, useState, ReactNode } from "react";

interface IAppContext{
	generatingContent:boolean;
	setgeneratingContent:(value:boolean)=>void
}

export const AppContext = createContext<IAppContext | null>(null);

const useAppContext = () =>{
	const context = useContext(AppContext);
	if(!context){
		throw new Error('App Context must be used within a AppProvider');
	}
	return context;
}

interface IProps{
	children: ReactNode;
}

const AppContextProvider: FC<IProps> = ({children})=>{
	const [generatingContent, setgeneratingContent] = useState(false);
	return(
		<AppContext.Provider value={{generatingContent, setgeneratingContent}}>
			{children}
		</AppContext.Provider>
	);
}


export {AppContextProvider, useAppContext};