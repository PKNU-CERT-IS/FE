"server-only";

import type { StudyList } from "@/types/study";
import { MEMBER_GRADE_LABELS } from "@/types/study";
import CCStudyPagination from "@/components/study/CCStudyPagination";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";
import { getProgressColor, parseSearchParams } from "@/utils/studyHelper";
import PdfSVG from "/public/icons/pdf.svg";
import Link from "next/link";
import DefaultBadge from "@/components/ui/defaultBadge";
import { getCategoryColor, getStatusColor } from "@/utils/badgeUtils";
import { formatFileSize } from "@/utils/attachedFileUtils";
import { STATUS_LABELS } from "@/types/progressStatus";
import { searchStudies, getStudies } from "@/app/api/study/SCStudyApi";
import { SUBCATEGORY_FROM_EN, SUBCATEGORY_TO_EN } from "@/types/category";
import { Calendar } from "lucide-react";
import DownloadButton from "@/components/detail/SCDownloadButton";

interface SCStudyContentProps {
  searchParams: {
    search?: string;
    semester?: string;
    category?: string;
    subCategory?: string;
    studyStatus?: string;
    page?: string;
  };
}

export default async function SCStudyContent({
  searchParams,
}: SCStudyContentProps) {
  try {
    const resolvedSearchParams = await searchParams;

    const currentFilters = parseSearchParams(resolvedSearchParams);

    // 분기 조건 체크
    const isDefaultFilters =
      (!currentFilters.search || currentFilters.search === "ALL") &&
      (currentFilters.category === "ALL" || !currentFilters.category) &&
      (currentFilters.subCategory === "ALL" || !currentFilters.subCategory) &&
      (currentFilters.semester === "ALL" || !currentFilters.semester) &&
      (currentFilters.studyStatus === "ALL" || !currentFilters.studyStatus);

    let data;

    if (isDefaultFilters) {
      data = await getStudies((currentFilters.page ?? 1) - 1);
    } else {
      data = await searchStudies(
        {
          keyword: currentFilters.search,
          category: currentFilters.category,
          subcategory: SUBCATEGORY_TO_EN[currentFilters.subCategory],
          studyStatus: currentFilters.studyStatus,
          semester: currentFilters.semester,
        },
        {
          page: (currentFilters.page ?? 1) - 1,
        }
      );
    }

    const studyMaterials: StudyList[] = data.content;
    const totalPages = data.totalPages;
    const currentPage = (data.number ?? 0) + 1;

    return (
      <div className="mb-8">
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            총{" "}
            <span className="font-semibold text-gray-900 dark:text-gray-200">
              {data.totalElements}
            </span>
            개의 학습 자료가 있습니다.
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {studyMaterials.map((material) => {
            const participationRate = Math.round(
              (material.currentParticipantNumber /
                material.maxParticipantNumber) *
                100
            );
            const progressColor = getProgressColor(participationRate);

            return (
              <Link href={`/study/${material.id}`} key={material.id}>
                <div
                  key={material.id}
                  className="card-list p-6 dark-default flex flex-col"
                >
                  {/* 상태 및 날짜 정보 */}
                  <div className="flex items-center gap-2 mb-3">
                    <DefaultBadge
                      variant="custom"
                      className={getStatusColor(material.status)}
                    >
                      {STATUS_LABELS[material.status]}
                    </DefaultBadge>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{material.semester}</span>
                    </div>
                  </div>
                  {/* 제목 및 설명 */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-gray-200">
                    {material.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 dark:text-gray-300">
                    {material.description}
                  </p>
                  {/* 카테고리 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <DefaultBadge
                      variant="custom"
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border-none
                        ${getCategoryColor(material.category)}`}
                    >
                      {material.category}
                    </DefaultBadge>
                    <DefaultBadge
                      variant="custom"
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border-none
                        ${getCategoryColor(
                          SUBCATEGORY_FROM_EN[material.subcategory] ??
                            material.subcategory
                        )}`}
                    >
                      {SUBCATEGORY_FROM_EN[material.subcategory] ??
                        material.subcategory}
                    </DefaultBadge>
                  </div>
                  {/* 파일 목록 */}
                  <div className="space-y-2 mb-4 h-[100px] overflow-y-auto">
                    <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2 dark:text-gray-200">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      첨부 파일 ({material.attachments.length})
                    </h4>
                    {material.attachments?.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg p-3 dark-default bg-gray-50 dark:bg-gray-700"
                      >
                        <div className="flex items-center gap-3">
                          <PdfSVG className="w-5 h-5 text-red-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <input
                          type="hidden"
                          name="fileName"
                          value={file.name}
                        />
                        <input
                          type="hidden"
                          name="studyId"
                          value={material.id}
                        />
                        <DownloadButton file={file} />
                      </div>
                    ))}
                  </div>
                  {/* 참가 인원 Progress 바 */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600  dark:text-gray-300">
                        참가자
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                        {material.currentParticipantNumber}/
                        {material.maxParticipantNumber}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${participationRate}%`,
                          backgroundColor: progressColor,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block dark:text-gray-400">
                      {participationRate}%
                    </span>
                  </div>
                  {/* 작성자 및 참가하기 버튼 */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 h-12">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          material.studyCreatorGrade === "GRADUATED"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-100 text-blue-800 "
                        }`}
                      >
                        {MEMBER_GRADE_LABELS[material.studyCreatorGrade]}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-300">
                        {material.studyCreatorName}
                      </span>
                    </div>

                    {material.participantable && (
                      <button className="px-4 py-2 action-button text-sm">
                        참가하기
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 결과가 없을 때 */}
        {studyMaterials.length === 0 && <SCSearchResultNotFound mode="study" />}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <CCStudyPagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={resolvedSearchParams}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error("Error in SCStudyContent:", error);

    // 에러 발생 시 기본값으로 렌더링
    return (
      <div className="mb-8">
        <SCSearchResultNotFound
          title="데이터를 불러올 수 없습니다"
          description="페이지를 새로고침하거나 잠시 후 다시 시도해주세요."
          mode="study"
        />
      </div>
    );
  }
}
