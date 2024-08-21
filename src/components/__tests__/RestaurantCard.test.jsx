import { render, screen } from "@testing-library/react";
import RestrourantCard from "../RestaurantCard";
import MOCK_DATA from "../Mocks/resCardMock.json";
import "@testing-library/jest-dom";

test("Should render card name", () => {
    render(<RestrourantCard resData={MOCK_DATA} />);

    const name = screen.getByText("Manohar Dairy and Restaurant");

    expect(name).toBeInTheDocument();
});