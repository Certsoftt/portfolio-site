import "./Section.scss"
import React, {useEffect, useState} from 'react'
import {useGlobalState} from "/src/providers/GlobalStateProvider.jsx"
import Box from "/src/components/wrappers/Box.jsx"
import BorderWrap from "/src/components/wrappers/BorderWrap.jsx"
import Scrollable from "/src/components/capabilities/Scrollable.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useUtils} from "/src/helpers/utils.js"

import ArticleCards from "/src/components/articles/ArticleCards.jsx"
import ArticleContactForm from "/src/components/articles/ArticleContactForm.jsx"
import ArticleGrid from "/src/components/articles/ArticleGrid.jsx"
import ArticleInfoBlock from "/src/components/articles/ArticleInfoBlock.jsx"
import ArticleList from "/src/components/articles/ArticleList.jsx"
import ArticlePortfolio from "/src/components/articles/ArticlePortfolio.jsx"
import ArticleServices from "/src/components/articles/ArticleServices.jsx"
import ArticleTestimonials from "/src/components/articles/ArticleTestimonials.jsx"
import ArticleThread from "/src/components/articles/ArticleThread.jsx"
import ArticleTimeline from "/src/components/articles/ArticleTimeline.jsx"
import FullScreenToggleButton from "/src/components/widgets/FullScreenToggleButton"
import {useData} from "/src/providers/DataProvider.jsx"
import FaIcon from "/src/components/generic/FaIcon.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"
import {useScheduler} from "/src/helpers/scheduler.js"

const TransitionClasses = {
    HIDDEN: 'section-transition-hidden',
    HIDING: 'section-transition-hiding',
    SHOWING: 'section-transition-showing',
    SHOWN: 'section-transition-shown',
    FORCE_SHOW: 'section-transition-show-without-transition'
}

const ARTICLES = {
    ArticleCards,
    ArticleContactForm,
    ArticleGrid,
    ArticleInfoBlock,
    ArticleList,
    ArticlePortfolio,
    ArticleServices,
    ArticleTestimonials,
    ArticleThread,
    ArticleTimeline
}

const utils = useUtils()
const scheduler = useScheduler()

function Section({ section }) {
    const {getSettings} = useData()
    const {isSectionActive, didRenderFirstSection, setDidRenderFirstSection} = useGlobalState()
    const {isBreakpoint, isMobileLayout, focusMainView} = useWindow()
    const [transitionClass, setTransitionClass] = useState(TransitionClasses.HIDDEN)

    const settings = getSettings()
    const scrollableEnabled = !isMobileLayout() && !utils.isTouchDevice()
    const articles = section.content && section.content["articles"] ?
        section.content["articles"] :
        []

    useEffect(() => {
        const isActive = isSectionActive(section.id)
        if(isActive) {
            _showSection()
        }
        else {
            _hideSection()
        }
    }, [isSectionActive(section.id)])

    const _showSection = () => {
        if(transitionClass === TransitionClasses.SHOWN)
            return

        if(didRenderFirstSection) {
            setTransitionClass(TransitionClasses.SHOWING)
            scheduler.clearAllWithTag('section-' + section.id)
            _changeStateAfterTimeout(TransitionClasses.SHOWN, 30)
        }
        else {
            setDidRenderFirstSection(true)
            setTransitionClass(TransitionClasses.SHOWN)
        }
    }

    const _hideSection = () => {
        if(transitionClass === TransitionClasses.HIDDEN)
            return

        setTransitionClass(TransitionClasses.FORCE_SHOW)
        scheduler.clearAllWithTag('section-' + section.id)
        _changeStateAfterTimeout(TransitionClasses.HIDING, 30)
        _changeStateAfterTimeout(TransitionClasses.HIDDEN, 1000)
    }

    const _changeStateAfterTimeout = (state, timeInMilliseconds) => {
        scheduler.schedule(() => {
            setTransitionClass(state)
        }, timeInMilliseconds, 'section-' + section.id)
    }

    return (
        <>
            {transitionClass !== TransitionClasses.HIDDEN && (
                <Box className={`lead-section ${transitionClass}`} opaque={true} id={`lead-section-${section.id}`}>

                    <div className={`lead-section-content`}>
                        {settings['fullScreenButtonEnabled'] && !utils.isIOS() && !isMobileLayout() && !utils.isSafari() && (
                            <div className={`full-screen-toggle-wrapper ${isBreakpoint('lg') ? 'full-screen-toggle-wrapper-top-right' : 'full-screen-toggle-wrapper-top-left'}`}>
                                <FullScreenToggleButton enabled={true}
                                                        className={`fullscreen-toggle`}/>
                            </div>)
                        }

                        <Scrollable id={`scrollable-${section.id}`}
                                    scrollActive={transitionClass === TransitionClasses.SHOWN}
                                    scrollEnabled={transitionClass !== TransitionClasses.HIDDEN && scrollableEnabled}>
                            <BorderWrap>
                                <section className={`w-100`}>
                                    <SectionHeader section={section}/>
                                    <SectionContent articles={articles}/>
                                </section>
                            </BorderWrap>
                        </Scrollable>
                    </div>
                </Box>
            )}
        </>
    )
}

function SectionHeader({section}) {
    const {getTranslation} = useLanguage()
    const {isBreakpoint} = useWindow()

    let title = utils.parseJsonText(getTranslation(section.content["locales"], "title_long"))
    let prefix = utils.parseJsonText(getTranslation(section.content["locales"], "title_long_prefix", true))
    if(!isBreakpoint("lg")) {
        title = getTranslation(section.content["locales"], "title")
        title = `<span class="text-highlight">${title}</span>`
        prefix = null
    }

    return (
        <div className={`section-header w-100 px-0 px-md-3 text-center ${prefix ? `mt-0` : `mt-1 mt-sm-2 mt-lg-4`}`}>
            {prefix && (
                <div className={`fw-bold text-muted lead-2 font-family-headings mb-2`}>
                    <FaIcon className={`me-2 opacity-50`} iconName={'fa-solid fa-cubes'}/>
                    <span dangerouslySetInnerHTML={{__html:prefix || ``}}/>
                </div>
            )}

            <h3 className={`fw-bold ${isBreakpoint('lg') ? 'lead-4' : ''} mx-4 mb-0`}
                dangerouslySetInnerHTML={{__html: title}}/>
        </div>
    )
}

function SectionContent({articles}) {
    const shouldAddSpacerAfterTitle = false

    return (
        <div className={`section-content ${shouldAddSpacerAfterTitle ? 'mt-md-5' : ''}`}>
            {articles.map((article, key) => {
                const Component = ARTICLES[article.component]
                let mtClass = `mt-4 pt-1 pt-md-3`
                if(article.config?.ignorePaddingTop)
                    mtClass = `mt-4`

                return (
                    <div className={`article-wrapper ${mtClass}`} key={key}>
                        {Component && (
                            <Component data={article}/>
                        )}

                        {!Component && (
                            <div className={`alert alert-danger text-3`}>
                                Component <strong>{article.component}</strong> not found! Make sure the component exists and is listed on the <i>ARTICLES</i> dictionary on <b>Section.jsx</b>.
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Section