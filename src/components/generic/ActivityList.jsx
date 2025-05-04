import React, {useEffect, useState} from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {Col, Row} from "react-bootstrap"
import CircleAvatar from "/src/components/generic/CircleAvatar.jsx"
import FaIcon from "/src/components/generic/FaIcon.jsx"
import {useUtils} from "/src/helpers/utils.js"
import CustomProgressBar from "/src/components/generic/CustomProgressBar.jsx"
import Expandable from "/src/components/capabilities/Expandable.jsx"
import "./ActivityList.scss"
import {useWindow} from "/src/providers/WindowProvider.jsx"

const utils = useUtils()

function ActivityList({ items, storageId, colClass, maxItems, hideProgressBar, cascadeMargin }) {
    const {currentTimeSpan} = useWindow()
    const [filteredItems, setFilteredItems] = useState([])
    const [renderedAt] = useState(currentTimeSpan)

    const _shouldDisplayAsProgressItem = (item) => {
        return item.progress !== null && item.progress !== undefined && !hideProgressBar
    }

    const _getItemStyle = (key) => {
        if(!cascadeMargin)
            return {}

        const midPoint = Math.floor(filteredItems.length / 2)
        const step = 30

        let marginLeft
        if (key < midPoint)
            marginLeft = key * step
        else
            marginLeft = (filteredItems.length - key - 1) * step
        return {marginLeft: `${marginLeft}px`}
    }

    return (
        <Row className={`gy-2 gy-md-3`}>
            <Expandable items={items}
                        storageId={storageId}
                        onFilter={setFilteredItems}
                        controlsClass={`mt-3 mt-lg-4`}
                        maxItems={maxItems || 4}
                        stepAmount={10}>
                {filteredItems.map((item, key) => (
                    <Col key={key} className={colClass || 'col-12 col-lg-6'}>
                        {_shouldDisplayAsProgressItem(item) && (
                            <ActivityListItemWithProgress item={item}
                                                          customStyle={_getItemStyle(key)}
                                                          createdAt={renderedAt}/>
                        )}

                        {!_shouldDisplayAsProgressItem(item) && (
                            <ActivityListItem item={item}
                                              customStyle={_getItemStyle(key)} />
                        )}
                    </Col>
                ))}
            </Expandable>
        </Row>
    )
}

function ActivityListItem({item, customStyle, children}) {
    const {getString} = useLanguage()

    let experienceLabel = ''
    if(item.dateStarted) {
        const yearsDiff = utils.getYearsPassedSince(item.dateStarted)
        const floorYearsDiff = Math.floor(yearsDiff)

        experienceLabel = getString('experience_year_count_less_than_one')
        if (floorYearsDiff > 1) {
            experienceLabel = getString('experience_year_count_plural').replace('{x}', floorYearsDiff + "+")
        } else if (floorYearsDiff === 1) {
            experienceLabel = getString('experience_year_count_singular').replace('{x}', floorYearsDiff)
        }
    }

    return (
        <div className={`activity-list-item`} style={customStyle}>
            <div className={`avatar-wrapper me-3`}>
                <CircleAvatar size={1}
                              dynamicSize={true}
                              img={item.img}
                              fallbackIcon={item.fallbackIcon}
                              fallbackIconColors={item.fallbackIconColors}/>
            </div>

            <div className={`content-wrapper w-100`}>
                <div className={`d-flex justify-content-between font-family-subheadings`}>
                    <div className={`fw-bold text-2`}>
                        <span dangerouslySetInnerHTML={{__html: item.title}}/>
                        {item.tags.map((tag, key) => (
                            <span className={`opacity-75`} key={key}>{tag}</span>
                        ))}
                    </div>

                    {item.progress !== null && item.progress !== false && (
                        <span className={`text-muted text-1 me-1 fw-bold`}>{item.progress}%</span>
                    )}
                </div>

                <div className={`custom-fields mt-1`}>
                    {children}
                </div>

                {item.dateStarted && (
                    <ActivityListInfoBlock icon={`fa-solid fa-stopwatch`}
                                           text={experienceLabel}
                                           shouldDisplayLargeText={Boolean(children)}/>
                )}

                {item.description && (
                    <ActivityListInfoBlock icon={item.dateStarted ? `fa-solid fa-comment` : ``}
                                           text={item.description}
                                           shouldDisplayLargeText={Boolean(children)}/>
                )}
            </div>
        </div>
    )
}

function ActivityListInfoBlock({icon, text, shouldDisplayLargeText}) {
    return (
        <div className={`w-100 text-muted fw-bold`}>
            <div className={`${shouldDisplayLargeText ? 'text-1' : 'text-2'}`} style={{marginTop: '2px'}}>
                {icon && (
                    <FaIcon iconName={`${icon} text-1 opacity-50 me-1`}/>
                )}

                <span dangerouslySetInnerHTML={{__html:utils.parseJsonText(text)}}/>
            </div>
        </div>
    )
}


function ActivityListItemWithProgress({ item, createdAt }) {
    const {currentTimeSpan, isBreakpoint} = useWindow()

    const skipAnimation = utils.isTouchDevice() || !isBreakpoint('xl')
    const [progressValue, setProgressValue] = useState(skipAnimation ? item.progress : 0)

    useEffect(() => {
        if(skipAnimation) {
            return
        }

        setProgressValue(0)
        setTimeout(() => {
            setProgressValue(item.progress)
        }, Math.abs(currentTimeSpan - createdAt) < 1 ? 500 : 0)
    }, [])

    return (
        <ActivityListItem item={item}>
            <CustomProgressBar now={progressValue}/>
        </ActivityListItem>
    )
}

export default ActivityList