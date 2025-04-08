import React, {useEffect, useState} from 'react'
import Container from "../../common/Container"
import {Grid, styled, Paper, Stack, Badge, Typography} from "@mui/material"
import {FaGithub, FaStar} from "react-icons/fa6"
import { IconContext } from 'react-icons'
import {withTranslation, TFunction } from 'react-i18next';
import { RepoDataStructure } from './type';
import { PaperContainer } from './styles'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Repo = ({ t }: { t: TFunction }) => {
  const [repos, setRepos] = useState<RepoDataStructure | []>([]);
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
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {
              repos.map(repo=>
                <Grid size={{xs:12, sm:12, md:6, lg:6, xl:4}} key={repo.node_id}>
                  <Item>
                    <PaperContainer elevation={4}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Badge variant="dot">
                          <FaGithub/>
                        </Badge>
                        <span> {t(`${repo.name}`)}</span>
                        <span> ({t(`${repo.default_branch}`)})</span>
                      </Stack>
                      <Typography component="p" gutterBottom><a href={repo.clone_url}>{t(`${repo.full_name}`)}</a></Typography>
                      <Typography component="p" gutterBottom>{t(`${repo.description?.slice(0,50)}....`)}</Typography>
                      <IconContext.Provider value={{color: "grey",size:"1rem"}}>
                        <FaStar/> {t(`${repo.stargazers_count}`)} ({t(`${repo.language}`)})
                      </IconContext.Provider>
                    </PaperContainer>
                  </Item>
                </Grid>
              )
            }
          </Grid>
        </Stack>
      </Container>
    </React.Fragment>
  )
}

export default withTranslation()(Repo)