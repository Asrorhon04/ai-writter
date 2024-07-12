import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Bars3Icon } from "@heroicons/react/16/solid"
import { useAppContext } from "@/contexts/app.context";
import { useAuthContext } from "@/contexts/auth.context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

enum LanguageCode{
	English='en',
	Uzbek='uz',
	Russian='ru',
}

type TLanguage={
	label:string;
	flag:string;
}

const LANGUAGES:{[code in LanguageCode]:TLanguage}={
	[LanguageCode.English]:{
		label:'English',
		flag:'🌨',
	},
	[LanguageCode.Uzbek]:{
		label:'O\'zbekcha',
		flag:'🌞',
	},
	[LanguageCode.Russian]:{
		label:'Русский',
		flag:'❄',
	}
}

export default function Navbar() {
	const {i18n, t}=useTranslation('dashboard');
	const navigate = useNavigate();
	const {toggleSidebar}= useAppContext();
	const {user, logOutUser} = useAuthContext();
	const [activeLanguage, setActiveLanguage]=useState<TLanguage>(LANGUAGES.en);

	useEffect(()=>{
		setActiveLanguage(LANGUAGES[i18n.language as LanguageCode])
	},[i18n.language])
	
	const changeLanguage = (lang:string)=>{
		if(lang!=i18n.language){
			i18n.changeLanguage(lang);
		}
	}

	const handleLogOUt = () =>{
		logOutUser();
		navigate('/auth/login');
	}

	return(
		<div className="border-b">
			<nav className="flex justify-between items-center p-4 h-16">
				<div className="flex items-center gap-2">
					<Button variant="outline" onClick={toggleSidebar} className="block md:hidden">
						<Bars3Icon className="w-4 h-4"/>
					</Button>
				</div>
				<h4 className="font-semibold">Dashboard</h4>
				<div className="flex gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger>{user?.login}</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>{t('profile')}</DropdownMenuItem>
							<DropdownMenuSeparator /> 
							<DropdownMenuItem onClick={handleLogOUt}>{t('logout')}</DropdownMenuItem>
						</DropdownMenuContent>
				</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">{activeLanguage.flag}</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{Object.entries(LANGUAGES).map(([code, {label}])=>(
								<DropdownMenuItem 
									key={code} 
									className="cursor-pointer" 
									onClick={()=>changeLanguage(code)}>
									{label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
				</DropdownMenu>
				</div>
			</nav>
		</div>
	)
}