import React from 'react'
import Article from "/src/components/wrappers/Article.jsx"
import Swipeable from "/src/components/capabilities/Swipeable.jsx"
import {SwiperSlide} from "swiper/react"
import FunFact from "/src/components/generic/FunFact.jsx"
import {useParser} from "/src/helpers/parser.js"

function ArticleServices({ data }) {
    const parser = useParser()

    const parsedData = parser.parseArticleData(data)
    const items = parsedData.items
    parser.sortArticleItemsByDateDesc(items)

    const parsedItems = parser.parseArticleItems(items)

    return(
        <Article className={`article-services`} title={parsedData.title}>
            <Swipeable slidesPerView={4}
                       loop={true}
                       autoPlayDelay={3}>

                {parsedItems.map((item, index) => (
                    <SwiperSlide className={`custom-swiper-slide mt-2`} key={index}>
                        <FunFact    img={item.img}
                                    fallbackIcon={item.faIcon}
                                    fallbackIconColors={item.faIconColors}
                                    title={item.title}
                                    info={item.info}/>
                    </SwiperSlide>
                ))}

            </Swipeable>
        </Article>
    )
}

export default ArticleServices