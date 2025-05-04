import React, {useEffect, useState} from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useUtils} from "/src/helpers/utils.js"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"

function ExternalLink({href, className, children}) {
    const {showConfirmationDialog} = useFeedbacks()
    const {getString} = useLanguage()
    const utils = useUtils()

    const handleClick = (e) => {
        if(href.includes('mailto') || href.includes('tel:'))
            return

        e.preventDefault()
        showConfirmationDialog(
            getString('open_link'),
            getString('leaving_site').replace('$url', utils.limitTextSize(href, 50)),
            getString('cancel'),
            getString('proceed'),
            () => {
                window.open(href, '_blank')
            }
        )
    };

    return (
        <a href={href} className={className} onClick={handleClick}>
            {children}
        </a>
    )
}

export default ExternalLink