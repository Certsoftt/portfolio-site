import {CodeOutlined, FormatPaint, Cloud, NoteRounded} from "@mui/icons-material";
import { Skill } from "./type";

export const skills: Skill = [
      {
        "title": "• Automation/Testing Tool",
        "content": "N8N, TypeForm, Git Actions(CI/CD), BrowserStack",
        "icon": NoteRounded,
        "section":[
          {
            "id":"Automation/Testing Tool",
            "Project": [
                ["Faztar","https://"],
                ["CodePack Editor", ""],
                ["Portfolio Site",""],
              ],
           "JobType": "Freelance",
            "Goal":"Built software as a service (SaaS) with automated workflow for code delivery, testing, release, preview and production with Git and Vercel, and provides solution with cleaning, fixing, and improving code quality ",
          }
        ],
      },
      {
        "title": "• Design Library/Framework",
        "content": "Styled Components, React MaterialUI, Ant Design ",
        "icon": FormatPaint,
        "section": [
          {
            "id":"Design Library/Framework",
            "Project": [
              [
                "Witgirl", "https://witgirl.org"
              ]
            ],
            "Goal": "Improve web app responsiveness and performance, reduce the use of lot dependencies by refactoring the design using React MaterialUI and redesigning re-usable components ",
            "JobType": "Contract (6 months)"
          }
        ]
      },
      {
        "title": "• Cloud Technologies",
        "content": "Firebase, ArgoCD, NocoDB, Azure",
        "icon": Cloud,
        "section":[
          {
            "id":"Cloud Technologies",
            "Project": [
              [
                "Auth Web App","https://makemore.netlify.app/"
              ]
            ],
            "Goal": "Auth system that synchronizes data from Google firebase and Google firestore store for: • OTP login, • SignIn with Google, • Email Verification & Update Password, • Cookies/Sessions and Logout",
            "JobType": "Freelance"
          }
        ]
      },
      {
        "title": "• Programming Languages",
        "content": "C++, PHP, Solidity, JavaScript, TypeScript, Python",
        "icon": CodeOutlined,
        "section": [
          {
            "id":"Programming Languages",
            "Project": [
            
                ["Gterahub Limited", "https://gterahub.com"],
                ["Techminds Academy", "https://techmindsacademy.org"]
              
            ],
            "Goal": "Contributed to the Gterahub business web app design and the microservices. Designed TechmindsAcademy LMS that works with B2B and B2C model",
            "JobType": "Contract (3-6 months)"
          }
        ],
      },
]