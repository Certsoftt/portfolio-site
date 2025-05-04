export const useUtils = () => {
    const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, '')

    const RANDOM_COLOR_ARRAY = [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(197,176,255)',
        'rgb(142, 227, 197)',
        'rgb(238, 183, 154)',
        'rgb(164,205,253)',
        'rgb(246,169,255)',
        'rgb(171, 235, 198)',
        'rgb(255, 201, 214)',
        'rgb(209, 247, 200)',
        'rgb(235, 214, 169)',
        'rgb(174, 229, 248)',
        'rgb(246, 224, 196)',
        'rgb(255, 217, 232)'
    ]

    /**
     * @param {String} className
     */
    const addClassToBody = (className) => {
        document.body.classList.add(className)
    }

    /**
     * @param {String} className
     */
    const removeClassFromBody = (className) => {
        document.body.classList.remove(className)
    }

    /** @return {number} */
    const clamp = (value, min, max) => {
        return Math.min(Math.max(value, min), max)
    }

    /** @return {string} */
    const getBootstrapColor = (colorName) => {
        const root = document.documentElement
        return getComputedStyle(root).getPropertyValue('--bs-' + colorName).trim()
    }

    /** @return {string} */
    const getRootSCSSVariable = (colorName) => {
        const root = document.documentElement
        return getComputedStyle(root).getPropertyValue('--' + colorName).trim()
    }

    /** @return {string|null} */
    const resolvePath = (path) => {
        if(!path) {
            return null
        }

        if(path.charAt(0) !== '/') {
            path = '/' + path
        }

        return BASE_URL + path
    }

    /**
     * @param {boolean} condition
     * @param {string} string
     * @return {string|*}
     */
    const strIf = (condition, string) => {
        if(condition)
            return string
        return ''
    }

    /**
     * @param {string} prefix
     * @return {string}
     */
    const randomTag = (prefix) => {
        return prefix + new Date().getTime() + '-r-' + Math.random().toFixed(3).replace('.', '')
    }

    /**
     * @param {HTMLElement} element
     * @param {number} [offset=0]
     * @return {boolean}
     */
    const isElementOutsideBounds = (element, offset) => {
        offset = offset || 0
        if(!element)
            return true

        const rect = element.getBoundingClientRect()
        if(!rect)
            return true

        return (
            rect.bottom + offset < 0 ||
            rect.right + offset < 0 ||
            rect.left - offset > window.innerWidth ||
            rect.top - offset > window.innerHeight
        )
    }

    /** @return {boolean} **/
    const isAndroid = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /android/.test(userAgent);
    }

    /** @return {boolean} **/
    const isIOS = () => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /iphone|ipad|ipod/.test(userAgent)
    }

    /** @return {boolean} **/
    const isIPad = () => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /ipad/.test(userAgent)
    }

    /** @return {boolean} **/
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0))
    }

    /** @return {boolean} **/
    const isChrome = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera
        return /CriOS/.test(userAgent)
    }

    /** @return {boolean} **/
    const isFirefox = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return /Firefox/.test(userAgent);
    }

    /** @return {boolean} **/
    const isSafari = () => {
        const userAgent = navigator.userAgent;
        return /^((?!chrome|android).)*safari/i.test(userAgent);
    }

    /** @return {string} **/
    const parseJsonText = (text) => {
        if(typeof text !== 'string')
            return text

        let parsed = text
        parsed = parsed.replace(/\*\*(.*?)\*\*/g, `<span class="text-highlight">$1</span>`)
        return parsed
    }

    /** @return {string} **/
    const limitTextSize = (string, maxChars) => {
        if(string.length <= maxChars) {
            return string
        }

        return string.substring(0, maxChars - 5) + '(...)'
    }

    /** @return {boolean} **/
    const didLoadAllImages = (querySelector) => {
        const images = document.querySelectorAll(querySelector || 'img')
        let allLoaded = true

        images.forEach((img) => {
            if (!img.complete || img.naturalHeight === 0) {
                allLoaded = false;
            }
        })

        return allLoaded
    }

    /** @return {string| null} **/
    const formatDate = (rawDate, languageId, displayMonthAsString, hideDay) => {
        if(!rawDate || rawDate === '')
            return ''

        if(!rawDate.includes('/'))
            return rawDate

        const options = {
            'year': 'numeric',
            'month': displayMonthAsString ? 'short' : 'numeric',
            'day': !hideDay ? 'numeric' : undefined
        }

        const date = new Date(rawDate)
        date.setDate(date.getDate() + 1)

        let localization = date.toLocaleString(languageId, options)
        localization = localization.charAt(0).toUpperCase() + localization.slice(1)
        return localization
    }

    /** @return {string| null} **/
    const formatDateInterval = (rawDateStart, rawDateEnd, languageId, displayMonthAsString, hideDay) => {
        let str = ''
        const formattedStart = formatDate(rawDateStart, languageId, displayMonthAsString, hideDay)
        const formattedEnd = formatDate(rawDateEnd, languageId, displayMonthAsString, hideDay)

        if(formattedStart !== '') {
            str += formattedStart
        }

        if(formattedEnd !== '') {
            if(str.length !== 0) {
                str += ' ➔ '
            }

            str += formattedEnd
        }

        return str
    }

    /** @return {Number} **/
    const getYearsPassedSince = (rawDate) => {
        if(!rawDate)
            return 0

        const pastDate = new Date(rawDate)
        const currentDate = new Date()
        const differenceInMilliseconds = currentDate - pastDate
        const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000

        return differenceInMilliseconds / millisecondsPerYear
    }

    /**
     * @param {string} url
     * @return {boolean}
     */
    const isUrlExternal = (url) => {
        const link = document.createElement('a')
        link.href = url
        return link.hostname !== window.location.hostname;
    }

    /**
     * @param {Boolean} enabled
     */
    const setPageScrollingEnabled = (enabled) => {
        const body = document.body

        if(!enabled) {
            window.savedScrollY = window.scrollY
            body.classList.add(`body-no-scroll`)
            if(isIOS()) {
                body.classList.add(`position-fixed`)
            }
        }
        else {
            body.classList.remove(`body-no-scroll`)
            body.classList.remove(`position-fixed`)

            if(window.savedScrollY) {
                window.scrollTo(0, window.savedScrollY)
                window.savedScrollY = null
            }
        }
    }

    /**
     * @param {number} colorId
     * @return {string}
     */
    const getColorForChart = (colorId) => {
        return RANDOM_COLOR_ARRAY[colorId]
    }

    return {
        addClassToBody,
        removeClassFromBody,
        clamp,
        getBootstrapColor,
        getRootSCSSVariable,
        resolvePath,
        strIf,
        randomTag,
        isElementOutsideBounds,
        isAndroid,
        isIOS,
        isIPad,
        isTouchDevice,
        isChrome,
        isFirefox,
        isSafari,
        parseJsonText,
        limitTextSize,
        didLoadAllImages,
        formatDate,
        formatDateInterval,
        getYearsPassedSince,
        isUrlExternal,
        setPageScrollingEnabled,
        getColorForChart
    }
}