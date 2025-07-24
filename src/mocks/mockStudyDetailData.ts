// 타입 정의
export interface StudyDetailData {
  id: number;
  title: string;
  description: string;
  leader: {
    name: string;
    avatar: string;
    role: string;
  };
  participants: { name: string; avatar: string; role: string }[];
  schedule: {
    day: string;
    time: string;
  };
  period: string;
  maxParticipants: number;
  currentParticipants: number;
  tags: string[];
  status: "모집중" | "진행중" | "완료";
  customTags: { name: string; color: string }[];
  author: string;
  authorStatus: "student" | "graduate";
  semester: string;
  files: { name: string; size: string; type: string }[];
  category: string;
  hackingTechnique: string;
  startDate: string;
  endDate?: string;
  authorInfo: {
    initials: string;
    role: string;
  };
  detailContent: string;
}

// Mock 데이터
export const mockStudyDetailData: StudyDetailData[] = [
  {
    id: 1,
    title: "OWASP Top 10 2023 취약점 분석",
    description: "최신 OWASP Top 10 취약점에 대한 상세 분석 자료입니다.",
    leader: {
      name: "김보안",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "4학년",
    },
    participants: [
      {
        name: "이해커",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "3학년",
      },
      {
        name: "박펜테",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "2학년",
      },
      {
        name: "최시큐",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "3학년",
      },
      {
        name: "정웹해",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "1학년",
      },
    ],
    schedule: {
      day: "매주 수요일",
      time: "19:00 - 21:00",
    },
    period: "2025.07.01 ~ 2025.07.15",
    maxParticipants: 10,
    currentParticipants: 7,
    tags: ["웹해킹", "보안", "실습", "OWASP"],
    status: "진행중",
    customTags: [
      { name: "OWASP", color: "bg-blue-100 text-blue-800" },
      { name: "Web Security", color: "bg-purple-100 text-purple-800" },
      { name: "Vulnerability", color: "bg-red-100 text-red-800" },
    ],
    author: "김보안",
    authorStatus: "student",
    semester: "2025-2",
    files: [
      { name: "OWASP_Top10_2023_Analysis.pdf", size: "3.2MB", type: "pdf" },
      { name: "Exploit_Examples.zip", size: "1.8MB", type: "zip" },
    ],
    category: "Web Security",
    hackingTechnique: "web_security",
    startDate: "2025-07-01",
    endDate: "2025-07-15",
    authorInfo: {
      initials: "김보",
      role: "학부생",
    },
    detailContent: `# OWASP Top 10 2023 취약점 분석

이 스터디는 웹 애플리케이션 보안에 대한 포괄적인 이해를 목표로 합니다.

## 학습 목표
- 웹 애플리케이션의 기본 구조와 동작 원리 이해
- 주요 웹 취약점(OWASP Top 10) 학습
- 실습을 통한 취약점 발견 및 악용 기법 습득
- 보안 코딩 및 방어 기법 학습

## 커리큘럼
### 1주차: 웹 기초 및 HTTP 프로토콜
### 2주차: SQL Injection 이론 및 실습
### 3주차: XSS (Cross-Site Scripting) 공격
### 4주차: CSRF 및 세션 관리
### 5주차: 파일 업로드 취약점
### 6주차: 인증 및 권한 부여 우회
### 7주차: 서버 사이드 취약점
### 8주차: 클라이언트 사이드 취약점
### 9주차: 웹 애플리케이션 방화벽 우회
### 10주차: 종합 실습 및 CTF

## 준비물
- 개인 노트북 (Kali Linux 설치 권장)
- 기본적인 웹 개발 지식
- 열정적인 학습 의지`,
  },
  {
    id: 2,
    title: "Metasploit Framework 완전 정복",
    description:
      "Metasploit을 활용한 침투 테스트 기법과 실습 자료를 종합적으로 다룹니다.",
    leader: {
      name: "이해커",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "대학원생",
    },
    participants: [
      {
        name: "김침투",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "4학년",
      },
      {
        name: "박테스트",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "3학년",
      },
      {
        name: "최익스",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "2학년",
      },
    ],
    schedule: {
      day: "매주 금요일",
      time: "18:00 - 20:00",
    },
    period: "2025.03.01 ~ 2025.05.31",
    maxParticipants: 10,
    currentParticipants: 10,
    tags: ["침투테스트", "메타스플로잇", "해킹"],
    status: "완료",
    customTags: [
      { name: "Metasploit", color: "bg-purple-100 text-purple-800" },
      { name: "Penetration Testing", color: "bg-pink-100 text-pink-800" },
      { name: "Exploitation", color: "bg-red-100 text-red-800" },
    ],
    author: "이해커",
    authorStatus: "graduate",
    semester: "2025-2",
    files: [
      { name: "Metasploit_Guide.pdf", size: "5.1MB", type: "pdf" },
      { name: "Lab_Environment.ova", size: "2.3GB", type: "ova" },
    ],
    category: "Penetration Testing",
    hackingTechnique: "penetration_testing",
    startDate: "2025-03-01",
    endDate: "2025-05-31",
    authorInfo: {
      initials: "이해",
      role: "대학원생",
    },
    detailContent: `# Metasploit Framework 완전 정복

Metasploit Framework는 침투 테스팅과 보안 연구를 위한 강력한 도구입니다.

## 학습 목표
- Metasploit Framework 기본 개념 이해
- 다양한 모듈(Exploit, Payload, Auxiliary) 활용법
- 실제 취약점 스캔 및 익스플로잇 실습
- 포스트 익스플로잇 기법 학습

## 커리큘럼
### 1주차: Metasploit 기초 및 환경 설정
### 2주차: Exploit 모듈 활용
### 3주차: Payload 생성 및 관리
### 4주차: Post Exploitation 기법
### 5주차: 자동화 스크립트 작성
### 6주차: 실제 시나리오 실습

## 준비물
- Kali Linux 또는 Parrot OS
- VirtualBox 또는 VMware
- 기본적인 리눅스 명령어 지식`,
  },
  {
    id: 3,
    title: "암호화 기초의 RSA 구현",
    description:
      "암호학의 기초 이론부터 RSA 공개키암호시스템의 Python 구현까지 다룹니다.",
    leader: {
      name: "박암호",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "3학년",
    },
    participants: [],
    schedule: {
      day: "매주 화요일",
      time: "20:00 - 22:00",
    },
    period: "2025.07.20 ~ 2025.09.20",
    maxParticipants: 10,
    currentParticipants: 1,
    tags: ["암호학", "RSA", "파이썬"],
    status: "모집중",
    customTags: [
      { name: "Cryptography", color: "bg-purple-100 text-purple-800" },
      { name: "RSA", color: "bg-green-100 text-green-800" },
      { name: "Python", color: "bg-blue-100 text-blue-800" },
    ],
    author: "박암호",
    authorStatus: "student",
    semester: "2025-2",
    files: [
      { name: "Cryptography_Basics.pdf", size: "2.7MB", type: "pdf" },
      { name: "RSA_Implementation.py", size: "15KB", type: "py" },
    ],
    category: "Cryptography",
    hackingTechnique: "cryptography",
    startDate: "2025-07-20",
    endDate: "2025-09-20",
    authorInfo: {
      initials: "박암",
      role: "학부생",
    },
    detailContent: `# 암호화 기초의 RSA 구현

현대 암호학의 핵심인 RSA 공개키 암호시스템을 이론부터 실제 구현까지 학습합니다.

## 학습 목표
- 암호학 기초 이론 이해
- RSA 알고리즘 원리 습득
- Python으로 직접 RSA 구현
- 암호화/복호화 과정 실습

## 커리큘럼
### 1주차: 암호학 개론
### 2주차: 수학적 기초 (소수, 모듈러 연산)
### 3주차: RSA 키 생성 알고리즘
### 4주차: 암호화/복호화 구현
### 5주차: 디지털 서명
### 6주차: 보안 분석 및 공격 기법

## 준비물
- Python 프로그래밍 기초
- 수학 기초 지식
- 개발 환경 (IDE)`,
  },
];
