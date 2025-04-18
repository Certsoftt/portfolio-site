import React from "react"
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