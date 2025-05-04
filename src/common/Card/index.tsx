import React from 'react'
import { CardProps } from './type'
import { Col } from 'antd'
import { DivContainer, PaperContainer } from '../../components/styles'

const Card = ({xs,sm,md,lg,xl,key, children}:CardProps) => {
  return (
    <React.Fragment>
      <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={key}>
        <DivContainer>
          <PaperContainer elevation={4}>
            {children}
          </PaperContainer>
        </DivContainer>
      </Col>
    </React.Fragment>
  )
}

export default Card