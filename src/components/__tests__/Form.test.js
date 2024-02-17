import React from "react";

import { render, cleanup, getByPlaceholderText, getByText, queryByText } from "@testing-library/react";

import Form from "components/Appointment/Form";

import { fireEvent } from "@testing-library/react";


describe("Form", ()=> {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  // const { getByPlaceholderText } = render(
  //   <Form interviewers={interviewers}/>
  // );
  // const { getByTestId } = render(
  //   <Form interviewers={interviewers} name="Lydia Miller-Jones"/>
  // );

  // it("renders without student name if not provided", () => {
  //   expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  // });
  
  // it("renders with initial student name", () => {
  //   expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  // });




  // it("validates that the student name is not blank", () => {
  //   /* 1. validation is shown */
  //   expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

  //   /* 2. onSave is not called */
  //   expect(onSave).not.toHaveBeenCalled();
  // });

  // it("validates that the interviewer cannot be null", () => {
  //    /* 3. validation is shown */
  //    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();

  //    /* 4. onSave is not called */
  //    expect(onSave).not.toHaveBeenCalled();
  // });

  // it("calls onSave function when the name is defined", () => {
  //   const onSave = jest.fn();

  //   const { queryByText, getByText } = render(
  //     <Form interviewers={interviewers} interviewer={1} name="Lydia Miller-Jones"  />
  //   );

  //   fireEvent.click(getByText("Save"))
    
  //   /* 5. validation is not shown */
  //   expect(queryByText(/student name cannot be blank/i)).toBeNull();
  //   expect(queryByText(/please select and interviewer/i)).toBeNull();
    
  //   /* 6. onSave is called once*/
  //   expect(onSave).toHaveBeenCalledTimes(1);
  
  //   /* 7. onSave is called with the correct arguments */
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  // });

  

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
  
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("validates that the interviewer cannot be null", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
  
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} name="Lydia Miller-Jones" />
    );
  
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name and interviewer is defined", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
  
    /* 2. Render the Form with interviewers, student name and the onSave mock function passed as an onSave prop */
    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        name="Lydia Miller-Jones"
        interviewer={interviewers[0].id}
      />
    );
  
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("submits the name entered by the user", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );

    const input = getByPlaceholderText("Enter Student Name");

    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByText("Save"));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

});