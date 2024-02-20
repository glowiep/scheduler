import React from "react";

import { render, cleanup, fireEvent, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

import { 
  waitForElement, 
  getByText, 
  queryByText,
  prettyDOM, 
  getAllByTestId,
  waitForElementToBeRemoved
} from "@testing-library/react";

afterEach(cleanup);

// it("renders without crashing", () => {
//   render(<Application />);
// });
describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"))
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment")[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Mill-Jones" }
    });
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));
    // debug()
    // console.log(prettyDOM(appointment))
    // expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElementToBeRemoved (() => getByText(appointment, "Saving"));
    
    expect(getByText(appointment, "Lydia Mill-Jones")).toBeInTheDocument();

  })

})