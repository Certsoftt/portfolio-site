import "./ProjectCard.scss"
import React from 'react'
import CircleAvatar from "/src/components/generic/CircleAvatar.jsx"
import {Card, CardBody} from "react-bootstrap"
import Tags from "/src/components/generic/Tags.jsx"
import CircularButtonList from "/src/components/generic/CircularButtonList.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"

function ProjectCard({className, img, fallbackIcon, fallbackIconColors, title, subtitle, text, links, options, tags}) {
    const {displayYoutubeVideo, displayGallery} = useFeedbacks()
    const {isBreakpoint} = useWindow()

    const hasLinks = Boolean(links && links.length)

    const _onOptionClicked = (option) => {
        switch (option.id) {
            case "youtube":
                displayYoutubeVideo(option.target, title, text)
                break

            case "gallery":
                displayGallery(option.target.images || [], option.target.aspectRatio, title, text)
                break
        }
    }

    return (
        <Card className={`grid-item ${className}`}>
            <CardBody>
                <CircleAvatar size={isBreakpoint('xl') ? 3 : 2}
                              dynamicSize={false}
                              img={img}
                              fallbackIcon={fallbackIcon}
                              fallbackIconColors={fallbackIconColors}/>

                <div className={`title-wrapper`}>
                    <h5 className={`title fw-bold mb-0 text-highlight`}>{title}</h5>
                    <span className={`font-family-subheadings fw-bold text-muted text-1 ms-1`}>{subtitle}</span>
                </div>

                <div className={`tags-wrapper text-2 mt-2`}>
                    <Tags strings={tags} shorten={true}/>
                </div>

                {text && (
                    <div className={`main-content-wrapper mt-2 mb-3`}>
                        <div className={`text opacity-75`}
                             dangerouslySetInnerHTML={{__html: text}}/>
                    </div>
                )}

                <div className={`links-wrapper ${!text ? 'mt-3' : ''}`}>
                    {hasLinks && (<CircularButtonList links={links}/>)}
                    <CircularButtonList options={options} onOptionClicked={_onOptionClicked}/>
                </div>
            </CardBody>
        </Card>
    )
}

export default ProjectCard