import React from "react"
export type Skill = Array<{
    title: string;
    sectionOne:Array<{
        id: string;
        Organization: {}[];
        Experience:string;
        Position:string;
    }>;
    sectionTwo:Array<{
        id: string;
        Project:{}[];
        Goal:string;
        JobType:string
    }>;
    content: string;
    icon: React.ComponentType;
}>