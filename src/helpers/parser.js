import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useUtils} from "/src/helpers/utils.js"
import {forEach} from "react-bootstrap/ElementChildren"

export const useParser = () => {
    const {getString, getTranslation, selectedLanguageId} = useLanguage()
    const utils = useUtils()

    const parseArticleData = (articleData, supportedFormats) => {
        supportedFormats = supportedFormats || []
        articleData.locales = articleData.locales || {}
        articleData.items = articleData.items || []
        articleData.categories = articleData.categories || []

        if(supportedFormats.length && supportedFormats.includes(articleData.config.format) === false) {
            console.warn(`The format ${articleData.config.format} is invalid for the article with ID ${articleData.id}.`)
        }

        return {
            id: articleData.id,
            title: getTranslation(articleData.locales, 'title', true),
            items: articleData.items,
            categories: articleData.categories,
            config: articleData.config
        }
    }

    const parseArticleCategories = (rawCategories) => {
        for(const category of rawCategories) {
            if(category.locales) {
                category.singular = getTranslation(category.locales, 'singular')
                category.plural = getTranslation(category.locales, 'plural')
            }
        }

        return rawCategories
    }

    const hasAnyItemWithValue = (rawItems) => {
        return rawItems.some(item => item.value)
    }

    const hasAnyItemWithLocaleFieldNamed = (rawItems, fieldName) => {
        return rawItems.some(item => getTranslation(item['locales'], fieldName, true))
    }

    const sortArticleItemsByDateDesc = (rawItems) => {
        rawItems.sort((a, b) => {
            const dateA = a.dates?.start ? new Date(a.dates.start) : null
            const dateB = b.dates?.start ? new Date(b.dates.start) : null

            if (!dateA && !dateB) return 0
            if (!dateA) return 1
            if (!dateB) return -1

            return dateB - dateA
        })
    }

    const parseArticleItems = (rawItems, options) => {
        options = options || {}
        options.hideDayFromDates = options.hideDayFromDates || true

        return rawItems.map((item, key) => {
            const locales = item['locales']
            const icon = item['icon']
            const dates = item['dates']
            const links = item['links']
            const media = item['media']

            const parsedItem = {}
            parsedItem.title = utils.parseJsonText(getTranslation(locales, "title"))
            parsedItem.info = utils.parseJsonText(getTranslation(locales, "info", true))
            parsedItem.text = utils.parseJsonText(getTranslation(locales, "text", true))
            parsedItem.tags = getTranslation(locales, "tags", true) || []

            parsedItem.img = icon && icon.img ? utils.resolvePath(icon.img) : null
            parsedItem.faIcon = icon?.fa || null
            parsedItem.faIconColors = icon?.faColors || null

            parsedItem.dateInterval = dates ?
                utils.formatDateInterval(dates?.start, dates?.end, selectedLanguageId, true, options.hideDayFromDates) :
                null
            parsedItem.dateStarted = dates?.start
            parsedItem.dateEnded = dates?.end

            parsedItem.links = links ? links.map((link, key) => {
                return {
                    href: link.href,
                    hrefLabel: getString(link.string || 'link'),
                    faIcon: link.faIcon
                }
            }) : []

            parsedItem.mediaOptions = []
            if(media) {
                const screenshots = item.media['screenshots']
                const youtubeVideo = item.media['youtubeVideo']

                if(screenshots && screenshots.images?.length) {
                    parsedItem.mediaOptions.push({
                        id: "gallery",
                        target: screenshots,
                        tooltip: getString('open_gallery'),
                        faIcon: 'fa-solid fa-camera'
                    })
                }

                if(youtubeVideo) {
                    parsedItem.mediaOptions.push({
                        id: "youtube",
                        target: youtubeVideo,
                        tooltip: getString('watch_video'),
                        faIcon: 'fa-brands fa-youtube'
                    })
                }
            }

            parsedItem.categoryId = item['categoryId']
            parsedItem.firstLink = parsedItem.links?.length ? parsedItem.links[0] : null
            parsedItem.value = item['value']

            return parsedItem
        })
    }

    const bindItemsToCategories = (parsedItems, parsedCategories) => {
        parsedItems.forEach(item => {
            item.category = parsedCategories.find(category => category.id === item.categoryId)
        })
    }

    const formatForGrid = (rawItems) => {
        const parsedItems = parseArticleItems(rawItems)
        for(const item of parsedItems) {
            item.value = item.value || item.info
            item.label = item.value
            item.href = item.firstLink?.href
        }

        return parsedItems
    }

    const formatForActivityList = (rawItems) => {
        const parsedItems = parseArticleItems(rawItems)
        for(const item of parsedItems) {
            const titleSuffix = item.tags.length ? ' – ' : ''
            item.title = item.title + titleSuffix

            item.progress = item.value !== null && item.value !== undefined ? Number(item.value) : null
            item.description = item.info
            item.fallbackIcon = item.faIcon
            item.fallbackIconColors = item.faIconColors
        }

        return parsedItems
    }

    const formatForThreads = (rawItems) => {
        const parsedItems = parseArticleItems(rawItems)
        for(const item of parsedItems) {
            item.date = item.dateInterval
            item.place = item.info
            item.description = item.text
            item.href = item.firstLink?.href
            item.hrefLabel = item.firstLink?.hrefLabel
        }

        return parsedItems
    }

    const formatForTimeline = (rawItems) => {
        return parseArticleItems(rawItems)
    }

    return {
        parseArticleData,
        parseArticleCategories,
        hasAnyItemWithValue,
        hasAnyItemWithLocaleFieldNamed,
        sortArticleItemsByDateDesc,
        parseArticleItems,
        bindItemsToCategories,
        formatForGrid,
        formatForActivityList,
        formatForThreads,
        formatForTimeline
    }
}