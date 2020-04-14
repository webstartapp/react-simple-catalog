import React from 'react';
const Input = (props) => {
  return (
    <input
      className={props.inputValid?"valid":"notvalid"}
      id={props.inputId}
      name={props.inputName}
      type={props.inputType}
      value={props.inputValue}
      onChange={props.inputChange}
      placeholder={props.inputPlaceholder}
    />
  )
}
export default Input
