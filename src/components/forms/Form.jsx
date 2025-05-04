import React from 'react'
import {Row, Col} from "react-bootstrap"
import FaIcon from "/src/components/generic/FaIcon.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"

function Form({children, id, submitLabel, submitIcon, onSubmit}) {
    const {getString} = useLanguage()

    submitIcon = submitIcon || 'fa-solid fa-circle'
    submitLabel = submitLabel || getString('submit')

    return (
        <form id={id} onSubmit={onSubmit} className={`mt-4 pt-0 pt-xl-2`}>
            <Row>
                {children}

                <Col className={`col-12 text-center mt-2`}>
                    <button className={`btn btn-xl btn-highlight`} type={`submit`}>
                        <FaIcon iconName={`${submitIcon} me-2`}/>
                        {submitLabel}
                    </button>
                </Col>
            </Row>
        </form>
    )
}

export default Form