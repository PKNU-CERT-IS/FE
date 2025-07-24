"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DefaultButton from "@/components/ui/defaultButton";
import { Calendar, ChevronDown } from "lucide-react";
import TagInput from "@/components/write/CCTagInput";
import FileUpload from "@/components/write/CCFileUpload";
import MarkdownEditor from "@/components/write/CCMarkdownEditor";
import { mockBoardData } from "@/mocks/mockBoardData";
import { mockBoardDetailData } from "@/mocks/mockBoardDetailData";
import { mockBlogPosts } from "@/mocks/blogData";
import { mockStudyDetailData } from "@/mocks/mockStudyDetailData";

interface EditFormProps {
  type: "board" | "blog" | "study";
  dataId: number;
}

export default function EditForm({ type, dataId }: EditFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const categoryRef = useRef<HTMLDivElement>(null);

  // 초기 데이터 로드
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
              tags: boardDetailData.tags || [],
              attachments: boardDetailData.attachments || [],
            };
          }
        } else if (type === "blog") {
          const blogData = mockBlogPosts.find((item) => item.id === dataId);
          if (blogData) {
            initialData = {
              title: blogData.title,
              content: blogData.content,
              category: blogData.category,
              tags: blogData.tags || [],
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
              tags: studyData.tags || [],
              attachments: studyData.files || [],
              startDate: studyData.startDate,
              endDate: studyData.endDate || "",
              maxParticipants: String(studyData.maxParticipants || ""),
            };
          }
        }
        // 초기 데이터가 존재하면 state 설정
        if (initialData) {
          setTitle(initialData.title || "");
          setContent(initialData.content || "");
          setCategory(initialData.category || "");
          setTags(initialData.tags || []);
          setAttachments(initialData.attachments || []); // 향후 타입 수정
          setStartDate(initialData.startDate || "");
          setEndDate(initialData.endDate || "");
          setMaxParticipants(initialData.maxParticipants || "");
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCategories = () => {
    switch (type) {
      case "board":
        return ["공지사항", "보안이슈", "기술자료", "스터디", "프로젝트"];
      case "blog":
        return ["개발", "학습", "활동", "가이드", "디자인"];
      case "study":
        return [
          "웹 보안",
          "모의해킹",
          "암호학",
          "디지털 포렌식",
          "네트워크 보안",
          "기타",
        ];
      default:
        return [];
    }
  };

  const handleSubmit = async () => {
    try {
      // 수정 API 호출
      const updateData = {
        id: dataId,
        title,
        content,
        category,
        tags,
        ...(type === "study" && {
          startDate,
          endDate,
          maxParticipants: maxParticipants
            ? parseInt(maxParticipants)
            : undefined,
        }),
      };

      // api ...
      console.log("수정 데이터:", updateData);
      router.push(`/${type}/${dataId}`);
    } catch (error) {
      console.error("수정 실패:", error);
      // 에러 처리
    }
  };

  const handleCancel = () => {
    // api ...
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          제목 *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
          placeholder="제목을 입력하세요..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative" ref={categoryRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카테고리 *
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-cert-red "
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
              <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg animate-in fade-in-0 ">
                <div className="max-h-60 overflow-auto p-1">
                  {getCategories().map((categoryItem) => (
                    <button
                      key={categoryItem}
                      type="button"
                      onClick={() => {
                        setCategory(categoryItem);
                        setIsCategoryOpen(false);
                      }}
                      className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 px-2 text-sm outline-none transition-colors hover:bg-cert-red hover:text-white focus:bg-cert-red focus:text-white "
                    >
                      <span className="truncate">{categoryItem}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {type === "study" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              최대 참가자 수
            </label>
            <input
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
              placeholder="최대 참가자 수"
              min="1"
              max="20"
            />
          </div>
        )}
      </div>

      {/* 스터디 기간 */}
      {type === "study" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                시작일 *
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
                종료일 *
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

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">스터디 기간 정책</p>
                <ul className="space-y-1 text-xs">
                  <li>• 스터디: 1주 ~ 2개월 수행 가능</li>
                  <li>• 2주 이하: 모든 주제 가능 (운동, 노래, 시험공부 등)</li>
                  <li>• 2주 이상: 보안 또는 컴퓨터 관련 주제만 가능</li>
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

      {(type === "study" || type === "board") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
            !title.trim() ||
            !content.trim() ||
            !category ||
            (type === "study" && (!startDate || !endDate))
          }
        >
          수정하기
        </DefaultButton>
      </div>
    </div>
  );
}
