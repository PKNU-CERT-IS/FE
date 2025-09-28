"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import DefaultButton from "@/components/ui/defaultButton";
import { ChevronDown, Download, FileText, Info } from "lucide-react";
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
import { createBoard } from "@/app/api/board/CCboardApi";
import { BlogReferenceType, BlogCreateRequest } from "@/types/blog";
import { createBlog } from "@/app/api/blog/CCblogApi";
import AlertModal from "@/components/ui/defaultAlertModal";
import { createStudy } from "@/app/api/study/CCStudyApi";
import { toOffset } from "@/utils/transformRequestValue";
import {
  CATEGORY_TO_EN,
  CategoryType,
  SUBCATEGORY_TO_EN,
  SubCategoryType,
} from "@/types/category";
import { BoardCategoryType, categoryMappingToEN } from "@/types/board";
import { createProject } from "@/app/api/project/CCProjectApi";

interface WriteFormProps {
  type: NewPageCategoryType;
  initialReferences?: BlogReferenceType[];
}

const PLAN_SAMPLE = {
  label: "스터디(프로젝트) 계획서_스터디(프로젝트)명",
  href: "/files/스터디(프로젝트) 계획서_스터디(프로젝트)명.hwpx",
};

export default function WriteForm({ type, initialReferences }: WriteFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [attachments, setAttachments] = useState<AttachedFile[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [maxParticipants, setMaxParticipants] = useState<number>();
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState<boolean>(false);
  const [isSelectedReferenceOpen, setIsSelecteReferenceOpen] =
    useState<boolean>(false);
  const [selectedReference, setSelectedReference] =
    useState<BlogReferenceType | null>(null);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState(false);

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

  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");
  const today = new Date().toISOString().split("T")[0]; // 지난 날짜 선택 방지 변수
  // 날짜 검증 함수 추가
  const validateDates = useCallback((start: string, end: string) => {
    if (!start || !end) return;

    if (new Date(end) < new Date(start)) {
      setDateError("종료일은 시작일보다 늦어야 합니다.");
    } else {
      setDateError("");
    }
  }, []);

  // useEffect로 날짜 변경 감지
  useEffect(() => {
    validateDates(startDate, endDate);
  }, [startDate, endDate, validateDates]);

  // 드롭다운 닫기 함수
  const closeAllDropdowns = useCallback(() => {
    setIsCategoryOpen(false);
    setIsSubCategoryOpen(false);
    setIsSelecteReferenceOpen(false);
  }, []);

  // 외부 클릭 감지
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

  // 값 변경
  const updateExternalLink = (field: "title" | "url", value: string) => {
    setExternalUrl((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const baseData = {
        title,
        description,
        content,
        // category,
      };

      let submitData;

      switch (type) {
        case "board":
          submitData = {
            ...baseData,
            category: categoryMappingToEN[category as BoardCategoryType],
            attachments: attachments.map((file) => ({
              name: file.name,
              type: file.type,
              size: file.size,
              attachedUrl: file.attachedUrl,
              id: file.id,
            })),
          };

          const apiResponse = await createBoard(submitData);
          if (apiResponse?.statusCode === 201) {
            router.back();
            setTimeout(() => {
              router.refresh();
            }, 100);
          }
          break;
        case "blog": {
          const submitData: BlogCreateRequest = {
            ...baseData,
            category,
            isPublic,
            referenceId: selectedReference?.referenceId,
            referenceType: selectedReference?.referenceType,
            referenceTitle: selectedReference?.referenceTitle,
          };
          const blogApiResponse = await createBlog(submitData);
          if (blogApiResponse?.statusCode === 201) {
            router.back();
            setTimeout(() => {
              router.refresh();
            }, 100);
          } else {
            throw new Error("블로그 생성 실패");
          }
          break;
        }

        case "study": {
          submitData = {
            ...baseData,
            category,
            subCategory: SUBCATEGORY_TO_EN[subCategory as SubCategoryType],
            startDate: toOffset(startDate),
            endDate: toOffset(endDate),
            maxParticipants: maxParticipants ?? 0,
            attachments: attachments.map((file) => ({
              name: file.name,
              type: file.type,
              size: file.size,
              attachedUrl: file.attachedUrl,
              id: file.id,
            })),
          };
          const studyApiResponse = await createStudy(submitData);
          if (studyApiResponse?.statusCode === 201) {
            router.back();
            setTimeout(() => {
              router.refresh();
            }, 100);
          }
          break;
        }
        case "project": {
          submitData = {
            ...baseData,
            category: CATEGORY_TO_EN[category as CategoryType],
            subCategory: SUBCATEGORY_TO_EN[subCategory as SubCategoryType],
            startDate: toOffset(startDate),
            endDate: toOffset(endDate),
            maxParticipants: maxParticipants ?? 0,
            githubUrl,
            externalUrl:
              externalUrl.title && externalUrl.url ? externalUrl : undefined,
            thumbnailUrl,
            attachments: attachments.map((file) => ({
              name: file.name,
              type: file.type,
              size: file.size,
              attachedUrl: file.attachedUrl,
              id: file.id,
            })),
            demoUrl,
          };
          const projectApiResponse = await createProject(submitData);
          if (projectApiResponse?.statusCode === 201) {
            router.back();
            setTimeout(() => {
              router.refresh();
            }, 100);
          }
          break;
        }
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    } catch (error) {
      setAlertOpen(true);
      throw error;
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="space-y-6">
        {(type === "study" || type === "project") && (
          <section className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex flex-row items-center gap-2">
                <FileText className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                <h3 className="text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-gray-200">
                  계획서 샘플 다운로드
                </h3>
                <p className="text-xs text-gray-500 whitespace-nowrap dark:text-gray-400 sm:flex hidden">
                  (계획서 작성 후, 반드시 첨부파일에 첨부해주세요)
                </p>
              </div>

              <a
                href={PLAN_SAMPLE.href}
                download
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 whitespace-nowrap dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 hover:dark:bg-gray-700"
              >
                <Download className="w-4 h-4" />
                {PLAN_SAMPLE.label}
              </a>
            </div>
          </section>
        )}

        {/* 제목 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
            제목 * (25자 이내)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:border-gray-600"
            placeholder="제목을 입력하세요..."
            maxLength={25}
            required
          />
        </div>

        {/* 설명란 - 모든 도메인에 추가 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
            설명 *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent resize-none dark:border-gray-600"
            placeholder={getDescriptionPlaceholder(type)}
            required
          />
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
                      {(initialReferences ?? []).map((reference) => (
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
                  블로그를 작성하고자 하는 스터디, 프로젝트를 선택해주세요.
                  (최대 1개)
                </p>
              </div>
            </div>
          </div>
        )}

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
                          setSubCategory("");
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
                  disabled={!category || category === "기타"}
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
                value={maxParticipants ?? ""}
                onChange={(e) =>
                  setMaxParticipants(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:border-gray-600"
                placeholder="최대 참가자 수"
                min={1}
                max={type === "study" ? 20 : 10}
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
              onChange={handleFileChange}
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md 
             focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent 
             dark:border-gray-600"
            />
            <p className="text-xs text-gray-500 mt-1">
              선택하지 않으면 제목의 첫 글자로 기본 이미지가 생성됩니다.
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

        {/* 프로젝트 소개 페이지 (프로젝트 전용) */}
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
                    value={externalUrl.title}
                    onChange={(e) =>
                      updateExternalLink("title", e.target.value)
                    }
                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent
                       dark:border-gray-600"
                    placeholder="CERT-IS 프로젝트 소개"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="url"
                    value={externalUrl.url}
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
                  시작주 *
                </label>
                <input
                  type="date"
                  value={startDate}
                  min={today}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`w-full text-sm px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent cursor-pointer dark:border-gray-600
                    ${dateError ? "border-cert-red" : "border-gray-300"}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
                  종료주 *
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
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
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
              첨부 파일 {(type === "study" || type === "project") && "*"}
            </label>
            <FileUpload
              attachments={attachments}
              onAttachmentsChange={setAttachments}
            />
            {(type === "study" || type === "project") && (
              <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                계획서를 반드시 첨부해주세요.
              </p>
            )}
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
                  endDate,
                  attachments
                )
              }
            >
              {type === "study"
                ? "스터디 개설"
                : type === "project"
                ? "프로젝트 생성"
                : "게시하기"}
            </DefaultButton>
          </div>
        </div>
      </div>
      <AlertModal
        isOpen={alertOpen}
        message="생성 중 오류가 발생했습니다."
        type="error"
        duration={3000}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}
