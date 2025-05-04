import React, {useState, useEffect} from 'react'
import Container from "../../common/Container"
import {Row} from "antd"
import {Stack, IconButton, Typography, Chip, Button} from "@mui/material";
import { Slide } from "react-awesome-reveal";
import {withTranslation} from 'react-i18next';
import {skills} from './skills' 
import {fullload} from './fullload' 
import { ExperienceProps, Skill } from './type';
import Card from '../../common/Card';

const Experience = ({ t, id}:ExperienceProps) => {
  const [skill, setSkill] = useState<Skill | null>(null)
  const [clicked, setClicked] = useState(false)
  useEffect(()=>{
    setSkill(skills)
  },[])
  const loadMore = ()=>{
    setSkill(fullload)
    setClicked(true)
  }
  return (
    <React.Fragment>
      <Container>
        <Typography component="h3" variant="h3" id={id}>4 years In The Industry</Typography>
        <hr/>
        <Stack spacing={2} direction="row" sx={{marginBottom:"25px"}}>
          <Slide direction="up" triggerOnce>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {
                skill?.map(displayskill=>
                  <Card xs={24} sm={24} md={12} lg={12} xl={12} key={displayskill.title}>
                    <Stack direction="row" justifyContent="normal" spacing={1} alignItems="center" sx={{marginBottom:"10px"}}>
                      <IconButton size="small" sx={{color:"black"}}>
                        <displayskill.icon/>
                      </IconButton>
                      <Typography component="h6">{t(`${displayskill.title}`)}</Typography>
                      <Chip label={`${displayskill.section[0].JobType}`} variant="outlined" sx={{color:"white", backgroundColor:"rgb(243, 145, 115)"}}/>
                    </Stack>
                    <Stack direction="row" justifyContent="normal" spacing={1} alignItems="center" sx={{marginBottom:"10px"}}>
                    <Chip label={`Skill`} variant="outlined" sx={{color:"white", backgroundColor:"#2e186a"}}/>
                    <Typography component="p"> {t(`${displayskill.content}`)}</Typography>
                    </Stack>
                        {displayskill.section.map(section=>
                          <React.Fragment key={section.id}>
                            <Stack direction="row" justifyContent="normal" alignItems="center" spacing={2} sx={{marginBottom:"10px"}}>
                              <Chip label={`Projects`} variant="outlined" sx={{color:"white", backgroundColor:"#2e186a"}}/>
                              {section.Project.map(project=>
                                <Typography component="p" sx={{fontSize:"13px"}}><a href={`${project[1]}`} style={{color:"black"}}>{t(`${project[0]}`)}</a></Typography>
                              )}
                            </Stack>
                          </React.Fragment>
                          )
                        }
                  </Card>
                        
                )
              }
            </Row>
          </Slide>
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{marginBottom:"10px"}}>
          <Button type="button" variant="contained" onClick={loadMore} disabled={clicked} fullWidth sx={{backgroundColor:"#2e186a"}}>Load More</Button>
        </Stack>
      </Container>
    </React.Fragment>
  )
}

export default withTranslation()(Experience)