import React, {useEffect, useState} from 'react'
import Article from "/src/components/wrappers/Article.jsx"
import InlineList from "/src/components/generic/InlineList.jsx"
import InfoGrid from "/src/components/generic/InfoGrid.jsx"
import {useParser} from "/src/helpers/parser.js"
import Expandable from "/src/components/capabilities/Expandable.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"

function ArticleGrid({ data }) {
    const {isBreakpoint, isMobileLayout} = useWindow()
    const {selectedLanguageId} = useLanguage()
    const parser = useParser()

    const [parsedItems, setParsedItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])

    const supportedFormats = ['inline', 'grid']
    const parsedData = parser.parseArticleData(data, supportedFormats)

    useEffect(() => {
        const formattedItems = parser.formatForGrid(parsedData.items)
        setParsedItems(formattedItems)
    }, [null, selectedLanguageId])

    return (
        <Article className={`article-grid`} title={parsedData.title}>
            <div className={`text-center`}>
                {parsedData.config.format === 'inline' && (
                    <InlineList items={parsedItems} textClass={!isBreakpoint('sm') ? 'text-3' : 'text-4'}/>
                )}
            </div>

            {parsedData.config.format === 'grid' && (
                <Expandable items={parsedItems}
                            storageId={data.id + "_expandable"}
                            onFilter={setFilteredItems}
                            controlsClass={`pt-3`}
                            maxItems={isMobileLayout() ? 4 : 10}
                            stepAmount={4}>
                    <InfoGrid items={filteredItems}/>
                </Expandable>
            )}
        </Article>
    )
}

export default ArticleGrid