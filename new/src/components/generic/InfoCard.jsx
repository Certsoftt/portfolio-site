import "./InfoCard.scss"
import React from 'react'
import {Card, CardBody, CardFooter} from "react-bootstrap"
import CircleAvatar from "/src/components/generic/CircleAvatar.jsx"
import {useUtils} from "/src/helpers/utils.js"
import InfoBadge from "/src/components/generic/InfoBadge.jsx"
import ToolButton from "/src/components/generic/ToolButton.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"

function InfoCard({title, text, img, fallbackIcon, fallbackIconColors, dateInterval, href, hrefLabel}) {
    const utils = useUtils()
    const {showConfirmationDialog} = useFeedbacks()
    const {isBreakpoint} = useWindow()
    const {getString} = useLanguage()

    title = title || ''
    text = text || ''

    const _onViewButton = () => {
        if(!href)
            return

        showConfirmationDialog(
            hrefLabel,
            getString('leaving_site').replace('$url', utils.limitTextSize(href, 50)),
            getString('cancel'),
            getString('proceed'),
            () => {
                window.open(href, '_blank')
            }
        )
    }

    return (
        <Card className={`info-card`}>
            <CardBody>
                <div className={`avatar-wrapper`}>
                    <CircleAvatar size={isBreakpoint('lg') ? 3 : 2}
                                  dynamicSize={false}
                                  img={img}
                                  fallbackIcon={fallbackIcon}
                                  fallbackIconColors={fallbackIconColors}/>
                </div>

                <div className={`info mt-3`}>
                    <h5 className={`fw-bold`}>
                        <span dangerouslySetInnerHTML={{__html: utils.parseJsonText(title)}}/>
                    </h5>

                    <div className={`text-3 opacity-75 mt-3 mb-3`} dangerouslySetInnerHTML={{__html: utils.parseJsonText(text)}}/>
                </div>
            </CardBody>

            {(dateInterval || href) && (
                <CardFooter>
                    <InfoBadge text={dateInterval} faIcon={`fa-solid fa-calendar`} className={`text-1`}/>


                    <div className={`link-wrapper`}>
                        <ToolButton tooltip={hrefLabel}
                                    size={2}
                                    color={`dark`}
                                    className={!href ? 'invisible' : ''}
                                    icon={`fa-solid fa-arrow-up-right-dots`}
                                    onClick={_onViewButton}
                                    nav={false}/>
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}

export default InfoCard