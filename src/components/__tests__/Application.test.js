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

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Mill-Jones" }
    });
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));
    // debug()
    // console.log(prettyDOM(appointment))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
   
    await waitForElementToBeRemoved (() => getByText(appointment, "Saving"));
    
    expect(getByText(appointment, "Lydia Mill-Jones")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );
    // console.log(prettyDOM(day))
    expect(queryByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"))
    
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(getByAltText(appointment, "Delete"));
    
    // 4. Check that the confirmation message is shown.
    // await waitForElement(() => getByText(appointment, /are you sure you would like to delete/i))
    expect(getByText(appointment, /are you sure you would like to delete/i)).toBeInTheDocument();
    
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(queryByText(appointment, "Deleting")).toBeInTheDocument();
    
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"))
    
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday") 
    );
      
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {});
  
  it("shows the save error when failing to save an appointment", async () => {});

  it("shows the delete error when failing to delete an existing appointment", async () => {});


})