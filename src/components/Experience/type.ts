import React from "react"
import {TFunction } from 'react-i18next';
export type Skill = Array<{
    title: string;
    section:Array<{
        id: string;
        Project:string[][];
        Goal:string;
        JobType:string
    }>;
    content: string;
    icon: React.ComponentType;
}>

export type ExperienceProps = {
    id: string;
    t: TFunction
}