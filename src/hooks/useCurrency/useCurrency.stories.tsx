import React, { useEffect, useState } from 'react';

import {useCurrency} from "./index";

export default {
  title: 'Hooks/UseCurrency',
  component: ({children}) => (children),
};

const Example = ({currentValue}) => {
  const [value, setValue] = useState<string>('10')
  const {
    currency,
    number,
    handleCurrencyChange
  } = useCurrency(value)

  useEffect(() => {
    handleCurrencyChange(currentValue)
  }, [currentValue])

  return (
    <div>
      <div>formated: {currency}</div>
      <div>unFormated: {number}</div>
    </div>
  )
};

Example.args = { currentValue: 10, label: 'Test Value Change' };
Example.argTypes = {
  currentValue: { control: { type: 'number', min: 0, max: 100000 } }
};

export {
  Example
}

