import "./InlineList.scss"
import React from 'react'
import FaIcon from "/src/components/generic/FaIcon.jsx"
import ImageView from "/src/components/generic/ImageView.jsx"
import ExternalLink from "/src/components/generic/ExternalLink.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"

function InlineList({ items, textClass }) {
    const {isBreakpoint} = useWindow()
    const shortenedMode = !isBreakpoint('sm')

    textClass = textClass || `text-4`
    if(shortenedMode) {
        items = items.slice(0, 2)
    }

    return (
        <ul className={`inline-list`}>
            {items.map((item, key) => (
                <li className={`inline-list-item ${textClass}`} key={key}>
                    {item.href && (
                        <ExternalLink href={item.href} className={`inline-list-link`}>
                            <InlineListLinkBody item={item} shortenedMode={shortenedMode}/>
                        </ExternalLink>
                    )}

                    {!item.href && (<InlineListLinkBody item={item} shortenedMode={shortenedMode}/>)}
                </li>
            ))}
        </ul>
    )
}

function InlineListLinkBody({item, shortenedMode}) {
    let label = item.label
    if(shortenedMode) {
        label = item['shortLabel'] || label
    }

    return (
        <div className={`inline-link-list-content ${item.href ? '' : 'text-secondary-2'}`}>
            {item.img && (
                <ImageView src={item.img} alt={label} className={`me-2`}/>
            )}

            {!item.img && (
                <FaIcon iconName={item.faIcon}
                           colors={item.faIconColors}
                           className={`me-1 me-md-2 ${item.href ? '' : 'opacity-50'}`}/>
            )}
            <span>{label}</span>
        </div>
    )
}

export default InlineList