import { describe} from "vitest";
import Testimonials from "./testimonials";
import { render, screen } from "@testing-library/react";

describe('Testimonials', ()=>{
	it('should render the testimonials photo', ()=>{
		render(<Testimonials/>)
		const photo = screen.getByTestId('@testimonials/photo');
		expect(photo).toBeInTheDocument;
	})
})