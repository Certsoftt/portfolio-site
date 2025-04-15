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
                                <Stack direction="row" justifyContent="normal" alignItems="center" spacing={2} sx={{marginBottom:"10px"}}>
                                  <Chip label={`Organization`} variant="outlined" sx={{color:"CaptionText", backgroundColor:"slategray"}}/>
                                  {sectionone.Organization.map(org=>
                                  {Object.entries(org).map(item=>
                                    <Typography component="p">
                                      <a href={`${item[1]}`}>{t(`${item[0]}`)}</a>
                                    </Typography>
                                  )})}
                                </Stack>
                                <Stack direction="row" justifyContent="normal" alignItems="center" spacing={2} sx={{marginBottom:"10px"}}>
                                  <Chip label={`Position`} variant="outlined" sx={{color:"CaptionText", backgroundColor:"slategray"}}/>
                                  <Typography component="p">  {t(`${sectionone.Position}`)} </Typography>
                                </Stack>
                              </React.Fragment>
                              )
                            }
                          </Stack>
                          <Stack direction="column" spacing={2}>
                            {skill.sectionTwo.map(sectiontwo=>{
                              <React.Fragment key={sectiontwo.id}>
                                <Stack direction="row" justifyContent="normal" alignItems="center" spacing={2} sx={{marginBottom:"10px"}}>
                                  <Chip label={`Organization`} variant="outlined" sx={{color:"CaptionText", backgroundColor:"slategray"}}/>
                                  {sectiontwo.Project.map(org=>
                                  {Object.entries(org).map(item=>
                                    <Typography component="p">
                                      <a href={`${item[1]}`}>{t(`${item[0]}`)}</a>
                                    </Typography>
                                  )})}
                                </Stack>
                                <Stack direction="row" justifyContent="normal" alignItems="center" spacing={2} sx={{marginBottom:"10px"}}>
                                  <Chip label={`Experience`} variant="outlined" sx={{color:"CaptionText", backgroundColor:"slategray"}}/>
                                  <Typography component="p">  {t(`${sectiontwo.Goal}`)} </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="normal" alignItems="center" spacing={2} sx={{marginBottom:"10px"}}>
                                  <Chip label={`Position`} variant="outlined" sx={{color:"CaptionText", backgroundColor:"slategray"}}/>
                                  <Typography component="p">  {t(`${sectiontwo.JobType}`)} </Typography>
                                </Stack>
                              </React.Fragment>
                            })}
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