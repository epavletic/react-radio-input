import * as React from 'react';

export interface RadioGroupContextInterface {
  disabled?: boolean;
  name: string;
  onChange: Function;
  selectedValue?: string | number | boolean ;
}

const RadioContext = React.createContext<RadioGroupContextInterface | null>(null);

export const useRadioGroup = () => {
  const context = React.useContext(RadioContext);

  if (!context) {
    throw new Error('A `<Radio />` component can only be used inside a parent `<RadioGroup />`.');
  }
  return context;
};

export interface RadioGroupInterface {
  children: React.ReactNode;
  component?: React.ElementType;
  disabled?: boolean;
  name: string;
  onChange: Function;
  selectedValue?: string | number | boolean ;
}

export const RadioGroup = ({
  children,
  component = 'fieldset',
  disabled,
  name,
  onChange,
  selectedValue,
  ...props
}: RadioGroupInterface) => {
  const Component = component;
  return (
    <RadioContext.Provider value={{ disabled, name, onChange, selectedValue }}>
      <Component {...props}>{children}</Component>
    </RadioContext.Provider>
  );
};

export interface RadioInterface {
  disabled?: boolean;
  id?: string;
  value: string;
}

export const Radio = ({ disabled, value, ...props }: RadioInterface) => {
  const { disabled: disabledGroup, name, onChange, selectedValue } = useRadioGroup();
  const isSelected = selectedValue === value;
  const isDisabled = disabled || disabledGroup;

  const handleChange = () => {
    if (!isDisabled) {
      onChange(value);
    }
  };

  return (
    <input
      {...props}
      defaultChecked={isSelected}
      disabled={isDisabled}
      name={name}
      onChange={handleChange}
      type="radio"
      value={value}
    />
  );
};
