export const mockScheduleData = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  return [
    {
      id: 1,
      title: "보안 세미나",
      date: new Date(currentYear, currentMonth + 1, 5)
        .toISOString()
        .split("T")[0],
      startTime: "14:00",
      endTime: "16:00",
      location: "장보고관",
      description: "보안 세미나 행사입니다.",
      type: "workshop" as const,
    },

    {
      id: 2,
      title: "CTF 대회",
      date: new Date(currentYear, currentMonth, 12).toISOString().split("T")[0],
      startTime: "10:00",
      endTime: "18:00",
      location: "장보고관",
      description: "CTF 대회 행사입니다.",
      type: "conference" as const,
    },
    {
      id: 3,
      title: "정기 모임",
      date: new Date(currentYear, currentMonth, 18).toISOString().split("T")[0],
      startTime: "19:00",
      endTime: "21:00",
      location: "장보고관",
      description: "9월 정기모임 행사입니다.",
      type: "meeting" as const,
    },
    {
      id: 4,
      title: "해킹 실습",
      date: new Date(currentYear, currentMonth, 25).toISOString().split("T")[0],
      startTime: "15:00",
      endTime: "18:00",
      location: "동아리방",
      description: "해킹 실습을 위한 동아리방 예약입니다.",
      type: "study" as const,
    },
    {
      id: 5,
      title: "암호학 스터디",
      date: new Date(currentYear, currentMonth, today.getDate() + 3)
        .toISOString()
        .split("T")[0],
      startTime: "18:00",
      endTime: "20:00",
      location: "동아리방",
      description: "암호학 스터디를 위한 동아리방 예약입니다.",
      type: "study" as const,
    },
    {
      id: 6,
      title: "포렌식 워크샵",
      date: new Date(currentYear, currentMonth, today.getDate() + 7)
        .toISOString()
        .split("T")[0],
      startTime: "13:00",
      endTime: "17:00",
      location: "미래관",
      description: "포렌식 워크샵 행사입니다.",
      type: "workshop" as const,
    },
    {
      id: 7,
      title: "보안 세미나2",
      date: new Date(currentYear, currentMonth + 1, 5)
        .toISOString()
        .split("T")[0],
      startTime: "14:00",
      endTime: "16:00",
      location: "미래관",
      description: "보안 세미나2 행사입니다.",
      type: "workshop" as const,
    },
    {
      id: 8,
      title: "포렌식 워크샵",
      date: new Date(currentYear, currentMonth, today.getDate() + 7)
        .toISOString()
        .split("T")[0],
      startTime: "13:00",
      endTime: "17:00",
      location: "미래관",
      description: "포렌식 워크샵 행사입니다.",
      type: "workshop" as const,
    },
    {
      id: 9,
      title: "포렌식 워크샵",
      date: new Date(currentYear, currentMonth, today.getDate() + 7)
        .toISOString()
        .split("T")[0],
      startTime: "13:00",
      endTime: "17:00",
      location: "미래관",
      description: "포렌식 워크샵 행사입니다.",
      type: "workshop" as const,
    },
    {
      id: 10,
      title: "포렌식 워크샵",
      date: new Date(currentYear, currentMonth, today.getDate() + 7)
        .toISOString()
        .split("T")[0],
      startTime: "13:00",
      endTime: "17:00",
      location: "미래관",
      description: "포렌식 워크샵 행사입니다.",
      type: "workshop" as const,
    },
    {
      id: 11,
      title: "포렌식 워크샵",
      date: new Date(currentYear, currentMonth, today.getDate() + 7)
        .toISOString()
        .split("T")[0],
      startTime: "13:00",
      location: "미래관",
      description: "포렌식 워크샵 행사입니다.",
      endTime: "17:00",
      type: "workshop" as const,
    },
  ];
};
