import React, { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/InputGroupText';
import FaIcon from '/src/components/generic/FaIcon.jsx';

function FormInput({ id, type, value, valueSetter, faIcon, placeholder, required }) {
    const parsedPlaceholder = placeholder + (required ? '*' : '')
    const [isFocused, setIsFocused] = useState(false)

    const _onChange = (e) => {
        valueSetter(e.target.value)
    }

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    return (
        <InputGroup className={`input-group-list`}>
            <InputGroupText className={isFocused ? 'input-group-text-focused' : ''}>
                <FaIcon iconName={faIcon} />
            </InputGroupText>

            <input
                className={`form-control text-4`}
                id={id}
                type={type}
                value={value}
                placeholder={parsedPlaceholder}
                required={required}
                onChange={_onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </InputGroup>
    );
}

export default FormInput;
