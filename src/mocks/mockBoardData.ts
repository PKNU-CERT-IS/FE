import { BoardDataType } from "@/types/board";

export const mockBoardData: BoardDataType[] = [
  {
    id: 1,
    title: "2024년 상반기 CTF 대회 참가 안내",
    content:
      "국제 CTF 대회에 팀 단위로 참가합니다. 웹 해킹, 포렌식, 암호학 등 다양한 분야의 문제가 출제됩니다...",
    author: "관리자",
    date: "2024-01-15",
    category: "공지사항",
    views: 256,
    likes: 18,
    comments: 12,
    isNotice: true,
    priority: "high",
  },
  {
    id: 2,
    title: "신규 취약점 CVE-2024-0001 분석 보고서",
    content:
      "최근 발견된 Apache 웹서버 취약점에 대한 상세 분석과 대응 방안을 공유합니다...",
    author: "김보안",
    date: "2024-01-14",
    category: "보안이슈",
    views: 189,
    likes: 25,
    comments: 8,
    isNotice: false,
    priority: "medium",
  },
  {
    id: 3,
    title: "모의해킹 실습 환경 구축 가이드",
    content:
      "Kali Linux와 Metasploit을 활용한 모의해킹 실습 환경 구축 방법을 단계별로 설명합니다...",
    author: "이해커",
    date: "2024-01-13",
    category: "기술자료",
    views: 334,
    likes: 42,
    comments: 15,
    isNotice: false,
    priority: "medium",
  },
  {
    id: 4,
    title: "보안 동아리 랩실 이용 규칙 업데이트",
    content:
      "랩실 보안 강화를 위한 새로운 이용 규칙이 적용됩니다. 모든 회원은 필독 바랍니다...",
    author: "관리자",
    date: "2024-01-12",
    category: "공지사항",
    views: 178,
    likes: 8,
    comments: 5,
    isNotice: true,
    priority: "high",
  },
  {
    id: 5,
    title: "CISSP 자격증 스터디 그룹 모집",
    content:
      "CISSP 자격증 취득을 목표로 하는 스터디 그룹을 모집합니다. 함께 공부하실 분들을 찾습니다...",
    author: "박자격증",
    date: "2024-01-11",
    category: "스터디",
    views: 145,
    likes: 19,
    comments: 7,
    isNotice: false,
    priority: "low",
  },
];
