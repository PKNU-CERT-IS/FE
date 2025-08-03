// 활동 데이터 타입 정의
export interface ActivityData {
  thisMonthCreated: number;
  completed: number;
  successRate: number;
  total: number;
}

export interface ActivityDashboardData {
  study: ActivityData;
  project: ActivityData;
  overall: {
    totalActivities: number;
    completionRate: number;
    overallProgress: number;
  };
}

export interface SignUpList {
  name: string;
  department: string;
  studentId: number;
}
