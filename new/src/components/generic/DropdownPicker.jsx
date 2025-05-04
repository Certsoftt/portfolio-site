import React from 'react'
import {Dropdown} from 'react-bootstrap'
import MenuItem from "/src/components/generic/MenuItem.jsx"
import "./DropdownPicker.scss"

function DropdownPicker({availableOptions, selectedOption, size, onOptionSelected, shrink, alwaysForceDropdown, tooltip}) {
    const shouldBehaveAsButton = !alwaysForceDropdown && availableOptions.length <= 1

    const _onToggleClicked = () => {
        if(shouldBehaveAsButton) {
            onOptionSelected && onOptionSelected(availableOptions[0].id)
        }
    }

    const _selectOption = (option) => {
        onOptionSelected && onOptionSelected(option.id)
    }

    return (
        <div className={`dropdown-picker-wrapper`}>
            {availableOptions.length > 0 && (
                <Dropdown className={`dropdown-picker`}>
                    <Dropdown.Toggle variant={`transparent`} className={`dropdown-picker-toggle`} onClickCapture={_onToggleClicked}>
                        <MenuItem label={selectedOption.label}
                                  icon={selectedOption.imgUrl || selectedOption.faIcon}
                                  faSuffix={!shouldBehaveAsButton ? "fa-solid fa-caret-down" : null}
                                  hoverAnimation={true}
                                  tooltip={tooltip}
                                  size={size}
                                  shrink={shrink}/>
                    </Dropdown.Toggle>

                    {!shouldBehaveAsButton && (
                        <Dropdown.Menu className={`dropdown-menu`}>
                            {availableOptions.map((option, key) => (
                                <Dropdown.Item key={key} className={`dropdown-item`} onClick={() => _selectOption(option)}>
                                    <MenuItem label={option.label}
                                              icon={option.imgUrl || option.faIcon}
                                              size={1}
                                              style={{height: '35px'}}
                                              shrink={false}/>
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    )}
                </Dropdown>
            )}
        </div>
    )
}

export default DropdownPicker