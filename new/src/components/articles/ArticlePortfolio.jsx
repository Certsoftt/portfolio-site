import React, {useEffect, useState} from 'react'
import Article from "/src/components/wrappers/Article.jsx"
import {Col, Row} from "react-bootstrap"
import {useParser} from "/src/helpers/parser.js"
import {useScheduler} from "/src/helpers/scheduler.js"
import Categorizable from "/src/components/capabilities/Categorizable.jsx"
import Expandable from "/src/components/capabilities/Expandable.jsx"
import ProjectCard from "/src/components/generic/ProjectCard.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"

const AnimationStatus = {
    INVISIBLE: "invisible",
    VISIBLE: "visible",
    VISIBLE_WITH_TWEEN: "visible_with_tween"
}

function ArticlePortfolio({ data }) {
    const parser = useParser()
    const scheduler = useScheduler()
    const {isBreakpoint} = useWindow()
    const {selectedLanguageId} = useLanguage()

    const parsedData = parser.parseArticleData(data)

    const [parsedItems, setParsedItems] = useState([])
    const [parsedCategories, setParsedCategories] = useState([])
    const [categoryFilterResult, setCategoryFilterResult] = useState(parsedItems)
    const [expandableFilterResult, setExpandableFilterResult] = useState(parsedItems)
    const [shouldAnimate, setShouldAnimate] = useState(false)
    const [skipAnimationForNextChange, setSkipAnimationForNextChange] = useState(false)

    useEffect(() => {
        const parsedItems = parser.parseArticleItems(parsedData.items)
        const parsedCategories = parser.parseArticleCategories(parsedData.categories)
        parser.bindItemsToCategories(parsedItems, parsedCategories)

        setParsedItems(parsedItems)
        setParsedCategories(parsedCategories)
        setCategoryFilterResult(parsedItems)
        setSkipAnimationForNextChange(true)
    }, [null, selectedLanguageId])

    useEffect(() => {
        if(skipAnimationForNextChange) {
            setSkipAnimationForNextChange(false)
            return
        }

        setShouldAnimate(true)
        _setAnimationStatus(AnimationStatus.INVISIBLE)
    }, [categoryFilterResult])

    useEffect(() => {
        if(shouldAnimate) {
            _setAnimationStatus(AnimationStatus.VISIBLE_WITH_TWEEN)
        }
        else {
            _setAnimationStatus(AnimationStatus.VISIBLE)
        }

        setShouldAnimate(false)
    }, [expandableFilterResult])

    useEffect(() => {
        _setAnimationStatus(AnimationStatus.VISIBLE)
    }, [])

    const _setAnimationStatus = (animationStatus) => {
        const tag = 'portfolio-grid'
        scheduler.clearAllWithTag(tag)
        const divs = document.querySelectorAll('.grid-item')

        switch(animationStatus) {
            case AnimationStatus.INVISIBLE:
                divs.forEach((div, index) => {
                    div.classList.add(`grid-item-hidden`)
                })
                break

            case AnimationStatus.VISIBLE:
                divs.forEach((div, index) => {
                    div.classList.remove(`grid-item-hidden`)
                })
                break

            case AnimationStatus.VISIBLE_WITH_TWEEN:
                divs.forEach((div, index) => {
                    div.classList.add(`grid-item-hidden`)

                    scheduler.schedule(() => {
                        div.classList.remove(`grid-item-hidden`)
                    }, 200 + 100 * index, tag)
                })
                break
        }
    }

    const _getMaxItemsPerPage = () => {
        if(isBreakpoint('xxl'))
            return 9
        if(isBreakpoint('lg'))
            return 8
        if(isBreakpoint('sm'))
            return 6
        return 4
    }

    return(
        <Article className={`article-portfolio`} title={ parsedData.title }>
            <Row className={`gx-4 gy-lg-4 gx-lg-5`}>
                <Categorizable items={parsedItems}
                               categories={parsedCategories}
                               onFilter={setCategoryFilterResult}
                               storageId={data.id + "_categorizable"}
                               controlsClass={``}>

                    <Expandable items={categoryFilterResult}
                                storageId={null}
                                onFilter={setExpandableFilterResult}
                                controlsClass={`mt-4 pt-1`}
                                maxItems={_getMaxItemsPerPage()}>

                        {expandableFilterResult.map((item, key) => (
                            <Col key={key} className={`col-12 col-sm-6 col-md-12 col-lg-6 col-xxl-4`}>
                                <ProjectCard title={item.title}
                                             subtitle={item.category.singular}
                                             text={item.text}
                                             links={item.links}
                                             options={item.mediaOptions}
                                             tags={item.tags.slice(0, 3)}
                                             img={item.img}
                                             fallbackIcon={item.faIcon}
                                             fallbackIconColors={item.faIconColors}
                                             className={`grid-item-hidden`}/>
                            </Col>
                        ))}
                    </Expandable>
                </Categorizable>
            </Row>
        </Article>
    )
}

export default ArticlePortfolio