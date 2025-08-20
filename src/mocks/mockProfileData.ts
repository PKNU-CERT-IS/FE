import { ProfileBlogDataType, ProfileDataType } from "@/types/profile";

export const mockProfileData: ProfileDataType[] = [
  {
    id: 1,
    name: "김동아리",
    role: "PLAYER",
    grade: "4",
    major: "컴퓨터공학과",
    profileImage: "/placeholder.svg?height=80&width=80",
    email: "president@club.com",
    githubUrl: "github.com/president",
    linkedinUrl: "linkedin.com/president",
    joinDate: "2021-03",
    skills: ["React", "Node.js", "Python", "AWS"],
    description:
      "풀스택 개발자를 꿈꾸며 다양한 프로젝트를 진행하고 있습니다. 팀워크와 소통을 중시합니다.",
    penaltyPoint: 1,
    penaltyPeriod: 5,
    birthday: "2000-01-15",
    studentId: "20201111",
    phoneNumber: "010-1111-1111",
    gender: "남",
  },
];

// mockProfileStudyData.ts
export const mockProfileStudyData = [
  {
    id: "1",
    isPending: false,
    title: "OWASP Top 10 2023 취약점 분석",
    description: "최신 OWASP Top 10 취약점에 대한 상세 분석 자료입니다.",
    author: "김보안",
    authorStatus: "student",
    semester: "2025-2",
    attachedFiles: [
      {
        id: "file_1_1",
        name: "해커톤_기획서.pdf",
        size: 2547892,
        type: "application/pdf",
        category: "document",
        downloadUrl: "/api/files/download/hackathon_plan.pdf",
        uploadDate: "2025-01-15T09:30:00Z",
        description: "해커톤 전체 기획서 및 일정표",
      },
    ],
    category: "CTF",
    subCategory: "리버싱",
    hackingTechnique: "CTF",
    status: "in_progress",
    startDate: "2025-07-01",
    endDate: "2025-07-15",
    currentParticipants: 7,
    maxParticipants: 10,
  },
  {
    id: "2",
    isPending: false,
    title: "Metasploit Framework 완전 정복",
    description:
      "Metasploit을 활용한 침투 테스트 기법과 실습 자료를 종합적으로 다룹니다.",
    author: "이해커",
    authorStatus: "graduate",
    semester: "2025-2",
    attachedFiles: [
      {
        id: "file_1_1",
        name: "해커톤_기획서.pdf",
        size: 2547892,
        type: "application/pdf",
        category: "document",
        downloadUrl: "/api/files/download/hackathon_plan.pdf",
        uploadDate: "2025-01-15T09:30:00Z",
        description: "해커톤 전체 기획서 및 일정표",
      },
    ],
    category: "CTF",
    subCategory: "리버싱",
    hackingTechnique: "CTF",
    status: "completed",
    startDate: "2025-03-01",
    endDate: "2025-05-31",
    currentParticipants: 10,
    maxParticipants: 10,
  },
];

// mockProfileProjectData.ts
export const mockProfileProjectData = [
  {
    id: "1",
    title: "Social Impact Hackathon 2025",
    description:
      "의미 있는 것 만들고 싶지 않아? 사회적 가치를 창출하는 해커톤 프로젝트입니다.",
    image: "/images/projects/hackathon-2025.jpg",
    author: "NEXT42",
    authorStatus: "organization",
    semester: "2025-2",
    category: "CS",
    subCategory: "논리회로",
    hackingTechnique: "CS",
    status: "in_progress",
    startDate: "2025-06-06",
    endDate: "2025-06-08",
    currentParticipants: 42,
    maxParticipants: 100,
    githubUrl: "https://github.com/next42/social-impact-hackathon",
    demoUrl: "https://hackathon.next42.kr",
    stars: 156,
    attachedFiles: [
      {
        id: "file_1_1",
        name: "해커톤_기획서.pdf",
        size: 2547892,
        type: "application/pdf",
        category: "document",
        downloadUrl: "/api/files/download/hackathon_plan.pdf",
        uploadDate: "2025-01-15T09:30:00Z",
        description: "해커톤 전체 기획서 및 일정표",
      },
      {
        id: "file_1_2",
        name: "참가자_가이드.pptx",
        size: 8934567,
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        category: "presentation",
        downloadUrl: "/api/files/download/participant_guide.pptx",
        uploadDate: "2025-01-20T14:22:00Z",
        description: "참가자를 위한 상세 가이드 프레젠테이션",
      },
      {
        id: "file_1_3",
        name: "starter_template.zip",
        size: 15678234,
        type: "application/zip",
        category: "archive",
        downloadUrl: "/api/files/download/starter_template.zip",
        uploadDate: "2025-01-25T11:45:00Z",
        description: "프로젝트 시작을 위한 템플릿 코드 및 설정 파일",
      },
      {
        id: "file_1_4",
        name: "sample_dataset.csv",
        size: 4523678,
        type: "text/csv",
        category: "dataset",
        downloadUrl: "/api/files/download/sample_dataset.csv",
        uploadDate: "2025-01-28T16:15:00Z",
        description: "해커톤에서 사용할 수 있는 샘플 데이터셋",
      },
      {
        id: "file_1_5",
        name: "evaluation_criteria.docx",
        size: 867543,
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        category: "document",
        downloadUrl: "/api/files/download/evaluation_criteria.docx",
        uploadDate: "2025-02-01T10:30:00Z",
        description: "프로젝트 평가 기준 및 심사 방법",
      },
    ],
    externalLinks: [
      {
        url: "https://www.notion.so/example-project-notion",
        label: "Notion 문서",
        type: "notion",
      },
      {
        url: "https://docs.google.com/document/d/example-gdoc",
        label: "Google Docs",
        type: "gdocs",
      },
      {
        url: "https://www.example.com/extra-info",
        label: "프로젝트 소개 페이지",
        type: "web",
      },
    ],
  },
];

// blog mock
export const mockProfileBlogData: ProfileBlogDataType[] = [
  {
    id: 1,
    title: "React 18의 새로운 기능들과 성능 최적화",
    excerpt:
      "React 18에서 도입된 Concurrent Features와 Automatic Batching을 활용한 성능 최적화 방법을 알아봅니다.",
    content: `
      <h2>React 18의 주요 변화점</h2>
      <p>React 18은 새로운 동시성 기능들을 통해 사용자 경험을 크게 개선했습니다.</p>
      
      <h3>Concurrent Features</h3>
      <p>React 18의 가장 큰 변화는 동시성 기능의 도입입니다. 이를 통해:</p>
      <ul>
        <li>렌더링 과정을 중단하고 재개할 수 있습니다</li>
        <li>우선순위에 따라 업데이트를 처리할 수 있습니다</li>
        <li>더 나은 사용자 경험을 제공할 수 있습니다</li>
      </ul>

      <h3>Automatic Batching</h3>
      <p>이전 버전에서는 React 이벤트 핸들러 내에서만 배칭이 동작했지만, React 18에서는 Promise, setTimeout 등에서도 자동으로 배칭됩니다.</p>
      
      <pre><code>
// React 18에서 자동으로 배칭됨
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React는 이 두 업데이트를 하나로 배칭합니다
}, 1000);
      </code></pre>
    `,
    author: "김개발",
    category: "CS",
    createdAt: "2024-01-15",
    views: 1250,
    likes: 45,
    featured: true,
    published: true,
  },
  {
    id: 2,
    title: "웹 보안의 기초: XSS와 CSRF 공격 방어하기",
    excerpt:
      "웹 애플리케이션에서 가장 흔히 발생하는 XSS와 CSRF 공격의 원리와 방어 방법을 상세히 설명합니다.",
    content: `
      <h2>웹 보안의 중요성</h2>
      <p>현대 웹 애플리케이션에서 보안은 선택이 아닌 필수입니다.</p>
      
      <h3>XSS (Cross-Site Scripting) 공격</h3>
      <p>XSS 공격은 악성 스크립트를 웹 페이지에 삽입하여 사용자의 정보를 탈취하는 공격입니다.</p>
      
      <h4>방어 방법:</h4>
      <ul>
        <li>입력값 검증 및 이스케이프 처리</li>
        <li>Content Security Policy (CSP) 설정</li>
        <li>HttpOnly 쿠키 사용</li>
      </ul>

      <h3>CSRF (Cross-Site Request Forgery) 공격</h3>
      <p>사용자가 의도하지 않은 요청을 강제로 전송하게 만드는 공격입니다.</p>
      
      <h4>방어 방법:</h4>
      <ul>
        <li>CSRF 토큰 사용</li>
        <li>SameSite 쿠키 속성 설정</li>
        <li>Referer 헤더 검증</li>
      </ul>
    `,
    author: "박보안",
    category: "CS",
    createdAt: "2024-01-12",
    views: 890,
    likes: 32,
    published: true,
  },
];
