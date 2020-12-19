import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { RadioGroup, Radio } from '../index';

const TestImplementation = ({disabled = false}) => {
  const initialValue = 'apple';
  const [selectedFruit, setSelectedFruit] = React.useState(initialValue);

  return (
    <RadioGroup disabled={disabled} name="favoriteFruit" onChange={setSelectedFruit} selectedValue={selectedFruit}>
      <label htmlFor="bananaOption">
        <Radio id="bananaOption" value="banana" />
        Bananas
      </label>
      <label htmlFor="appleOption">
        <Radio id="appleOption" value="apple" />
        Apples
      </label>
      <label htmlFor="orangeOption">
        <Radio id="orangeOption" value="orange" disabled />
        Oranges
      </label>
    </RadioGroup>
  );
};

describe('RadioGroup', () => {
  test('selecting different options updates the ui accordingly', () => {
    render(<TestImplementation />);
    const radioInputs = screen.getAllByRole('radio');
    const [bananaOption, appleOption, orangeOption] = radioInputs;

    // By default, the wrapping element is a <fieldset />
    expect(screen.getByRole('group')).toBeInTheDocument();

    expect(radioInputs.length).toBe(3);
    for (const radio of radioInputs) {
      expect(radio).toHaveAttribute('name', 'favoriteFruit');
      expect(radio).toHaveAttribute('type', 'radio');
    }

    expect(appleOption).toBeChecked();
    expect(bananaOption).not.toBeChecked();
    expect(orangeOption).not.toBeChecked();
    expect(orangeOption).toBeDisabled();

    fireEvent.click(bananaOption);

    expect(bananaOption).toBeChecked();
    expect(appleOption).not.toBeChecked();
    expect(orangeOption).not.toBeChecked();
  });

  test('throws an error if `Radio` is used outside of a `RadioGroup`.', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      render(<Radio value="foo" />);
    }).toThrowError('A `<Radio />` component can only be used inside a parent `<RadioGroup />`.');
    consoleErrorSpy.mockRestore();
  });

  test('renders a disabled option correctly, and does not allow it to be seleced', () => {
    render(<TestImplementation />);
    const disabledOption = screen.getByLabelText('Oranges');

    expect(disabledOption).toBeDisabled();

    fireEvent.click(disabledOption);

    expect(disabledOption).toBeDisabled();
    expect(disabledOption).not.toHaveAttribute('checked');
  });

  test('if group is flagged as `disabled`, none of the radios can be selected', () => {
    render(<TestImplementation disabled={true} />);
    const bananaOption = screen.getByLabelText('Bananas');

    const radioInputs = screen.getAllByRole('radio');
    for (const radio of radioInputs) {
      expect(radio).toHaveAttribute('disabled');
    }
    
    fireEvent.click(bananaOption);
    
    expect(screen.getByLabelText('Bananas')).not.toHaveAttribute('checked');
  });
});
