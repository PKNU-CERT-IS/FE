"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DefaultButton from "@/components/ui/defaultButton";
import { Info, ChevronDown } from "lucide-react";
import FileUpload from "@/components/write/CCFileUpload";
import MarkdownEditor from "@/components/write/CCMarkdownEditor";
import { mockBoardData } from "@/mocks/mockBoardData";
import { mockBoardDetailData } from "@/mocks/mockBoardDetailData";
import { mockStudyDetailData } from "@/mocks/mockStudyDetailData";
import { getProjectMaterials } from "@/mocks/mockProjectData";
import { NewPageCategoryType } from "@/types/newPageForm";
import {
  getCategories,
  getPeriodPolicyInfo,
  getDescriptionPlaceholder,
  isFormValid,
  getSubCategories,
} from "@/utils/newPageFormUtils";
import { AttachedFile } from "@/types/attachedFile";
import {
  BlogDetailDataType,
  BlogReferenceType,
  BlogUpdateRequest,
} from "@/types/blog";
import { updateBlog } from "@/app/api/blog/CCblogApi";

interface EditFormProps {
  type: NewPageCategoryType;
  dataId: number;
  initialData: BlogDetailDataType;
  initialReference?: BlogReferenceType[];
}

export default function EditForm({
  type,
  dataId,
  initialData,
  initialReference,
}: EditFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [content, setContent] = useState(initialData.content || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [subCategory, setSubCategory] = useState("");
  const [attachments, setAttachments] = useState<AttachedFile[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [selectedReference, setSelectedReference] =
    useState<BlogReferenceType | null>(
      initialData.referenceType || null
        ? {
            referenceType: initialData?.referenceType,
            referenceTitle: initialData?.referenceTitle,
            referenceId: initialData?.referenceId,
          }
        : null
    );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState<boolean>(false);
  const [isSelectedReferenceOpen, setIsSelecteReferenceOpen] =
    useState<boolean>(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const subCategoryRef = useRef<HTMLDivElement>(null);
  const selectedReferenceRef = useRef<HTMLDivElement>(null);
  // 프로젝트 전용 필드들
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [demoUrl, setDemoUrl] = useState<string>("");
  const [externalLinks, setExternalLinks] = useState<
    { label: string; url: string }[]
  >([]);
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const closeAllDropdowns = useCallback(() => {
    setIsCategoryOpen(false);
    setIsSubCategoryOpen(false);
    setIsSelecteReferenceOpen(false);
  }, []);
  // 초기 데이터 로드
  const [isPublic, setIsPublic] = useState<boolean>(initialData.isPublic);
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);

        let initialData;

        if (type === "board") {
          const boardData = mockBoardData.find((item) => item.id === dataId);
          const boardDetailData = mockBoardDetailData.find(
            (item) => item.id === dataId
          );

          if (boardData && boardDetailData) {
            initialData = {
              title: boardData.title,
              content: boardDetailData.detailContent,
              category: boardData.category,
              attachedFiles: boardDetailData.attachedFiles || [],
            };
          }
        } else if (type === "study") {
          const studyData = mockStudyDetailData.find(
            (item) => item.id === dataId
          );
          if (studyData) {
            initialData = {
              title: studyData.title,
              content: studyData.detailContent,
              category: studyData.category,
              attachedFiles: studyData.attachedFiles || [],
              startDate: studyData.startDate,
              endDate: studyData.endDate || "",
              maxParticipants: String(studyData.maxParticipants || ""),
            };
          }
        } else if (type === "project") {
          const projectData = getProjectMaterials().find(
            (item) => item.id === dataId.toString()
          );
          if (projectData) {
            initialData = {
              title: projectData.title,
              description: projectData.description,
              content: projectData.description, // 프로젝트는 description을 content로 사용
              category: projectData.category,
              subCategory: projectData.subCategory,
              attachedFiles: projectData.attachedFiles || [],
              startDate: projectData.startDate,
              endDate: projectData.endDate || "",
              maxParticipants: String(projectData.maxParticipants || ""),
              githubUrl: projectData.githubUrl || "",
              demoUrl: projectData.demoUrl || "",
              externalLinks: projectData.externalLinks || [],
            };
          }
        }

        // 초기 데이터가 존재하면 state 설정
        if (initialData) {
          setTitle(initialData.title || "");
          setDescription(initialData.description || "");
          setContent(initialData.content || "");
          setCategory(initialData.category || "");
          setSubCategory(initialData.subCategory || "");
          setAttachments(initialData.attachedFiles || []);
          setStartDate(initialData.startDate || "");
          setEndDate(initialData.endDate || "");
          setMaxParticipants(initialData.maxParticipants || "");
          setGithubUrl(initialData.githubUrl || "");
          setDemoUrl(initialData.demoUrl || "");
          setExternalLinks(initialData.externalLinks || []);
          setSelectedReference(initialData.reference || null);
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (dataId) {
      loadInitialData();
    }
  }, [dataId, type]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        categoryRef.current?.contains(target) ||
        subCategoryRef.current?.contains(target) ||
        selectedReferenceRef.current?.contains(target)
      ) {
        return;
      }
      closeAllDropdowns();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeAllDropdowns]);

  const addExternalLink = () => {
    setExternalLinks([...externalLinks, { label: "", url: "" }]);
  };

  const updateExternalLink = (index: number, field: string, value: string) => {
    const updated = externalLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setExternalLinks(updated);
  };

  const removeExternalLink = (index: number) => {
    setExternalLinks(externalLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      // 수정 API 호출
      // const updateData = {
      //   id: dataId,
      //   title,
      //   description,
      //   content,
      //   category,
      //   ...((type === "study" || type === "project") && {
      //     startDate,
      //     endDate,
      //     subCategory,
      //     maxParticipants: maxParticipants
      //       ? parseInt(maxParticipants)
      //       : undefined,
      //   }),
      //   ...(type === "project" && {
      //     githubUrl,
      //     demoUrl,
      //     externalLinks: externalLinks.filter((link) => link.label && link.url),
      //     projectImage,
      //   }),
      //   ...(type === "blog"
      //     ? {
      //         referenceId: selectedReference?.referenceId,
      //         referenceType: selectedReference?.referenceType,
      //         referenceTitle: selectedReference?.referenceTitle,
      //       }
      //     : {}),
      // };

      if (type === "blog") {
        const blogUpdateRequest: BlogUpdateRequest = {
          blogId: dataId,
          title,
          description,
          category,
          content,
          isPublic,
          referenceType: selectedReference?.referenceType ?? "",
          referenceTitle: selectedReference?.referenceTitle ?? "",
          referenceId: selectedReference?.referenceId,
        };
        await updateBlog(blogUpdateRequest);
      }
      if (from === "admin") {
        router.push(`/admin/${type}/${dataId}`);
      } else {
        router.push(`/${type}/${dataId}`);
      }
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  const handleCancel = () => {
    if (from === "admin") {
      router.push(`/admin/${type}/${dataId}`);
    } else {
      router.push(`/${type}/${dataId}`);
    }
  };

  // 로딩 중일 때 표시
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cert-red"></div>
        <span className="ml-2 text-gray-600">데이터를 불러오는 중...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 제목 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
          제목 *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:border-gray-600"
          placeholder="제목을 입력하세요..."
          required
        />
      </div>

      {/* 설명란 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
          설명
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent resize-none dark:border-gray-600"
          placeholder={getDescriptionPlaceholder(type)}
        />
        <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
          선택사항이지만, 다른 사용자들이 내용을 빠르게 파악할 수 있도록
          도와줍니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`relative ${
            type === "blog" || type === "board" ? "md:col-span-3" : ""
          }`}
          ref={selectedReferenceRef}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
            내가 참여한 스터디 / 프로젝트 목록 *
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsSelecteReferenceOpen((prev) => !prev);
                setIsCategoryOpen(false);
                setIsSubCategoryOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm cursor-pointer dark:border-gray-600 dark:bg-gray-800"
            >
              <span
                className={
                  selectedReference
                    ? "text-gray-900 dark:text-gray-200"
                    : "text-gray-500 dark:text-gray-400"
                }
              >
                {selectedReference
                  ? `${
                      selectedReference.referenceType === "STUDY"
                        ? "스터디"
                        : "프로젝트"
                    } - ${selectedReference.referenceTitle}`
                  : "활동 선택"}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isSelectedReferenceOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSelectedReferenceOpen && (
              <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                <div className="max-h-60 overflow-auto p-1">
                  {initialReference &&
                    initialReference.map((reference) => (
                      <button
                        key={`${reference.referenceType}-${reference.referenceId}`}
                        type="button"
                        onClick={() => {
                          setSelectedReference(reference);
                          setIsSelecteReferenceOpen(false);
                        }}
                        className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 px-2 text-sm outline-none transition-colors hover:bg-cert-red hover:text-white focus:bg-cert-red focus:text-white"
                      >
                        {reference.referenceType === "STUDY"
                          ? "스터디"
                          : "프로젝트"}{" "}
                        - {reference.referenceTitle}
                      </button>
                    ))}
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">
              블로그를 작성하고자 하는 스터디, 프로젝트를 선택해주세요. (최대
              1개)
            </p>
          </div>
        </div>
      </div>

      {/* 카테고리 및 최대 참가자 수 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`relative ${
            type === "blog" || type === "board" ? "md:col-span-3" : ""
          }`}
          ref={categoryRef}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
            상위 카테고리 *
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsCategoryOpen(!isCategoryOpen);
                setIsSubCategoryOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-cert-red cursor-pointer dark:border-gray-600 dark:bg-gray-800"
            >
              <span
                className={
                  category
                    ? "text-gray-900 dark:text-gray-200"
                    : "text-gray-500 dark:text-gray-400"
                }
              >
                {category || "카테고리 선택"}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isCategoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCategoryOpen && (
              <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg animate-in fade-in-0 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                <div className="max-h-60 overflow-auto p-1">
                  {getCategories(type).map((categoryItem) => (
                    <button
                      key={categoryItem}
                      type="button"
                      onClick={() => {
                        setCategory(categoryItem);
                        setIsCategoryOpen(false);
                      }}
                      className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 px-2 text-sm outline-none transition-colors hover:bg-cert-red hover:text-white focus:bg-cert-red focus:text-white"
                    >
                      <span className="truncate">{categoryItem}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {(type === "study" || type === "project") && (
          <div className="relative" ref={subCategoryRef}>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
              하위 카테고리 *
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsSubCategoryOpen(!isSubCategoryOpen);
                  setIsCategoryOpen(false);
                }}
                disabled={!category || category === "기타"} // 상위 선택 전 비활성화
                className="flex text-sm w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 transition-colors focus:outline-none focus:ring-1 focus:ring-cert-red disabled:opacity-50 cursor-pointer dark:border-gray-600 dark:bg-gray-800"
              >
                <span
                  className={
                    subCategory
                      ? "text-gray-900 dark:text-gray-200"
                      : "text-gray-500 dark:text-gray-400"
                  }
                >
                  {subCategory ||
                    (category
                      ? "하위 카테고리 선택"
                      : "상위 카테고리 선택 필수")}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isSubCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSubCategoryOpen && (
                <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg animate-in fade-in-0 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                  <div className="max-h-60 overflow-auto p-1">
                    {getSubCategories(category).map((subCategoryItem) => (
                      <button
                        key={subCategoryItem}
                        type="button"
                        onClick={() => {
                          setSubCategory(subCategoryItem);
                          setIsSubCategoryOpen(false);
                        }}
                        className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 px-2 text-sm outline-none transition-colors hover:bg-cert-red hover:text-white focus:bg-cert-red focus:text-white"
                      >
                        <span className="truncate">{subCategoryItem}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {(type === "study" || type === "project") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
              최대 참가자 수 *
            </label>
            <input
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:border-gray-600"
              placeholder="최대 참가자 수"
              min="1"
              max={type === "study" ? "20" : "10"}
              required
            />
          </div>
        )}
      </div>

      {/* 프로젝트 이미지 업로드 */}
      {type === "project" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
            프로젝트 대표 이미지
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProjectImage(e.target.files?.[0] || null)}
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:border-gray-600"
          />
          <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
            새 이미지를 선택하지 않으면 기존 이미지가 유지됩니다.
          </p>
        </div>
      )}

      {/* GitHub URL 및 Demo URL (프로젝트 전용) */}
      {type === "project" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
              GitHub 저장소 URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:border-gray-600"
              placeholder="https://github.com/username/repository"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
              데모 사이트 URL
            </label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:border-gray-600"
              placeholder="https://your-demo-site.com"
            />
          </div>
        </div>
      )}

      {/* 외부 링크 섹션 (프로젝트 전용) */}
      {type === "project" && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              외부 문서/링크
            </label>
            <DefaultButton type="button" size="sm" onClick={addExternalLink}>
              + 링크 추가
            </DefaultButton>
          </div>
          <div className="space-y-3">
            {externalLinks.map((link, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) =>
                      updateExternalLink(index, "label", e.target.value)
                    }
                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:border-gray-600"
                    placeholder="링크 제목"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) =>
                      updateExternalLink(index, "url", e.target.value)
                    }
                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:border-gray-600"
                    placeholder="https://..."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeExternalLink(index)}
                  className="px-3 py-2 text-cert-red hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
            노션, 구글 독스, 피그마 등의 외부 문서나 관련 링크를 추가할 수
            있습니다.
          </p>
        </div>
      )}

      {/* 스터디 및 프로젝트 기간 */}
      {(type === "study" || type === "project") && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
                시작일 *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
                종료일 *
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:border-gray-600"
                required
              />
            </div>
          </div>

          {/* 기간 정책 안내 */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/30 dark:border-blue-700">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 dark:text-blue-300" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium mb-1">
                  {getPeriodPolicyInfo(type)?.title}
                </p>
                <ul className="space-y-1 text-xs">
                  {getPeriodPolicyInfo(type)?.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 파일 업로드 */}
      {(type === "study" || type === "board" || type === "project") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
            첨부 파일
          </label>
          <FileUpload
            attachedFiles={attachments}
            onAttachmentsChange={setAttachments}
          />
        </div>
      )}

      {/* 마크다운 에디터 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
          내용 *
        </label>
        <MarkdownEditor content={content} setContent={setContent} />
      </div>

      {/* 액션 버튼 */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
        {/* 블로그 공개 설정 토글 - blog일 때만 표시 */}
        {type === "blog" && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPublic(!isPublic)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                isPublic ? "bg-cert-red" : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  isPublic ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                {isPublic ? "외부 공개" : "외부 비공개"}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {isPublic
                  ? "모든 사용자가 열람할 수 있습니다"
                  : "CERT-IS에 가입한 회원만 열람할 수 있습니다"}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <DefaultButton variant="outline" onClick={handleCancel}>
            취소
          </DefaultButton>
          <DefaultButton
            onClick={handleSubmit}
            disabled={
              !isFormValid(
                title,
                content,
                category,
                type,
                maxParticipants,
                startDate,
                endDate
              )
            }
          >
            수정하기
          </DefaultButton>
        </div>
      </div>
    </div>
  );
}
