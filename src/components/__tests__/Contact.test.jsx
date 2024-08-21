import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactUs from "../ContactUs";

test("Should Load Contact Us Component", () => {
    render(<ContactUs />);

    // A diff. b/w "By" and "AllBy" By-> for single html AllBy -> for multiple (Array)
    const heading = screen.getByRole("heading");// role:can be a heading, button or different type of roles.

    // Assertion
    expect(heading).toBeInTheDocument();
})

test("Should Load button", () => {
    render(<ContactUs />);

    const button = screen.getByRole("button");

    // Assertion
    expect(button).toBeInTheDocument();
})

test("Should Load Placeholder", () => {
    render(<ContactUs />);

    const inputName = screen.getByPlaceholderText("Name");

    // Assertion
    expect(inputName).toBeInTheDocument();
})