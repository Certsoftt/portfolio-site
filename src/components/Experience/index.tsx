import React from 'react'
import Container from "../../common/Container"
import {Row, Col} from "antd"
import {Stack, IconButton, Typography, Chip} from "@mui/material";
import { Slide } from "react-awesome-reveal";
import {withTranslation, TFunction } from 'react-i18next';
import { DivContainer, PaperContainer } from '../Repo/styles'
import {skills} from './skills' 

const Experience = ({ t }: { t: TFunction }) => {
  return (
    <React.Fragment>
      <Container>
        <Typography component="h3" variant="h3">4 years In The Industry</Typography>
        <hr/>
        <Stack spacing={2} direction="row" sx={{marginBottom:"25px"}}>
          <Slide direction="up" triggerOnce>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {
                skills.map(skill=>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24} key={skill.title}>
                    <DivContainer>
                      <PaperContainer elevation={4}>
                        <Stack direction="row" justifyContent="normal" spacing={1} alignItems="center" sx={{marginBottom:"10px"}}>
                          <IconButton size="small" sx={{color:"blueviolet"}}>
                            <skill.icon/>
                          </IconButton>
                          <Typography variant="h6" component="h6">{t(`${skill.title}`)}</Typography>
                        </Stack>
                        <Stack direction="row" sx={{marginBottom:"10px"}}>
                        <Typography component="p"> {t(`${skill.content}`)}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="column" spacing={2}>
                            {skill.sectionOne.map(sectionone=>
                              <React.Fragment key={sectionone.id}>
                                <Stack direction="row" justifyContent="normal" alignItems="center" spacing={2} sx={{marginBottom:"10px"}}>
                                    <Chip label={`Experience`} variant="outlined" sx={{color:"CaptionText", backgroundColor:"slategray"}}/>
                                    <Typography component="p">  {t(`${sectionone.Experience}`)} </Typography>
                                  </Stack>
                                  <Stack direction="row" key={sectionone.id} justifyContent="normal" alignItems="center" spacing={2} sx={{marginBottom:"10px"}}>
                                  <Chip label={`Organization`} variant="outlined" sx={{color:"CaptionText", backgroundColor:"slategray"}}/>
                                  <Typography component="p">  {t(`${sectionone.Experience}`)} </Typography>
                                </Stack>
                              </React.Fragment>
                              )
                            }
                          </Stack>
                          <Stack direction="column" spacing={2}>
                            {skill.sectionTwo.map(sectiontwo=>{
                              Object.keys(sectiontwo).map(sectiontwo_key=>
                                <Stack direction="row" key={sectiontwo.id} justifyContent="normal" alignItems="center" spacing={2} sx={{marginBottom:"10px"}}>
                                  <Chip label={`${sectiontwo_key}`} variant="outlined" sx={{color:"CaptionText", backgroundColor:"slategray"}}/>
                                  {typeof sectiontwo[sectiontwo_key] != "object"
                                  ? <Typography component="p">  {t(`${sectiontwo[sectiontwo_key]}`)} </Typography>
                                  : sectiontwo[sectiontwo_key].map(sectiontwo_project=>{
                                    Object.keys(sectiontwo_project).map(sectiontwo_project_key=>
                                      <Typography component="p"><a href={`${sectiontwo_project[sectiontwo_project_key]}`}>{t(`${sectiontwo_project_key}`)}</a></Typography>
                                    )
                                  })
                                  }
                                </Stack>
                            )})}
                          </Stack>
                        </Stack>
                      </PaperContainer>
                    </DivContainer>
                  </Col>
                )
              }
            </Row>
          </Slide>
        </Stack>
      </Container>
    </React.Fragment>
  )
}

export default withTranslation()(Experience)