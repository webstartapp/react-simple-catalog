import React from 'react';
const Select = (props) => {
    return (
  <div>
    <select
    id={props.selectId}
    name={props.selectName}
    value={props.selectValue}
    onChange={props.selectChange}
    >
    {props.selectOptions.map(option => {
      return (
        <option
          key={option[0]}
          value={option[0]}
          label={option[1]}>{option[1]}
        </option>
      );
    })}
      </select>
  </div>
)
}
export default Select
