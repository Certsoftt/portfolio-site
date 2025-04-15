import React, {useEffect, useState} from 'react'
import Container from "../../common/Container"
import {Row, Col} from "antd"
import {Stack, Badge, Typography} from "@mui/material";
import {StarBorder, GitHub} from "@mui/icons-material";
import { Slide } from "react-awesome-reveal";
import {withTranslation, TFunction } from 'react-i18next';
import { RepoDataStructure } from './type';
import { DivContainer, PaperContainer } from './styles' 

const Repo = ({ t }: { t: TFunction }) => {
  const [repos, setRepos] = useState<RepoDataStructure | string[]>([]);
  useEffect(()=>{
    fetchRepos()
  },[])
  const fetchRepos = async ()=>{
    const response = await fetch('https://api.github.com/users/certsoftt/repos')
    const data = response.json()

    data.then((result:RepoDataStructure)=>{
        setRepos(result)
    })
  } 
  return (
    <React.Fragment>
      <Container>
        <Typography component="h3" variant="h3">My Repositries</Typography>
        <hr/>
        <Stack spacing={2} direction="row" sx={{marginBottom:"25px"}}>
          <Slide direction="up" triggerOnce>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {
                repos.map(repo=>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8} key={repo.node_id}>
                    <DivContainer>
                      <PaperContainer elevation={4}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Badge variant="dot">
                            <GitHub sx={{fontSize: "small"}}/>
                          </Badge>
                          <span> {t(`${repo.name}`)}</span>
                          <span> ({t(`${repo.default_branch}`)})</span>
                        </Stack>
                        <Typography component="p" gutterBottom><a href={repo.clone_url}>{t(`${repo.full_name}`)}</a></Typography>
                        <Typography component="p" gutterBottom>{t(`${repo.description?.slice(0,50)}....`)}</Typography>
                          <StarBorder sx={{fontSize:"small"}}/> {t(`${repo.stargazers_count}`)} ({t(`${repo.language}`)})
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

export default withTranslation()(Repo)