import React, {useEffect, useState} from 'react'
import Container from "../../common/Container"
import {Row, Col} from "antd"
import {Stack, Badge, Typography, Button} from "@mui/material";
import {StarBorder, GitHub} from "@mui/icons-material";
import { Slide } from "react-awesome-reveal";
import {withTranslation} from 'react-i18next';
import { RepoDataStructure, RepoProps } from './type';
import Card from '../../common/Card';

const Repo = ({ t, id }:RepoProps) => {
  const [repos, setRepos] = useState<RepoDataStructure | null>(null);
  const [clicked, setClicked] = useState(false)
  useEffect(()=>{
    fetchRepos()
  },[])
  const fetchRepos = async ()=>{
    const response = await fetch('https://api.github.com/users/certsoftt/repos')
    const data = response.json()

    data.then((result)=>{
        setRepos(result)
    })
  }
  const loadMore = async ()=>{
    setClicked(true)
    const response = await fetch('https://api.github.com/users/certsoftt/repos')
    const data = response.json()

    data.then((result)=>{
        setRepos(result)
    })
    } 
  return (
    <React.Fragment>
      <Container>
        <Typography component="h3" variant="h3" id={id}>My Repositries</Typography>
        <hr/>
        <Stack spacing={2} direction="row" sx={{marginBottom:"25px"}}>
          <Slide direction="up" triggerOnce>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {
                repos?.map(repo=>
                  <Card xs={24} sm={24} md={12} lg={8} xl={8} key={repo.node_id}>
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

export default withTranslation()(Repo)