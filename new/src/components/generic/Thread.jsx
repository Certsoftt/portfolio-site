import "./Thread.scss"
import React from 'react'
import FaIcon from "/src/components/generic/FaIcon.jsx"
import InfoBadge from "/src/components/generic/InfoBadge.jsx"
import ExternalLink from "/src/components/generic/ExternalLink.jsx"

function Thread({ items, shouldShowAsComplete }) {
    items = items || []

    return (
        <ul className={`thread`}>
            {items.map((item, key) => (
                <li key={key} className={`thread-item`}>
                    <div className="fa fa-stack circle">
                        <i className="fa fa-circle fa-stack-1x"/>
                    </div>

                    <div className={`thread-item-content`}>
                        <h6 className={`title fw-bold`} dangerouslySetInnerHTML={{__html: item.title}}/>

                        <div className={`badges pt-1`}>
                            <InfoBadge faIcon={`fa-solid fa-calendar`} text={item.date}/>
                            {item.place && (<InfoBadge faIcon={`fa-solid fa-building`} text={item.place}/>)}
                        </div>

                        <div className={`description mt-2 text-4`}
                             dangerouslySetInnerHTML={{__html: item.description}}/>

                        <div className={`link-wrapper ${item.href ? 'mt-4' : 'mt-2'}`}>
                            {item.href && (
                                <ExternalLink className={`link font-family-subheadings fw-bold text-2`} href={item.href}>
                                    <span>{item.hrefLabel}</span>
                                    <FaIcon iconName={`fa-solid fa-arrow-up-right-dots ms-1`}/>
                                </ExternalLink>
                            )}
                        </div>
                    </div>
                </li>
            ))}

            <li className={`thread-item trailing-thread-item`}>
                <div className="fa fa-stack circle">
                    <FaIcon iconName={shouldShowAsComplete ? '' : 'fa-solid fa-caret-down'}/>
                </div>
            </li>
        </ul>
    )
}

export default Thread