import { Outlet } from "react-router-dom";

export default function AuthLayout(){
	return(
		<div className="h-screen grid md:grid-cols-2">
			<div className="bg-black text-white px-4 py-10 hidden md:flex justify-between flex-col">
				<h2 className="text-3xl">
					Ai Writter Assisstant
				</h2>
				<p>
					Acme Inc
					“This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.”
					Sofia Davis
				</p>
			</div>
			<div className="flex items-center px-4">
				<Outlet/>
			</div>
		</div>
	)
}