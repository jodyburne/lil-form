import { fireEvent, render, screen } from "@testing-library/react";
import TextInput from ".";

const props = {
  name: "TestInput",
  value: "Some value",
  setValue: jest.fn(),
  setError: jest.fn(),
  required: true,
  error: "A glaring error",
};
describe("<TextInput/> component", () => {
  it("renders the name prop as a label", () => {
    const { queryByText } = render(<TextInput {...props} />);
    expect(queryByText(props.name)).toBeTruthy();
  });
  it("shows the error message if one is present", () => {
    const { queryByText, debug } = render(<TextInput {...props} />);
    expect(queryByText(props.error)).toBeTruthy();
  });
  it("calls the setValue and setError funcions on change", () => {
    const { queryByDisplayValue, debug } = render(<TextInput {...props} />);
    const input = queryByDisplayValue(props.value)
    fireEvent.change(input, { target: { value: 'Hiya' } });
    expect(props.setValue).toBeCalled()
    expect(props.setError).toBeCalled()
  });
});
