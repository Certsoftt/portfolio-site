import "./BorderWrap.scss"

function BorderWrap({ children, className, id, bottomBorder }) {
    return (
        <div className={`border-wrap ${className}`} id={id}>
            <div className={`border-wrap-block-top`}/>

            <div className={`border-wrap-content`}>
                {children}
            </div>

            {bottomBorder && (
                <div className={`border-wrap-block-bottom`}/>
            )}
        </div>
    )
}

export default BorderWrap