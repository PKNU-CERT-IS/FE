"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import DefaultButton from "@/components/ui/defaultButton";
import { Info, ChevronDown } from "lucide-react";
import FileUpload from "@/components/write/CCFileUpload";
import MarkdownEditor from "@/components/write/CCMarkdownEditor";
import { mockBlogPosts } from "@/mocks/blogData";
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
import { Reference } from "@/types/blog";
import { updateBoard, getDetailBoard } from "@/api/board/CCboard";
import { BoardCategoryTypeEN, categoryMappingToKO } from "@/types/board";

interface EditFormProps {
  type: NewPageCategoryType;
  dataId: number;
}

// 내가 참여한 활동 리스트 (더미 예시)
const myActivities: Reference[] = [
  { referenceId: 1, type: "study", title: "OWASP Top 10 2023 취약점 분석" },
  {
    referenceId: 2,
    type: "study",
    title: "Metasploit Framework 완전 정복",
  },
  {
    referenceId: 1,
    type: "project",
    title: "Social Impact Hackathon 2025",
  },
  {
    referenceId: 2,
    type: "project",
    title: "OWASP Top 10 2023 취약점 분석",
  },
];

export default function EditForm({ type, dataId }: EditFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [attachments, setAttachments] = useState<AttachedFile[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [maxParticipants, setMaxParticipants] = useState<string>();
  const [selectedReference, setSelectedReference] = useState<Reference | null>(
    null
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
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        let initialData;

        if (type === "board") {
          const response = await getDetailBoard(dataId);
          const data = response?.data;

          if (data) {
            initialData = {
              title: data.title || "",
              description: data.description || "",
              content: data.content || "",
              category: data.category || "",
              attachedFiles: data.attachments || [],
            };
          }
        } else if (type === "blog") {
          const blogData = mockBlogPosts.find((item) => item.id === dataId);

          if (blogData) {
            initialData = {
              title: blogData.title,
              content: blogData.content,
              category: blogData.category,
              description: blogData.excerpt || "",
              reference: blogData.reference || null,
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
          const projectMaterials = getProjectMaterials();
          const projectData = projectMaterials.find(
            (item) => item.id === dataId.toString()
          );

          if (projectData) {
            initialData = {
              title: projectData.title,
              description: projectData.description,
              content: projectData.description,
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
        } else {
          console.warn("Initial data가 없습니다!");
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (dataId && type) {
      loadInitialData();
    } else {
      console.warn("dataId 또는 type이 없습니다:", { dataId, type });
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
      // 타입별 데이터 구조 반영
      const updateData = {
        id: dataId,
        title,
        ...(type === "project" && { description }),
        content,
        category,
        subCategory,
        ...((type === "study" || type === "project") && {
          startDate,
          endDate,
          maxParticipants: maxParticipants
            ? parseInt(maxParticipants, 10)
            : undefined,
        }),
        ...(type === "project" && {
          githubUrl,
          demoUrl,
          externalLinks: externalLinks.filter((link) => link.label && link.url),
          projectImage,
        }),
        ...(type === "blog" && { reference: selectedReference ?? null }), // ✅ null 허용
      };

      switch (type) {
        case "board": {
          const response = await updateBoard(dataId, updateData);
          if (response?.statusCode === 200) {
            // 성공 처리
            router.push(`/board/${dataId}`);
            router.refresh();
          }
          break;
        }

        case "blog":
          // TODO: 블로그 수정 API 연동 필요
          break;

        case "study":
          // TODO: 스터디 수정 API 연동 필요
          break;

        case "project":
          // TODO: 프로젝트 수정 API 연동 필요
          break;

        default:
          throw new Error(`Unknown type: ${type}`);
      }
    } catch (error) {
      console.error(`${type} 수정 중 오류 발생:`, error);
    }
  };

  const handleCancel = () => {
    router.push(`/${type}/${dataId}`);
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
                        selectedReference.type === "study"
                          ? "스터디"
                          : "프로젝트"
                      } - ${selectedReference.title}`
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
                    {myActivities.map((reference) => (
                      <button
                        key={`${reference.type}-${reference.referenceId}`}
                        type="button"
                        onClick={() => {
                          setSelectedReference(reference);
                          setIsSelecteReferenceOpen(false);
                        }}
                        className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 px-2 text-sm outline-none transition-colors hover:bg-cert-red hover:text-white focus:bg-cert-red focus:text-white"
                      >
                        {reference.type === "study" ? "스터디" : "프로젝트"} -{" "}
                        {reference.title}
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
                {/* {category || "카테고리 선택"} */}
                {category
                  ? type === "board"
                    ? categoryMappingToKO[category as BoardCategoryTypeEN]
                    : category
                  : "카테고리 선택"}
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
                      <span className="truncate">
                        {/* {categoryItem} */}
                        {type === "board"
                          ? categoryMappingToKO[
                              categoryItem as BoardCategoryTypeEN
                            ]
                          : categoryItem}
                      </span>
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
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
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
              description,
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
  );
}
