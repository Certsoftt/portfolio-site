import "./InfoGrid.scss"
import React from 'react'
import {Col, Row, Card, CardBody} from "react-bootstrap"
import CircleAvatar from "/src/components/generic/CircleAvatar.jsx"
import ExternalLink from "/src/components/generic/ExternalLink.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"

function InfoGrid({items}) {
    return (
        <Row className={`info-grid gy-3 gy-xl-4`}>
            {items.map((item, key) => (
                <Col key={key} className={`col-12 col-sm-6 col-md-12 col-xl-6`}>
                    <InfoGridItem item={item}/>
                </Col>
            ))}
        </Row>
    )
}

function InfoGridItem({item}) {
    const {isMobileLayout} = useWindow()

    return (
        <Card className={`info-grid-item`}>
            <CardBody>
                <div className={`avatar-wrapper me-3`}>
                    <CircleAvatar size={isMobileLayout() ? 1 : 2}
                                  dynamicSize={false}
                                  img={item.img}
                                  fallbackIcon={item.faIcon}
                                  fallbackIconColors={item.faIconColors}/>
                </div>

                <div className={`text-wrapper`}>
                    <h6 className={`fw-bold mb-1`}>{item.title}</h6>
                    {item.href && (<ExternalLink href={item.href} className={`text-3 fw-bold`}>{item.value}</ExternalLink>)}
                    {!item.href && (<span className={`text-3 text-muted`}>{item.value}</span>)}
                </div>
            </CardBody>
        </Card>
    )
}

export default InfoGrid