"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import DefaultButton from "@/components/ui/defaultButton";
import { ChevronDown, Download, FileText, Info } from "lucide-react";
import TagInput from "@/components/write/CCTagInput";
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

interface WriteFormProps {
  type: NewPageCategoryType;
}

// 파일 맨 위 근처에 추가
const PLAN_SAMPLE = {
  label: "계획서 샘플 (DOCX)",
  href: "/samples/plan-sample.docx", // public/samples/plan-sample.docx 에 파일 두기
};

export default function WriteForm({ type }: WriteFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>(""); // 설명란 추가
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<AttachedFile[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState<boolean>(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const subCategoryRef = useRef<HTMLDivElement>(null);

  // 프로젝트 전용 필드들
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [demoUrl, setDemoUrl] = useState<string>("");
  const [externalLinks, setExternalLinks] = useState<
    { label: string; url: string; type?: string }[]
  >([]);
  const [projectImage, setProjectImage] = useState<File | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [semester, setSemester] = useState<string>("");
  // 드롭다운 닫기 함수
  const closeAllDropdowns = useCallback(() => {
    setIsCategoryOpen(false);
    setIsSubCategoryOpen(false);
  }, []);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        categoryRef.current?.contains(target) ||
        subCategoryRef.current?.contains(target)
      ) {
        return;
      }
      closeAllDropdowns();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeAllDropdowns]);

  const addExternalLink = () => {
    setExternalLinks([
      ...externalLinks,
      { label: "", url: "", type: "website" },
    ]);
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
    // API 요청 시 description도 함께 전송
    const submitData = {
      title,
      description,
      content,
      category,
      tags,
      attachments,
      ...(type === "study" || type === "project" ? { startDate, endDate } : {}),
      ...(type === "study" || type === "project" ? { maxParticipants } : {}),
      ...(type === "project"
        ? {
            githubUrl,
            demoUrl,
            externalLinks: externalLinks.filter(
              (link) => link.label && link.url
            ),
            projectImage,
            semester,
          }
        : {}),
    };

    console.log("Submit data:", submitData);

    router.replace(`/${type}`);
    router.refresh();
    // API 요청 구현
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="space-y-6">
      {(type === "study" || type === "project") && (
        <section className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                계획서 샘플 다운로드
              </h3>
              <p className="text-xs text-gray-500 whitespace-nowrap">
                (계획서 작성 후, 반드시 첨부파일에 첨부해주세요)
              </p>
            </div>

            {/* 다운로드 버튼 */}
            <a
              href={PLAN_SAMPLE.href}
              download
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              {PLAN_SAMPLE.label}
            </a>
          </div>
        </section>
      )}

      {/* 제목 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          제목 * (25자 이내)
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
          placeholder="제목을 입력하세요..."
          maxLength={25}
          required
        />
      </div>

      {/* 설명란 - 모든 도메인에 추가 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          설명
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent resize-none"
          placeholder={getDescriptionPlaceholder(type)}
        />
        <p className="text-xs text-gray-500 mt-1">
          선택사항이지만, 다른 사용자들이 내용을 빠르게 파악할 수 있도록
          도와줍니다.
        </p>
      </div>

      {/* 카테고리 및 최대 참가자 수 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative" ref={categoryRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상위 카테고리 *
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsCategoryOpen(!isCategoryOpen);
                setIsSubCategoryOpen(false);
              }}
              className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-cert-red cursor-pointer"
            >
              <span className={category ? "text-gray-900" : "text-gray-500"}>
                {category || "카테고리 선택"}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isCategoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCategoryOpen && (
              <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg animate-in fade-in-0">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-cert-red disabled:opacity-50 cursor-pointer"
              >
                <span
                  className={subCategory ? "text-gray-900" : "text-gray-500"}
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
                <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg animate-in fade-in-0">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              최대 참가자 수 *
            </label>
            <input
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            프로젝트 대표 이미지
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProjectImage(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub 저장소 URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
              placeholder="https://github.com/username/repository"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              데모 사이트 URL
            </label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
              placeholder="https://your-demo-site.com"
            />
          </div>
        </div>
      )}

      {/* 외부 링크 섹션 (프로젝트 전용) */}
      {type === "project" && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeExternalLink(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                시작주 *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                종료주 *
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
                required
              />
            </div>
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

      {/* 태그 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          태그
        </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* 파일 업로드 */}
      {(type === "study" || type === "board" || type === "project") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          내용 *
        </label>
        <MarkdownEditor content={content} setContent={setContent} />
      </div>

      {/* 액션 버튼 */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
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
          {type === "study"
            ? "스터디 개설"
            : type === "project"
            ? "프로젝트 생성"
            : "게시하기"}
        </DefaultButton>
      </div>
    </div>
  );
}
