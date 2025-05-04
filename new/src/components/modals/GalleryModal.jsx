import "./GalleryModal.scss"
import React, {useEffect, useState} from 'react'
import {Modal, ModalWindowTransparent} from "/src/components/modals/Modal.jsx"
import {useUtils} from "/src/helpers/utils.js"
import {useScheduler} from "/src/helpers/scheduler.js"

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { Zoom, Pagination } from 'swiper/modules'
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"

const RATIO_CLASSES = {
    "16:9": "swiper-slide-landscape",
    "9:16": "swiper-slide-portrait",
}

function GalleryModal({ displayingGallery, hideGallery }) {
    const {showActivitySpinner, hideActivitySpinner} = useFeedbacks()
    const utils = useUtils()
    const scheduler = useScheduler()
    const {isBreakpoint} = useWindow()

    const [images, setImages] = useState(null)
    const [aspectRatio, setAspectRatio] = useState(null)
    const tag = 'gallery'
    const direction = aspectRatio === '16:9' && !isBreakpoint('xl') && !utils.isAndroid() ? 'vertical' : 'horizontal'

    useEffect(() => {
        if(!displayingGallery)
            return

        showActivitySpinner(tag)
        scheduler.clearAllWithTag(tag)
        scheduler.schedule(() => {
            setImages(displayingGallery.screenshots || [])
            setAspectRatio(displayingGallery.aspectRatio)

            if(!RATIO_CLASSES[displayingGallery.aspectRatio]) {
                throw new Error("Aspect ratio " + aspectRatio + " not supported by the gallery viewer component. The supported ratios are 16:9 and 9:16.")
            }
        }, 100, tag)

        scheduler.schedule(() => {
            _checkLoadCompletion()
        }, 200, tag)

    }, [displayingGallery])

    const _checkLoadCompletion = () => {
        scheduler.clearAllWithTag(tag)
        scheduler.interval(() => {
            const ready = utils.didLoadAllImages('.swiper-image')
            if(ready) {
                scheduler.clearAllWithTag(tag)
                hideActivitySpinner(tag)
            }
        }, 300, tag)
    }

    const _close = () => {
        setImages(null)
        setAspectRatio(null)
        hideGallery()
    }

    return (
        <Modal  id={`gallery-modal`}
                visible={Boolean(displayingGallery)}>

            {images && aspectRatio && (
                <ModalWindowTransparent transparent={true} onClose={_close}>
                    <Swiper
                        zoom={true}
                        slidesPerView={'auto'}
                        spaceBetween={10}
                        direction={direction}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Zoom, Pagination]}
                        className={`gallery-swiper ${direction === 'vertical' ? 'gallery-swiper-no-bullets' : ''}`}
                    >
                        {images.map((imgUrl, key) => (
                            <SwiperSlide key={key} className={RATIO_CLASSES[aspectRatio]}>
                                <div className={`swiper-zoom-container`}>
                                    <img className={`swiper-image`} alt={`img-` + key} src={utils.resolvePath(imgUrl)}/>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </ModalWindowTransparent>
            )}
        </Modal>
    )
}

export default GalleryModal