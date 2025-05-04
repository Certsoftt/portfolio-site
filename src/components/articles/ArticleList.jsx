import React, {useEffect, useState} from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import Article from "/src/components/wrappers/Article.jsx"
import ActivityList from "/src/components/generic/ActivityList.jsx"
import {useParser} from "/src/helpers/parser.js"
import {useWindow} from "/src/providers/WindowProvider.jsx"

function ArticleList({ data }) {
    const parser = useParser()
    const parsedData = parser.parseArticleData(data)
    const items = parsedData.items

    const {selectedLanguageId} = useLanguage()
    const {isMobileLayout} = useWindow()
    const [listItems, setListItems] = useState([])

    const hasProgressItem = parser.hasAnyItemWithValue(items)
    const hasInfoItem = parser.hasAnyItemWithLocaleFieldNamed(items, 'info')
    const maxItems = isMobileLayout() ? 4 : 12

    let colClass = `col-12`
    if(hasProgressItem && !hasInfoItem)
        colClass = `col-12 col-md-6 col-xxl-4`
    else if(hasInfoItem && listItems.length > 4)
        colClass = `col-12 col-xl-6`

    useEffect(() => {
        const listItems = parser.formatForActivityList(items)
        setListItems(listItems)
    }, [null, selectedLanguageId])

    return(
        <Article className={`article-list`} title={parsedData.title}>
            <ActivityList items={listItems}
                          storageId={data.id + '_expandable'}
                          maxItems={maxItems}
                          colClass={colClass}/>
        </Article>
    )
}

export default ArticleList