export interface LinkItem {
  title: string;
  url: string;
}

export interface BaseMeeting {
  title: string;
  content: string;
  participantNumber: number;
  links: LinkItem[];
}

export interface CreateStudyMeeting extends BaseMeeting {
  studyId: number;
}
export interface CreateProjectMeeting extends BaseMeeting {
  projectId: number;
}

export interface UpdateMeeting extends BaseMeeting {
  meetingId: number;
  requesterId: number;
}

// 회의록 응답값
export interface MeetingResponse {
  id: number;
  studyId?: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  participantNumber: number;
  writerId: number;
  writerName: string;
  editable: boolean;
  links: LinkItem[];
  creatorName: string;
}
