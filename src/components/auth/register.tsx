import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuthContext } from "@/contexts/auth.context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const formScema = z.object({
	login:z.string().min(5).max(20),
	password:z.string().min(4),
	passwordRepeat: z.string().min(4)
}).refine((data)=>data.password === data.passwordRepeat, {
	message:'Password are not equal',
	path:['passwordRepeat'],
});

export default function Register(){
	const {registerUser}=useAuthContext();
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof formScema>>({
		resolver:zodResolver(formScema),
		defaultValues:{
			login:'',
			password:'',
			passwordRepeat:'',
		},
	});

	const handleSubmit = (values: z.infer<typeof formScema>)=>{
		const {login, password} = values;
		registerUser(login, password);
		toast.success('Account created');
		navigate('/auth/login');
	}
	
	return(
		<FormProvider {...form}>
			<form 
				onSubmit={form.handleSubmit(handleSubmit)} 
				className="w-full">
					<Card className="max-w-md mx-auto">
						<CardHeader className="space-y-1">
							<CardTitle className="text-2xl">
								Create an account
							</CardTitle>
							<CardDescription>
								Enter yout lolgin and password to create an account 
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4">
							<FormField 
								name='login'
								control={form.control}
								render={({field}) =>(
									<FormItem>
										<FormLabel>Login</FormLabel>
										<FormControl>
											<Input placeholder="My login " {...field}/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)} 
							/>
							<FormField 
								name='password'
								control={form.control}
								render={({field}) =>(
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type='password' {...field}/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)} 
							/>
							<FormField 
								name='passwordRepeat'
								control={form.control}
								render={({field}) =>(
									<FormItem>
										<FormLabel>Password repeat</FormLabel>
										<FormControl>
											<Input type='password' {...field}/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)} 
							/>
						</CardContent>
						<CardFooter>
							<Button className="w-full">
								Create account
							</Button>
						</CardFooter>
					</Card>
			</form>
		</FormProvider>
	)
}