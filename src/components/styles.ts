import styled from "styled-components"
import {Paper} from "@mui/material"

export const PaperContainer = styled(Paper)<{
  sx?:{height:string}  
}>`
margin-top:20px; 
padding-top:15px; 
padding-left:15px; 
padding-right:15px; 
border-radius:10px;
height:${(props)=>(props.sx?.height?props.sx.height:"200px")};
`;

export const DivContainer = styled('div')`
padding: 8px 0;
`