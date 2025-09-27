"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import DefaultButton from "@/components/ui/defaultButton";
import { Info, ChevronDown, X } from "lucide-react";
import FileUpload from "@/components/write/CCFileUpload";
import MarkdownEditor from "@/components/write/CCMarkdownEditor";
import { NewPageCategoryType } from "@/types/newPageForm";
import {
  getCategories,
  getPeriodPolicyInfo,
  getDescriptionPlaceholder,
  isFormValid,
  getSubCategories,
} from "@/utils/newPageFormUtils";
import { AttachedFile } from "@/types/attachedFile";
// import { Reference } from "@/types/blog";
import { updateBoard, getCCDetailBoard } from "@/app/api/board/CCboardApi";
import {
  BoardCategoryType,
  BoardCategoryTypeEN,
  categoryMappingToEN,
  categoryMappingToKO,
} from "@/types/board";
import { getCCDetailStudy, updateStudy } from "@/app/api/study/CCStudyApi";
import { formatDate } from "@/utils/formatDateUtil";
import { toOffset } from "@/utils/transformRequestValue";
import {
  CATEGORY_TO_EN,
  CategoryType,
  SUBCATEGORY_FROM_EN,
  SUBCATEGORY_TO_EN,
  SubCategoryType,
} from "@/types/category";
import {
  getCCDetailProject,
  updateProject,
} from "@/app/api/project/CCProjectApi";
import {
  BlogDetailDataType,
  BlogReferenceType,
  BlogUpdateRequest,
} from "@/types/blog";
import { updateBlog } from "@/app/api/blog/CCblogApi";

interface EditFormProps {
  type: NewPageCategoryType;
  dataId: number;
  initialData?: BlogDetailDataType; // 타입 수정 필요 모든 도메인 타입 || 로 추가 예: BoardDetailDataType, StudyDetailDataType, ProjectDetailDataType
  initialReference?: BlogReferenceType[];
}

export default function EditForm({
  type,
  dataId,
  initialData,
  initialReference,
}: EditFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  // const [title, setTitle] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  // const [content, setContent] = useState<string>("");
  // const [category, setCategory] = useState("");
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState(initialData?.category || "");

  const [subCategory, setSubCategory] = useState("");
  const [attachments, setAttachments] = useState<AttachedFile[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [maxParticipants, setMaxParticipants] = useState<number>();
  // const [selectedReference, setSelectedReference] = useState<Reference | null>(
  //   null
  // );
  const [selectedReference, setSelectedReference] =
    useState<BlogReferenceType | null>(
      initialData?.referenceType
        ? {
            referenceType: initialData.referenceType,
            referenceTitle: initialData.referenceTitle ?? "",
            referenceId: initialData.referenceId,
          }
        : null
    );
  // const [maxParticipants, setMaxParticipants] = useState<string>();
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
  const [externalUrl, setExternalUrl] = useState<{
    title: string;
    url: string;
  }>({
    title: "",
    url: "",
  });
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(""); // 최종 서버 전송용
  const [dateError, setDateError] = useState<string>("");
  const today = new Date().toISOString().split("T")[0]; // 지난 날짜 선택 방지 변수
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string>("");
  const validateDates = useCallback((start: string, end: string) => {
    if (!start || !end) return;

    if (new Date(end) < new Date(start)) {
      setDateError("종료일은 시작일보다 늦어야 합니다.");
    } else {
      setDateError("");
    }
  }, []);

  useEffect(() => {
    validateDates(startDate, endDate);
  }, [startDate, endDate, validateDates]);

  const closeAllDropdowns = useCallback(() => {
    setIsCategoryOpen(false);
    setIsSubCategoryOpen(false);
    setIsSelecteReferenceOpen(false);
  }, []);

  // 초기 데이터 로드
  const [isPublic, setIsPublic] = useState<boolean>(
    initialData?.isPublic ?? false
  );
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        let initialData;

        if (type === "board") {
          const response = await getCCDetailBoard(dataId);
          const boardData = response?.data;

          if (boardData) {
            initialData = {
              title: boardData.title || "",
              description: boardData.description || "",
              content: boardData.content || "",
              category:
                categoryMappingToKO[
                  boardData.category as BoardCategoryTypeEN
                ] || "",
              attachments: boardData.attachments || [],
            };
          }
        } else if (type === "study") {
          const response = await getCCDetailStudy(dataId);
          const studyData = response?.data;

          if (studyData) {
            initialData = {
              title: studyData.title,
              description: studyData.description,
              content: studyData.content,
              category: studyData.category,
              subCategory:
                SUBCATEGORY_FROM_EN[studyData.subCategory] ??
                studyData.subCategory,
              attachments: studyData.attachments || [],
              startDate: studyData.startDate,
              endDate: studyData.endDate,
              maxParticipants: studyData.maxParticipantNumber,
              status: studyData.status,
            };
          }
        } else if (type === "project") {
          const response = await getCCDetailProject(dataId);
          const projectData = response?.data;

          if (projectData) {
            initialData = {
              title: projectData.title,
              description: projectData.description,
              content: projectData.content,
              category: projectData.category,
              subCategory:
                SUBCATEGORY_FROM_EN[projectData.subCategory] ??
                projectData.subCategory,
              attachments: projectData.attachments || [],
              startDate: projectData.startDate,
              endDate: projectData.endDate,
              maxParticipants: projectData.maxParticipantNumber,
              githubUrl: projectData.githubUrl,
              demoUrl: projectData.demoUrl,
              externalUrl: projectData.externalUrl,
              thumbnailUrl: projectData.thumbnailUrl,
              status: projectData.status,
            };
          }
        }

        if (initialData) {
          setTitle(initialData.title || "");
          setDescription(initialData.description || "");
          setContent(initialData.content || "");
          setCategory(initialData.category || "");
          setSubCategory(initialData.subCategory || "");
          setAttachments(initialData.attachments || []);
          setStartDate(formatDate(initialData.startDate, "short") || "");
          setEndDate(formatDate(initialData.endDate, "short") || "");
          setMaxParticipants(initialData.maxParticipants || "");
          setGithubUrl(initialData.githubUrl || "");
          setDemoUrl(initialData.demoUrl || "");
          setExternalUrl(initialData.externalUrl ?? { title: "", url: "" });
          setThumbnailUrl(initialData.thumbnailUrl || "");
          // setSelectedReference(initialData.reference || null); // FIXME:
          if ("reference" in initialData) {
            setSelectedReference(
              (initialData.reference as BlogReferenceType) || null
            );
          } else {
            setSelectedReference(null);
          }
          setStatus(initialData.status || "");
        } else {
          console.warn("Initial data가 없습니다!");
        }
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (dataId && type) {
      loadInitialData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const updateExternalLink = (field: "title" | "url", value: string) => {
    setExternalUrl((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const baseData = {
        title,
        content,
        description,
      };

      let response;
      const isAdmin = pathname.startsWith("/admin");
      switch (type) {
        case "board": {
          const updateData = {
            ...baseData,
            category: categoryMappingToEN[category as BoardCategoryType],
            attachments,
          };
          response = await updateBoard(dataId, updateData);
          if (response?.statusCode === 200) {
            router.push(`/board/${dataId}`);
            router.refresh();
          }
          break;
        }

        case "blog":
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
          if (from === "admin") {
            router.push(`/admin/${type}/${dataId}`);
          } else {
            router.push(`/${type}/${dataId}`);
          }
          break;
        // }

        case "study": {
          const updateData = {
            ...baseData,
            category: CATEGORY_TO_EN[category as CategoryType],
            subCategory: SUBCATEGORY_TO_EN[subCategory as SubCategoryType],
            studyId: dataId,
            description: description ?? "",
            startDate: toOffset(startDate),
            endDate: toOffset(endDate),
            maxParticipants: maxParticipants ?? 0,
            attachments: attachments,
          };

          response = await updateStudy(dataId, updateData);
          if (response?.statusCode === 200) {
            router.push(
              isAdmin ? `/admin/study/${dataId}?tab=study` : `/study/${dataId}`
            );
            router.refresh();
          }
          break;
        }

        case "project": {
          const updateData = {
            ...baseData,
            projectId: dataId,
            category: CATEGORY_TO_EN[category as CategoryType],
            subCategory: SUBCATEGORY_TO_EN[subCategory as SubCategoryType],
            startDate: toOffset(startDate),
            endDate: toOffset(endDate),
            maxParticipants: maxParticipants ?? 0,
            githubUrl,
            demoUrl,
            externalUrl:
              externalUrl.title && externalUrl.url ? externalUrl : undefined,
            thumbnailUrl: thumbnailUrl,
            attachments: attachments,
          };

          response = await updateProject(dataId, updateData);
          if (response?.statusCode === 200) {
            router.push(
              isAdmin
                ? `/admin/study/${dataId}?tab=project`
                : `/project/${dataId}`
            );
            router.refresh();
          }
          break;
        }

        default:
          throw new Error(`Unknown type: ${type}`);
      }
    } catch (error) {
      console.error(`${type} 수정 중 오류 발생:`, error);
    }
  };

  const handleCancel = () => {
    if (from === "admin") {
      router.push(`/admin/${type}/${dataId}`);
    } else {
      router.push(`/${type}/${dataId}`);
    }
  };

  // handleFileChange 수정
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setThumbnailUrl("");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 초기화 함수 추가
  const clearThumbnail = () => {
    setThumbnailUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

      {type === "blog" && (
        <div className="grid grid-cols-1 gap-4">
          <div ref={selectedReferenceRef}>
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
      )}

      {/* 카테고리 및 참가자 수 */}
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
                  {subCategory
                    ? SUBCATEGORY_FROM_EN[subCategory] ?? subCategory
                    : category
                    ? "하위 카테고리 선택"
                    : "상위 카테고리 선택 필수"}
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
              value={maxParticipants ?? ""}
              onChange={(e) =>
                setMaxParticipants(
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:border-gray-600"
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
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent 
          dark:border-gray-600"
            />
            {thumbnailUrl && (
              <div className="relative mt-2">
                <div className="relative group inline-block">
                  {/* eslint-disable @next/next/no-img-element */}
                  <img
                    src={thumbnailUrl}
                    alt="Thumbnail preview"
                    className="max-h-24 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={clearThumbnail}
                    className="absolute top-1 right-1 p-1 bg-gray-800/70 hover:bg-gray-900/70 
                   rounded-full text-white opacity-0 group-hover:opacity-100 
                   transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              새 이미지를 선택하지 않으면 기존 이미지가 유지됩니다.
            </p>
          </div>
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
              프로젝트 소개 페이지
            </label>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <input
                  type="text"
                  value={externalUrl?.title}
                  onChange={(e) => updateExternalLink("title", e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent
                       dark:border-gray-600"
                  placeholder="CERT-IS 프로젝트 소개"
                />
              </div>
              <div className="flex-1">
                <input
                  type="url"
                  value={externalUrl?.url}
                  onChange={(e) => updateExternalLink("url", e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent
                       dark:border-gray-600"
                  placeholder="https://project-introducing-site.com"
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            해당 프로젝트를 설명할 수 있는 링크를 추가할 수 있습니다.
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
                min={today}
                onChange={(e) => setStartDate(e.target.value)}
                className={`w-full text-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent cursor-pointer dark:border-gray-600
            ${dateError ? "border-cert-red" : "border-gray-300"}
            ${
              status !== "READY"
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : ""
            }`}
                required
                disabled={status !== "READY"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
                종료일 *
              </label>
              <input
                type="date"
                value={endDate}
                min={today}
                onChange={(e) => setEndDate(e.target.value)}
                className={`w-full text-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent cursor-pointer dark:border-gray-600
                    ${dateError ? "border-cert-red" : "border-gray-300"}`}
                required
              />
            </div>
            {dateError && (
              <p className="text-cert-red text-sm">⚠️ {dateError}</p>
            )}
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
            attachments={attachments}
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

        {/* 액션 버튼: 항상 우측 고정 */}
        <div className="flex items-center gap-3 ml-auto">
          <DefaultButton variant="outline" onClick={handleCancel}>
            취소
          </DefaultButton>
          <DefaultButton
            onClick={handleSubmit}
            disabled={
              !isFormValid(
                title,
                description,
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
      {/* </div> */}
    </div>
  );
}
