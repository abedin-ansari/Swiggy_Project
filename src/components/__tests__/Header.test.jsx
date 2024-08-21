import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import Header from "../Header";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";

it("should render the login button", () => {
    render(
    <BrowserRouter>
    <Provider store={appStore}>
       <Header /> 
    </Provider>
    </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", {name: "Login"});

    fireEvent.click(loginButton);  // We can check click Events by this "fireEvent"

    const logoutButton = screen.getByRole("button", {name: "Logout"})

    expect(logoutButton).toBeInTheDocument();
})