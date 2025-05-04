import "./NavLink.scss"
import React from 'react'
import MenuItem from "/src/components/generic/MenuItem.jsx"
import {useUtils} from "/src/helpers/utils.js"
import SensitiveButton from "/src/components/generic/SensitiveButton.jsx"

function NavLink({ shrink, label, icon, size, className, rounded, selected, disabled, onClick, tooltip }) {
    const utils = useUtils()

    return (
        <SensitiveButton className={`nav-link ${utils.strIf(rounded, `nav-link-rounded`)}`}
                         disabled={disabled}
                         onClick={onClick}>
            <MenuItem shrink={shrink}
                      label={label}
                      icon={icon}
                      hoverAnimation={true}
                      size={size}
                      tooltip={tooltip}
                      selected={selected}
                      className={className}/>
        </SensitiveButton>
    )
}

export default NavLink