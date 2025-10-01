"server-only";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Users, Download } from "lucide-react";
import DefaultBadge from "@/components/ui/defaultBadge";
import MarkdownRenderer from "@/components/ui/defaultMarkdownRenderer";
import BackToListButton from "@/components/detail/SCBackToListButton";
import KebabMenu from "@/components/detail/CCKebabMenu";
import CCShareButton from "@/components/detail/CCShareButton";
import DownloadButton from "@/components/detail/SCDownloadButton";
import { formatFileSize } from "@/utils/attachedFileUtils";
import { getFileIcon } from "@/utils/attachedFileUtils";
import { getStudyPeriodLabel } from "@/utils/studyHelper";
import EndRequestButton from "@/components/ui/endRequestButton";
import { getStatusColor } from "@/utils/badgeUtils";
import { STATUS_LABELS } from "@/types/progressStatus";
import { getDetailStudy } from "@/app/api/study/SCStudyApi";
import { formatDate } from "@/utils/formatDateUtil";
import { SUBCATEGORY_FROM_EN } from "@/types/category";
import {
  getApprovedParticipants,
  getPendingParticipants,
} from "@/app/api/study/SCStudyParticipantApi";
import { CCJoinButton } from "@/components/ui/CCJoinButton";
import { getCurrentUser } from "@/lib/auth/currentUser";
import CCParticipantActionButtons from "@/components/ui/CCParticipantActionButtons";
import MeetingMinutes from "@/components/study/SCStudyMeetingMinutes";
import { AttachedFile } from "@/types/attachedFile";
import { MEMBER_GRADE_LABELS, MemberGrade, StudyMaterial } from "@/types/study";
import LogoSVG from "/public/icons/logo.svg";

// 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const studyId = parseInt(id, 10);

  try {
    const studyData = await getDetailStudy(studyId);
    if (!studyData) {
      return {
        title: "스터디를 찾을 수 없습니다",
        description: "요청하신 스터디를 찾을 수 없습니다.",
      };
    }

    return {
      title: `${studyData.title} - CERT-IS Study`,
      description: studyData.description.substring(0, 160) + "...",
      openGraph: {
        title: studyData.title,
        description: studyData.description.substring(0, 160) + "...",
        type: "article",
        authors: [studyData.author],
        images: ["/logo.svg"],
      },
    };
  } catch (error) {
    throw error;
  }
}

export default async function StudyMaterialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const studyId = parseInt(id, 10);

  const studyData: StudyMaterial = await getDetailStudy(studyId);
  if (!studyData) {
    notFound();
  }

  // 현재 유저 판별
  const currentUser = await getCurrentUser();

  // 스터디장가 참가자 승인/거절 가능
  const canApproveOrReject =
    currentUser && currentUser.sub === String(studyData.creatorId);

  // 승인된 스터디원
  const approvedData = await getApprovedParticipants(studyId, 0, 10);
  const approvedMember = approvedData.content ?? [];

  // 대기 중인 스터디원
  const pendingData = await getPendingParticipants(studyId, 0, 10);
  const pendingMember = pendingData.content ?? [];
  const isAlreadyApproved = approvedMember.some(
    (m: { memberId: number }) => String(m.memberId) === String(currentUser?.sub)
  );

  const isPending = pendingMember.some(
    (m: { memberId: number }) => String(m.memberId) === String(currentUser?.sub)
  );
  // 참가 버튼 렌더 조건
  const showJoinButton =
    currentUser &&
    currentUser.sub !== String(studyData.creatorId) &&
    !isAlreadyApproved &&
    studyData.status !== "COMPLETED";

  return (
    <div>
      <div className="space-y-6">
        <BackToListButton currentUrl={"study"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* 메인 콘텐츠 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 pb-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 space-y-2">
                  <h1 className="text-2xl font-bold text-black dark:text-white">
                    {studyData.title}
                  </h1>

                  {/* 상태 배지 */}
                  <div className="flex items-center gap-2">
                    <DefaultBadge
                      variant="custom"
                      className={getStatusColor(studyData.status)}
                    >
                      {STATUS_LABELS[studyData.status]}
                    </DefaultBadge>
                    <DefaultBadge
                      variant="outline"
                      className="text-cert-red border-cert-red"
                    >
                      {getStudyPeriodLabel(studyData.endDate)}
                    </DefaultBadge>

                    {/* 모바일 참가 버튼 */}
                    {showJoinButton && (
                      <CCJoinButton
                        dataId={studyData.id}
                        initialState={
                          isAlreadyApproved
                            ? "APPROVED"
                            : isPending
                            ? "PENDING"
                            : "NONE"
                        }
                        className="px-4 py-2 sm:hidden ml-auto"
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* 데스크탑 참가 버튼 */}
                  {showJoinButton && (
                    <CCJoinButton
                      dataId={studyData.id}
                      initialState={
                        isAlreadyApproved
                          ? "APPROVED"
                          : isPending
                          ? "PENDING"
                          : "NONE"
                      }
                      className="px-4 py-2 hidden sm:inline-block"
                    />
                  )}
                  {/* 케밥 메뉴 */}
                  <KebabMenu currentId={studyData.id} currentUrl={"study"} />
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <p className="text-black dark:text-gray-300 leading-relaxed border-b border-gray-200 pb-6 dark:border-gray-700">
                  {studyData.description}
                </p>
                <MarkdownRenderer content={studyData.content} />
              </div>

              <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-cert-red" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      참여 인원
                    </p>
                    <p className="font-medium text-black dark:text-white">
                      {studyData.currentParticipantNumber}/
                      {studyData.maxParticipantNumber}명
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
                      {formatDate(studyData.startDate, "dot")} ~{" "}
                      {formatDate(studyData.endDate, "dot")}
                    </p>
                  </div>
                </div>
              </div>

              {/* 첨부파일 */}
              {studyData.attachments && studyData.attachments.length > 0 && (
                <div className="border-t border-gray-300 pt-6 mb-6 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2 dark:text-gray-200">
                    <Download className="w-4 h-4" />
                    첨부파일 ({studyData.attachments.length})
                  </h4>
                  <div className="space-y-3">
                    {studyData.attachments.map(
                      (file: AttachedFile, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-700"
                        >
                          <span className="text-2xl">
                            {getFileIcon(file.type)}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-gray-200">
                              {file.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                          <DownloadButton file={file} />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* 카테고리 + 공유 */}
              <div className="flex justify-between p-1 pt-6 border-t border-gray-300 dark:border-gray-700">
                <div className="flex flex-wrap gap-2 justify-center items-center">
                  <DefaultBadge className="bg-gray-100 h-6 border border-gray-200 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200">
                    {studyData.category}
                  </DefaultBadge>
                  <DefaultBadge className="bg-gray-100 h-6 border border-gray-200 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200">
                    {SUBCATEGORY_FROM_EN[studyData.subCategory] ??
                      studyData.subCategory}
                  </DefaultBadge>
                </div>
                <CCShareButton />
              </div>
            </div>
          </div>

          {/* 회의록 */}
          <MeetingMinutes
            studyId={studyData.id}
            currentUserId={Number(currentUser?.sub)}
            studyLeaderId={studyData.creatorId}
          />
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          {/* 스터디 리더 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                스터디 리더
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center font-medium">
                  {studyData.studyCreatorProfileImageUrl ? (
                    <Image
                      src={studyData.studyCreatorProfileImageUrl}
                      alt={`${studyData.studyCreatorName} 프로필`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <LogoSVG className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-black dark:text-white">
                    {studyData.studyCreatorName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {MEMBER_GRADE_LABELS[studyData.studyCreatorGrade]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                스터디원 ({approvedMember.length})
              </h3>

              <div className="mb-6">
                <div className="space-y-3">
                  {approvedMember.length > 0 ? (
                    approvedMember.map(
                      (participant: {
                        id: number;
                        memberId: number;
                        memberName: string;
                        memberGrade: MemberGrade;
                        profileImageUrl?: string;
                      }) => (
                        <div
                          key={participant.id}
                          className="flex items-center gap-3"
                        >
                          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-xs font-medium text-black dark:bg-gray-700 dark:text-white">
                            {participant.profileImageUrl ? (
                              <Image
                                src={participant.profileImageUrl}
                                alt={`${participant.memberName} 프로필`}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <LogoSVG className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                          <p className="text-sm font-medium text-black dark:text-white">
                            {participant.memberName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {MEMBER_GRADE_LABELS[participant.memberGrade]}
                          </p>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      참여 중인 멤버가 없습니다.
                    </p>
                  )}
                </div>
              </div>

              {canApproveOrReject && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    대기중 멤버 ({pendingMember.length})
                  </h4>
                  <div className="space-y-3">
                    {pendingMember.length > 0 ? (
                      pendingMember.map(
                        (participant: {
                          id: number;
                          memberId: number;
                          memberName: string;
                          memberGrade: MemberGrade;
                          profileImageUrl?: string;
                        }) => (
                          <div
                            key={participant.id}
                            className="flex items-center gap-3"
                          >
                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-xs font-medium text-black dark:bg-gray-700 dark:text-white">
                              {participant.profileImageUrl ? (
                                <Image
                                  src={participant.profileImageUrl}
                                  alt={`${participant.memberName} 프로필`}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <LogoSVG className="w-8 h-8 text-gray-400" />
                              )}
                            </div>
                            <p className="text-sm font-medium text-black dark:text-white">
                              {participant.memberName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {MEMBER_GRADE_LABELS[participant.memberGrade]}
                            </p>

                            {canApproveOrReject && (
                              <div className="flex gap-2">
                                <CCParticipantActionButtons
                                  memberId={participant.memberId}
                                  dataId={studyData.id}
                                />
                              </div>
                            )}
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        대기중인 멤버가 없습니다.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 스터디 기간 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 text-center">
              <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                스터디 기간
              </h3>
              <p className="text-2xl font-bold text-cert-red mb-2">
                {getStudyPeriodLabel(studyData.endDate)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatDate(studyData.startDate, "dot")} ~{" "}
                {formatDate(studyData.endDate, "dot")}
              </p>
            </div>
          </div>

          {/* 종료 요청 버튼 */}
          {canApproveOrReject && <EndRequestButton id={studyData.id} />}
        </div>
      </div>
    </div>
  );
}
