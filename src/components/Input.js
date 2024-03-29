import React from "react";
import './Input.css'

const Input = ({ name, type, placeholder, value, onChange }) => {
    return (
        <input name={name} type={type} placeholder={placeholder} value={value}
        onChange={onChange}/>
    )
}

export default Input