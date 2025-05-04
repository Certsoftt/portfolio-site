import "./Swipeable.scss"
import React from 'react'
import { Swiper } from 'swiper/react'
import {Pagination, Autoplay} from "swiper/modules"
import {useUtils} from "/src/helpers/utils.js"

const BREAKPOINTS_WITH_THREE_SLIDES = {
    0: { slidesPerView: 1 },
    630: { slidesPerView: 2 },
    1500: { slidesPerView: 3 },
}

const BREAKPOINTS_WITH_FOUR_SLIDES = {
    0: { slidesPerView: 2 },
    900: { slidesPerView: 3 },
    1500: { slidesPerView: 4 },
}

function Swipeable({ children, loop, autoPlayDelay, slidesPerView }) {
    const utils = useUtils()

    slidesPerView = slidesPerView || 3
    slidesPerView = utils.clamp(slidesPerView, 3, 4)

    const breakpoints = slidesPerView === 3 ?
        BREAKPOINTS_WITH_THREE_SLIDES :
        BREAKPOINTS_WITH_FOUR_SLIDES

    const autoplay = {
        delay: autoPlayDelay ? autoPlayDelay * 1000 : 10000,
        disableOnInteraction: false,
    }

    return (
        <Swiper
            className="swiper-full-width"
            slidesPerView={slidesPerView}
            spaceBetween={20}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            grabCursor={true}
            preventClicksPropagation={true}
            breakpoints={breakpoints}
            loop={loop}
            autoplay={autoplay}
        >
            {children}
        </Swiper>
    )
}

export default Swipeable