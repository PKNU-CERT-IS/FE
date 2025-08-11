import { MembersDataType } from "@/types/members";

export const mockMembersData: MembersDataType[] = [
  {
    id: 1,
    name: "김동아리",
    role: "회장",
    grade: "4",
    major: "컴퓨터공학과",
    profileImage: "/placeholder.svg?height=80&width=80",
    email: "president@club.com",
    githubUrl: "github.com/president",
    skills: ["React", "Node.js", "Python", "AWS"],
    description:
      "풀스택 개발자를 꿈꾸며 다양한 프로젝트를 진행하고 있습니다. 팀워크와 소통을 중시합니다.",
    studentId: "20201234",
  },
  {
    id: 2,
    name: "이부회장",
    role: "부회장",
    grade: "3",
    major: "소프트웨어학과",
    email: "vicepresident@club.com",
    githubUrl: "github.com/vicepresident",
    skills: ["JavaScript", "TypeScript", "React", "Vue.js"],
    description:
      "프론트엔드 개발에 관심이 많으며, UI/UX에 대한 깊은 이해를 바탕으로 사용자 친화적인 웹을 만들고 있습니다.",
    studentId: "20211235",
  },
  {
    id: 3,
    name: "박임원진",
    role: "임원진",
    grade: "3",
    major: "컴퓨터공학과",
    email: "executive@club.com",
    githubUrl: "github.com/executive",
    skills: ["Java", "Spring", "MySQL", "Docker"],
    description:
      "백엔드 개발과 시스템 아키텍처에 관심이 많습니다. 효율적이고 확장 가능한 시스템 구축을 목표로 합니다.",
    studentId: "20211236",
  },
  {
    id: 4,
    name: "최스터디장",
    role: "스터디장",
    grade: "2",
    major: "컴퓨터공학과",
    email: "studyleader@club.com",
    githubUrl: "github.com/studyleader",
    skills: ["Python", "C++", "Algorithm", "Data Structure"],
    description:
      "알고리즘 스터디를 이끌며 멤버들의 문제 해결 능력 향상에 기여하고 있습니다.",
    studentId: "20221237",
  },
  {
    id: 5,
    name: "정회원",
    role: "PLAYER",
    grade: "1",
    major: "소프트웨어학과",
    email: "member@club.com",
    skills: ["Python", "C++", "HTML", "CSS"],
    description:
      "프로그래밍을 배우기 시작한 신입 회원입니다. 열정적으로 학습하며 성장하고 있습니다.",
    studentId: "20231238",
  },
  {
    id: 6,
    name: "한알고리즘",
    role: "UPSOLVER",
    grade: "2",
    major: "수학과",
    email: "algorithm@club.com",
    githubUrl: "github.com/algorithm",
    skills: ["Python", "C++", "Algorithm", "Data Structure"],
    description:
      "알고리즘과 자료구조에 특화된 개발자입니다. 문제 해결 능력을 기르며 효율적인 코드 작성을 추구합니다.",
    studentId: "20221239",
  },
  {
    id: 7,
    name: "송디자이너",
    role: "UPSOLVER",
    grade: "2",
    major: "시각디자인학과",
    email: "designer@club.com",
    skills: ["Figma", "Photoshop", "Illustrator", "UI/UX"],
    description:
      "사용자 경험을 중시하는 디자이너입니다. 개발자와의 협업을 통해 더 나은 제품을 만들어가고 있습니다.",
    studentId: "20221240",
  },
];
