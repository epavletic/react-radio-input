<div align="center" >
  <img src="logo.png" alt="React-radio-group" title="React-radio-group" width="310px" />
  <br/>
  <br/>

  Radio buttons the proper ([React](https://reactjs.org/)) way.
  <br/>
  <br/>

[![npm](https://img.shields.io/npm/v/react-radio-input?style=for-the-badge)](https://www.npmjs.com/package/react-radio-input)

  <hr />
</div>

This package is a re-take on [react-radio-group](https://github.com/chenglou/react-radio-group) by [Cheng Lou](https://github.com/chenglou), but written using TypeScript and the ”new” [Context](https://reactjs.org/docs/context) API introduced in [React 16.3.0](https://github.com/facebook/react/blob/master/CHANGELOG.md#1630-march-29-2018).

## Installation

```
$ npm i react-radio-input

// or…

$ yarn add react-radio-input
```

## Basic usage

```js
import { useState } from 'react';
import { RadioGroup, Radio } from 'react-radio-input';

const ExampleComponent = () => {
  const initialValue = 'apple';
  const [selectedFruit, setSelectedFruit] = useState(initialValue);

  return (
    <RadioGroup
      name="favoriteFruit"
      onChange={setSelectedFruit}
      selectedValue={selectedFruit}
    >
      <label htmlFor="bananaOption">
        <Radio id="bananaOption" value="banana" />
        Bananas
      </label>
      <label htmlFor="appleOption">
        <Radio id="appleOption" value="apple" />
        Apples
      </label>
      <label htmlFor="orangeOption">
        <Radio id="orangeOption" value="orange" />
        Oranges
      </label>
    </RadioGroup>
  );
};
```

[![Open example in CodeSandbox](https://img.shields.io/badge/Open%20in%20CodeSandbox-000000.svg?style=for-the-badge&logo=codesandbox&labelColor=000000&logoWidth=20)](https://codesandbox.io/s/brave-morse-154b6)

### A few points worth mentioning:

- Repetitive fields are either lifted onto the `RadioGroup` wrapper or already implicitly set on the `Radio` components, which themselves are rendered as native HTML `<input type="radio" />` elements.
- Because they are `<input type="radio" />`’s, there is no need for `aria-*` or `role` attributes to be added – the element itself provides the necessary semantic meaning for accessability features (remember the [first rule of ARIA use](https://www.w3.org/TR/using-aria/#firstrule)).
- `RadioGroup` by default is rendered as a `fieldset` HTML element. See below for ways of changing this, but I would strongly advice to consider _re-styling_ it instead – `fieldset`’s job is to group several controls as well as labels in a HTML form, which is prety much what we want to do here.
- As seen in the example, the consumer is left to provide the proper label, as seen fit. This has two consequences, by which the latter has been deemed more important than the former for this package:
  1. There’s a weee bit of work to be done for the consumer if they want an accessible solution (please do this though 🙏).
  2. The consumer has total control over how and where the label is attached to the form input.
- I recommend to wrap wrap these components with your own implementation (_with_ proper label-handling) and then use _that_ in your codebase.

## With `useRadioGroup`

If you need to get access to the provided `RadioGroup` context in intermediate components _between_ your `RadioGroup` and `Radio` components, `react-radio-input` also provides a `useRadioGroup` hook:

```js
// CustomRadio
import { styled } from '@emotion/styled';
import { Radio, useRadioGroup } from 'react-radio-input';

const RadioWrapper = styled.label(({ isSelected }) => `
  background-color: ${isSelected ? '#5a5ae8' : '#dddde1'};
`);

const CustomRadio = ({ description, label, value }) => {
  const { selectedValue } = useRadioGroup();
  const isSelected = value === selectedValue;

  return (
    <RadioWrapper isSelected={isSelected}>
      <Radio value={value} />
      {label}
      {description}
    <RadioWrapper />
  );
};
```

```js
// Parent
import { useState } from 'react';
import { RadioGroup } from 'react-radio-input';
import CustomRadio from './CustomRadio';

const ExampleComponent = () => {
  const [selectedTier, setSelectedTier] = useState();

  return (
    <RadioGroup name="productTier" onChange={setSelectedTier} selectedValue={selectedTier}>
      <legend>Select the size of your side project</legend>
      <CustomRadio label="Hobby" description="1GB – $5/month" value="hobby" />
      <CustomRadio
        label="Freelancer"
        description="5GB – $10/month"
        value="freelancer"
      />
      <CustomRadio
        label="Startup"
        description="10GB – $15/month"
        value="startup"
      />
    </RadioGroup>
  );
};
```
[![Open example in CodeSandbox](https://img.shields.io/badge/Open%20in%20CodeSandbox-000000.svg?style=for-the-badge&logo=codesandbox&labelColor=000000&logoWidth=20)](https://codesandbox.io/s/determined-christian-99coq)


## API

### RadioGroup
| Prop            | Type                                       | Description                                                                                    |
| :-------------- | :----------------------------------------: | :--------------------------------------------------------------------------------------------- |
| `children`      | `React component` \| `[React components]`  |   |
| `component`     | `String` \| `React component`              | Defaults to `fieldset` – what HTML tag/React component to use for rendering the `RadioGroup`.  |
| `disabled`      | `Boolean`                                  | Disables all `Radio`’s inside the `RadioGroup`.                                                |
| `name`          | `String`                                   | Unique name for the current `RadioGroup` – will be implicitly set on each `Radio`.             |
| `onChange`      | `Function`                                 | Will be called with the selected value as argument whenever a radio is selected.               |
| `selectedValue` | `String` \| `Number` \| `Boolean`          | The curretly selected value.                                                                   |

Apart from the above, any additional props to `RadioGroup` will be passed down to `component`.

### Radio
| Prop         | Type                               | Description                      |
| :----------- | :--------------------------------: | :------------------------------- |
| `disabled`   | `Boolean`                          | Disables an individual `Radio`.  |
| `value`      | `String` \| `Number` \| `Boolean`  | Value of the `Radio`.            |

Apart from the above, any additional props to `Radio` will be passed down to the underlying `<input type="radio" />` element.