import React from 'react'
import Article from "/src/components/wrappers/Article.jsx"
import Testimonial from "/src/components/generic/Testimonial.jsx"
import Swipeable from "/src/components/capabilities/Swipeable.jsx"
import { SwiperSlide } from 'swiper/react'
import {useParser} from "/src/helpers/parser.js"

function ArticleTestimonials({ data }) {
    const parser = useParser()

    const parsedData = parser.parseArticleData(data)
    const items = parsedData.items
    parser.sortArticleItemsByDateDesc(items)

    const parsedItems = parser.parseArticleItems(items)

    return(
        <Article className={`article-testimonials`} title={ parsedData.title }>
            <Swipeable>
                {parsedItems.map((item, index) => (
                    <SwiperSlide className={`custom-swiper-slide`} key={index}>
                        <Testimonial quote={item.text}
                                     avatar={item.img}
                                     fallbackIcon={item.faIcon}
                                     fallbackIconColors={item.faIconColors}
                                     author={item.value}
                                     href={item.firstLink?.href}
                                     role={item.info}/>
                    </SwiperSlide>
                ))}
            </Swipeable>
        </Article>
    )
}

export default ArticleTestimonials