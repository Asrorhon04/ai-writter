import { TRegisteredUser } from "@/shared/types/registered-user";
import { FC, ReactNode, createContext, useContext } from "react";
import { useLocalStorage } from "react-use";

interface IAuthContext {
	registerUser: (login:string, password:string)=>void;
	loginUser:(login:string, password:string)=>TRegisteredUser;
	user:TRegisteredUser | null;
	logOutUser: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);


const useAuthContext = () =>{
	const context = useContext(AuthContext);
	if(!context){
		throw new Error('useAuthContext must be used within an AuthProvider')
	}
	return context;
};


interface IProps{
	children: ReactNode;
}

const AuthProvider: FC<IProps>=({children})=>{
	
	const [users, setUsers] = useLocalStorage<TRegisteredUser[]>('users', []);
	const [user = null, setUser] = useLocalStorage<TRegisteredUser | null>('user', null);
	
	const registerUser = (login:string, password:string)=>{
		if(users){
		setUsers([...users, {login, password, createdAt: new Date()}]);
		}
	};

	const loginUser = (login:string, password: string)=>{
		const user = users?.find(user=>user.login === login);
		if(!user){
			throw new Error("User not found");
		}
		if(user.password !== password){
			throw new Error("Invalid password");
		}
		setUser(user);
		return user;
	}

	const logOutUser = () =>{
		setUser(null);
	}

	return(
		<AuthContext.Provider value={{registerUser, loginUser, logOutUser, user}}>
			{children}
		</AuthContext.Provider>
	)
}


export {AuthProvider, useAuthContext};