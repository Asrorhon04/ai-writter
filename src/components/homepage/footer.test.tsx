import { describe } from "vitest"
import Footer from "./footer"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"


describe('Footer', ()=>{
	it('sould have a right link to the privacy policy page', ()=>{
		render(
			<MemoryRouter>
				<Footer/>
			</MemoryRouter>
		);
		const privacyPoliceLink = screen.getByTestId('footer/privacy-policy');
		const href = privacyPoliceLink.getAttribute('href');
		expect(href).toBe('/privacy-policy');
	})
})