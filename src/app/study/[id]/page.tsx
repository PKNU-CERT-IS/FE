import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, Users, Tag } from "lucide-react";
import DefaultBadge from "@/components/ui/defaultBadge";
import MarkdownRenderer from "@/components/ui/defaultMarkdownRenderer";
import {
  mockStudyDetailData,
  StudyDetailData,
} from "@/mocks/mockStudyDetailData";
import BackToListButton from "@/components/detail/SCBackToListButton";
import KebabMenu from "@/components/detail/CCKebabMenu";
import CCShareButton from "@/components/detail/CCShareButton";
import MeetingMinutes from "@/components/study/CCMeetingMinutes";

function getStudyDataById(id: string): StudyDetailData | null {
  const parsedId = parseInt(id, 10);
  return mockStudyDetailData.find((data) => data.id === parsedId) || null;
}

function calculateDDay(endDate: string): number {
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function getStatusColor(status: string) {
  switch (status) {
    case "모집중":
      return "bg-green-50 text-green-700 border-green-200";
    case "진행중":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "완료":
      return "bg-gray-50 text-gray-700 border-gray-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

// 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;
  const studyData = getStudyDataById(id);

  if (!studyData) {
    return {
      title: "스터디 자료를 찾을 수 없습니다",
      description: "요청하신 스터디 자료를 찾을 수 없습니다.",
    };
  }

  return {
    title: `${studyData.title} - Security Study`,
    description: studyData.description.substring(0, 160) + "...",
    openGraph: {
      title: studyData.title,
      description: studyData.description.substring(0, 160) + "...",
      type: "article",
      authors: [studyData.author],
    },
  };
}

export default async function StudyMaterialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const studyData = getStudyDataById(id);

  if (!studyData) {
    notFound();
  }

  // D-Day 계산
  const dDay = studyData.endDate ? calculateDDay(studyData.endDate) : null;

  return (
    <div>
      {/* Header */}
      <div className="space-y-6">
        <BackToListButton currentUrl={"study"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8  mt-6">
        {/* Main Content */}
        <div className="lg:col-span-2  space-y-6">
          {/* Study Material Info Card */}
          <div className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 pb-0 ">
              <div className="flex items-start  justify-between mb-4">
                <div className="space-y-2 ">
                  <h1 className="text-2xl font-bold  text-black dark:text-white">
                    {studyData.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <DefaultBadge className={getStatusColor(studyData.status)}>
                      {studyData.status}
                    </DefaultBadge>
                    {dDay !== null && (
                      <DefaultBadge
                        variant="outline"
                        className="text-cert-red border-cert-red"
                      >
                        {dDay > 0
                          ? `D-${dDay}`
                          : dDay === 0
                          ? "D-Day"
                          : `D+${Math.abs(dDay)}`}
                      </DefaultBadge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 action-button">
                    스터디 참가하기
                  </button>
                  <KebabMenu
                    currentId={studyData.id}
                    currentUrl={"study"}
                  ></KebabMenu>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Description + Detail Content */}
              <div className="space-y-4">
                <p className="text-black dark:text-gray-300 leading-relaxed border-b border-gray-200 pb-6">
                  {studyData.description}
                </p>
                <MarkdownRenderer content={studyData.detailContent} />
              </div>

              <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>

              {/* Study Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-cert-red" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      일정
                    </p>
                    <p className="font-medium text-black dark:text-white">
                      {studyData.schedule.day}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-cert-red" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      시간
                    </p>
                    <p className="font-medium text-black dark:text-white">
                      {studyData.schedule.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-cert-red" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      참여 인원
                    </p>
                    <p className="font-medium text-black dark:text-white">
                      {studyData.currentParticipants}/
                      {studyData.maxParticipants}명
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-cert-red" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      기간
                    </p>
                    <p className="font-medium text-black dark:text-white">
                      {studyData.period}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex justify-between p-1  pt-6 border-t border-gray-300">
                <div className="flex flex-wrap gap-2">
                  {studyData.tags.map((tag) => (
                    <DefaultBadge
                      key={tag}
                      className="text-xs h-6 bg-gray-100 text-gray-600 hover:bg-gray-200 "
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </DefaultBadge>
                  ))}
                </div>
                <CCShareButton />
              </div>
            </div>
          </div>
          <MeetingMinutes
            studyId={"1"} // 임시로 ID 설정, 실제로는 params에서 받아와야 함 현재 스터디 ID를 나타내는 ID
            currentUserId={1} // 임시로 현재 사용자 ID 설정, 실제로는 로그인 정보에서 받아와야 함
            studyLeaderId={1} // 임시로 스터디 리더 ID 설정, 실제로는 스터디 데이터에서 받아와야 함
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Study Leader */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                스터디 리더
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cert-red rounded-full flex items-center justify-center text-white font-medium">
                  {studyData.leader.name[0]}
                </div>
                <div>
                  <p className="font-medium text-black dark:text-white">
                    {studyData.leader.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {studyData.leader.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                참여자
              </h3>
              <div className="space-y-3">
                {studyData.participants.length > 0 ? (
                  studyData.participants.map((participant, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-black text-xs font-medium">
                        {participant.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black dark:text-white">
                          {participant.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {participant.role}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    아직 참여자가 없습니다.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Study Period */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                스터디 기간
              </h3>
              <div className="text-center">
                {dDay !== null && (
                  <p className="text-2xl font-bold text-cert-red mb-2">
                    {dDay > 0
                      ? `D-${dDay}`
                      : dDay === 0
                      ? "D-Day"
                      : `D+${Math.abs(dDay)}`}
                  </p>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {studyData.period}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
