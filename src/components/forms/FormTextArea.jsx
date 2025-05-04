import React from 'react'
import {InputGroup} from "react-bootstrap"

function FormTextArea({id, placeholder, value, valueSetter, required}) {
    const parsedPlaceholder = placeholder + (required ? '*' : '')

    const _onChange = (e) => {
        valueSetter(e.target.value)
    }

    return (
        <InputGroup className={`input-group-list`}>
            <textarea className={`form-control text-4`}
                      id={id}
                      onChange={_onChange}
                      value={value}
                      placeholder={parsedPlaceholder}
                      required={required}/>
        </InputGroup>
    )
}

export default FormTextArea