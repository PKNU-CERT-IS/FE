import { ProjectMaterial } from "@/types/project";

export function getProjectMaterials(): ProjectMaterial[] {
  return [
    {
      id: "1",
      title: "Social Impact Hackathon 2025",
      description:
        "의미 있는 것 만들고 싶지 않아? 사회적 가치를 창출하는 해커톤 프로젝트입니다.",
      image: "/images/projects/hackathon-2025.jpg",
      customTags: [
        { name: "Hackathon", color: "bg-purple-100 text-purple-800" },
        { name: "Social Impact", color: "bg-green-100 text-green-800" },
        { name: "Innovation", color: "bg-blue-100 text-blue-800" },
      ],
      author: "NEXT42",
      authorStatus: "organization",
      semester: "2025-2",
      category: "연구개발",
      hackingTechnique: "web_security",
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
    {
      id: "2",
      title: "OWASP Top 10 2023 취약점 분석",
      description:
        "최신 OWASP Top 10 취약점에 대한 상세 분석과 실습 환경을 제공합니다.",
      image: "/images/projects/owasp-analysis.jpg",
      customTags: [
        { name: "OWASP", color: "bg-blue-100 text-blue-800" },
        { name: "Web Security", color: "bg-red-100 text-red-800" },
        { name: "Vulnerability", color: "bg-orange-100 text-orange-800" },
      ],
      author: "김보안",
      authorStatus: "student",
      semester: "2025-2",
      category: "웹보안",
      hackingTechnique: "web_security",
      status: "completed",
      startDate: "2025-01-01",
      endDate: "2025-06-30",
      currentParticipants: 15,
      maxParticipants: 20,
      githubUrl: "https://github.com/security-team/owasp-top10-analysis",
      demoUrl: "https://owasp-demo.security-lab.kr",
      stars: 89,
      attachedFiles: [
        {
          id: "file_2_1",
          name: "OWASP_Top10_2023_분석_보고서.pdf",
          size: 12456789,
          type: "application/pdf",
          category: "report",
          downloadUrl: "/api/files/download/owasp_top10_analysis.pdf",
          uploadDate: "2025-03-15T13:45:00Z",
          description: "OWASP Top 10 2023 취약점에 대한 상세 분석 보고서",
        },
        {
          id: "file_2_2",
          name: "vulnerable_web_app.zip",
          size: 23456789,
          type: "application/zip",
          category: "code",
          downloadUrl: "/api/files/download/vulnerable_web_app.zip",
          uploadDate: "2025-03-20T09:15:00Z",
          description: "실습용 취약한 웹 애플리케이션 소스코드",
        },
        {
          id: "file_2_3",
          name: "실습_영상_tutorial.mp4",
          size: 156789234,
          type: "video/mp4",
          category: "video",
          downloadUrl: "/api/files/download/tutorial_video.mp4",
          uploadDate: "2025-04-01T15:30:00Z",
          description: "취약점 분석 및 익스플로잇 실습 영상",
        },
        {
          id: "file_2_4",
          name: "exploit_scripts.tar.gz",
          size: 3456789,
          type: "application/gzip",
          category: "code",
          downloadUrl: "/api/files/download/exploit_scripts.tar.gz",
          uploadDate: "2025-04-10T11:20:00Z",
          description: "각 취약점별 익스플로잇 스크립트 모음",
        },
      ],
    },
    {
      id: "3",
      title: "AI 기반 악성코드 탐지 시스템",
      description:
        "머신러닝과 딥러닝을 활용한 실시간 악성코드 탐지 및 분류 시스템입니다.",
      image: "/images/projects/ai-malware-detection.jpg",
      customTags: [
        { name: "AI/ML", color: "bg-purple-100 text-purple-800" },
        { name: "Malware Detection", color: "bg-red-100 text-red-800" },
        { name: "Deep Learning", color: "bg-indigo-100 text-indigo-800" },
      ],
      author: "이머신러닝",
      authorStatus: "graduate",
      semester: "2025-2",
      category: "AI보안",
      hackingTechnique: "ai_security",
      status: "in_progress",
      startDate: "2025-03-01",
      endDate: "2025-12-31",
      currentParticipants: 8,
      maxParticipants: 12,
      githubUrl: "https://github.com/ai-security/malware-detection",
      stars: 234,
      attachedFiles: [
        {
          id: "file_3_1",
          name: "malware_dataset.json",
          size: 45678923,
          type: "application/json",
          category: "dataset",
          downloadUrl: "/api/files/download/malware_dataset.json",
          uploadDate: "2025-03-05T08:45:00Z",
          description: "학습용 악성코드 특성 데이터셋 (10,000개 샘플)",
        },
        {
          id: "file_3_2",
          name: "model_architecture.png",
          size: 1234567,
          type: "image/png",
          category: "image",
          downloadUrl: "/api/files/download/model_architecture.png",
          uploadDate: "2025-03-10T14:22:00Z",
          description: "딥러닝 모델 아키텍처 다이어그램",
        },
        {
          id: "file_3_3",
          name: "trained_model.h5",
          size: 89234567,
          type: "application/octet-stream",
          category: "other",
          downloadUrl: "/api/files/download/trained_model.h5",
          uploadDate: "2025-04-15T16:30:00Z",
          description: "학습된 악성코드 탐지 모델 파일",
        },
        {
          id: "file_3_4",
          name: "performance_metrics.xlsx",
          size: 678234,
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          category: "report",
          downloadUrl: "/api/files/download/performance_metrics.xlsx",
          uploadDate: "2025-04-20T12:15:00Z",
          description: "모델 성능 평가 결과 및 메트릭",
        },
        {
          id: "file_3_5",
          name: "demo_audio.wav",
          size: 5432189,
          type: "audio/wav",
          category: "audio",
          downloadUrl: "/api/files/download/demo_audio.wav",
          uploadDate: "2025-04-25T09:45:00Z",
          description: "프로젝트 발표용 오디오 데모",
        },
      ],
    },
    {
      id: "4",
      title: "블록체인 기반 디지털 신원 인증",
      description:
        "블록체인 기술을 활용한 탈중앙화 디지털 신원 인증 시스템 개발 프로젝트입니다.",
      image: "/images/projects/blockchain-identity.jpg",
      customTags: [
        { name: "Blockchain", color: "bg-yellow-100 text-yellow-800" },
        { name: "Identity", color: "bg-green-100 text-green-800" },
        { name: "Decentralized", color: "bg-blue-100 text-blue-800" },
      ],
      author: "박블록체인",
      authorStatus: "student",
      semester: "2025-2",
      category: "블록체인보안",
      hackingTechnique: "blockchain_security",
      status: "not_started",
      startDate: "2025-08-01",
      currentParticipants: 3,
      maxParticipants: 15,
      githubUrl: "https://github.com/blockchain-team/digital-identity",
      stars: 67,
    },
    {
      id: "5",
      title: "IoT 디바이스 보안 프레임워크",
      description:
        "IoT 환경에서의 보안 취약점 분석과 안전한 통신 프로토콜 구현 프로젝트입니다.",
      image: "/images/projects/iot-security.jpg",
      customTags: [
        { name: "IoT", color: "bg-cyan-100 text-cyan-800" },
        { name: "Security Framework", color: "bg-purple-100 text-purple-800" },
        { name: "Protocol", color: "bg-gray-100 text-gray-800" },
      ],
      author: "최IoT보안",
      authorStatus: "graduate",
      semester: "2025-2",
      category: "IoT보안",
      hackingTechnique: "iot_security",
      status: "completed",
      startDate: "2024-09-01",
      endDate: "2025-02-28",
      currentParticipants: 12,
      maxParticipants: 12,
      githubUrl: "https://github.com/iot-security/framework",
      demoUrl: "https://iot-demo.security-lab.kr",
      stars: 178,
    },
    {
      id: "6",
      title: "IoT 디바이스 보안 프레임워크",
      description:
        "IoT 환경에서의 보안 취약점 분석과 안전한 통신 프로토콜 구현 프로젝트입니다.",
      image: "/images/projects/iot-security.jpg",
      customTags: [
        { name: "IoT", color: "bg-cyan-100 text-cyan-800" },
        { name: "Security Framework", color: "bg-purple-100 text-purple-800" },
        { name: "Protocol", color: "bg-gray-100 text-gray-800" },
      ],
      author: "최IoT보안",
      authorStatus: "graduate",
      semester: "2025-2",
      category: "IoT보안",
      hackingTechnique: "iot_security",
      status: "completed",
      startDate: "2024-09-01",
      endDate: "2025-02-28",
      currentParticipants: 12,
      maxParticipants: 12,
      githubUrl: "https://github.com/iot-security/framework",
      demoUrl: "https://iot-demo.security-lab.kr",
      stars: 178,
    },
    {
      id: "7",
      title: "IoT 디바이스 보안 프레임워크",
      description:
        "IoT 환경에서의 보안 취약점 분석과 안전한 통신 프로토콜 구현 프로젝트입니다.",
      image: "/images/projects/iot-security.jpg",
      customTags: [
        { name: "IoT", color: "bg-cyan-100 text-cyan-800" },
        { name: "Security Framework", color: "bg-purple-100 text-purple-800" },
        { name: "Protocol", color: "bg-gray-100 text-gray-800" },
      ],
      author: "최IoT보안",
      authorStatus: "graduate",
      semester: "2025-2",
      category: "IoT보안",
      hackingTechnique: "iot_security",
      status: "completed",
      startDate: "2024-09-01",
      endDate: "2025-02-28",
      currentParticipants: 12,
      maxParticipants: 12,
      githubUrl: "https://github.com/iot-security/framework",
      demoUrl: "https://iot-demo.security-lab.kr",
      stars: 178,
    },
  ];
}
