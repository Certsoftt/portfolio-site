import "./NavSidebarGroup.scss"
import React from 'react'
import {useUtils} from "/src/helpers/utils.js"

function NavSidebarGroup({ children, className, direction, shrink, fillSpace }) {
    const utils = useUtils()

    return (
        <div className={`
            nav-sidebar-group 
            nav-sidebar-group-${direction}
            ${utils.strIf(shrink, `nav-sidebar-group-${direction}-shrink`)}
            ${utils.strIf(fillSpace, `nav-sidebar-group-fill`)}
            ${className}
        `}>
            {children}
        </div>
    )
}

function NavSidebarGroupItem({children, visible}) {
    return (
        <div className={`nav-sidebar-group-item ${visible ? `` : `d-none`}`}>
            {children}
        </div>
    )
}

export {NavSidebarGroup, NavSidebarGroupItem}