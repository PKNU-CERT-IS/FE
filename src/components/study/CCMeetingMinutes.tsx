"use client";

import { useEffect, useState, useRef } from "react";
import {
  Plus,
  Users,
  Edit,
  Trash2,
  Calendar,
  X,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";
import DefaultButton from "@/components/ui/defaultButton";
import ConfirmModal from "@/components/ui/defaultConfirmModal";
import type { LinkItem, MeetingMinute } from "@/types/study";
import { formatDate } from "@/utils/formatDateUtil";
import { usePathname } from "next/navigation";

// Mock data for meeting minutes
const mockMeetingMinutes: MeetingMinute[] = [
  {
    id: 1,
    // week: 1,
    title: "웹 기초 및 HTTP 프로토콜",
    created_at: "2024-10-24 10:37:29+00",
    updated_at: "2025-07-26 05:52:55+00",
    content:
      "HTTP 프로토콜의 기본 구조와 요청/응답 메커니즘에 대해 학습했습니다. Burp Suite를 이용한 HTTP 트래픽 분석 실습을 진행했습니다.",
    participants: 4,
    author: "김보안",
    links: [
      { title: "HTTP 기본 자료", url: "https://example.com/web-basics" },
      { title: "Burp Suite 가이드", url: "https://example.com/burp-guide" },
    ],
  },
  {
    id: 2,
    // week: 2,
    title: "SQL Injection 이론 및 실습",
    created_at: "2024-10-24 10:37:29+00",
    updated_at: "2025-07-26 05:52:55+00",
    content:
      "SQL Injection의 원리와 다양한 공격 기법에 대해 학습했습니다. DVWA를 이용한 실습을 통해 Union-based, Boolean-based, Time-based SQL Injection을 실습했습니다.",
    participants: 7,
    author: "김보안",
    links: [
      {
        title: "회의록 링크",
        url: "https://example.com/sql-injection",
      },
    ],
  },
];

interface MeetingMinutesProps {
  studyId: string;
  currentUserId: number;
  studyLeaderId: number;
}

export default function MeetingMinutes({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  studyId,
  currentUserId,
  studyLeaderId,
}: MeetingMinutesProps) {
  const pathname = usePathname();
  const pageType = pathname.startsWith("/study") ? "스터디" : "프로젝트";
  const [meetingMinutes, setMeetingMinutes] =
    useState<MeetingMinute[]>(mockMeetingMinutes);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingMinute, setEditingMinute] = useState<MeetingMinute | null>(
    null
  );
  const [newMinute, setNewMinute] = useState({
    title: "",
    content: "",
    participants: 0,
    links: [] as LinkItem[],
  });
  const [deleteMinuteId, setDeleteMinuteId] = useState<number | null>(null);
  const [isModalMounted, setIsModalMounted] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  // 스터디 장인지 확인
  const isStudyLeader = currentUserId === studyLeaderId;

  // 모달 열기 함수 (트랜지션을 위해 약간의 지연 추가)
  const openModal = () => {
    setIsModalMounted(true);
    setTimeout(() => setShowAddModal(true), 10);
  };

  const closeModal = () => {
    setIsModalMounted(false);
    setShowAddModal(false);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalMounted(false);
        setShowAddModal(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (showAddModal) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddModal]);

  // 링크 추가 함수
  const addLink = () => {
    setNewMinute({
      ...newMinute,
      links: [...newMinute.links, { title: "", url: "" }],
    });
  };

  // 링크 제거 함수
  const removeLink = (index: number) => {
    setNewMinute({
      ...newMinute,
      links: newMinute.links.filter((_, i) => i !== index),
    });
  };

  // 링크 업데이트 함수
  const updateLink = (index: number, field: "title" | "url", value: string) => {
    const updatedLinks = newMinute.links.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setNewMinute({
      ...newMinute,
      links: updatedLinks,
    });
  };

  const handleAddMinute = () => {
    if (!newMinute.title.trim() || !newMinute.content.trim()) return;

    // 빈 링크 제거 (제목과 URL이 모두 있는 것만 유지)
    const validLinks = newMinute.links.filter(
      (link) => link.title.trim() && link.url.trim()
    );

    const minute: MeetingMinute = {
      id: Date.now(),
      title: newMinute.title,
      content: newMinute.content,
      links: validLinks,
      author: "현재 사용자", // TODO: 실제 사용자 이름으로 변경
      created_at: formatDate(new Date(), "dot"),
      updated_at: formatDate(new Date(), "dot"),
      participants: newMinute.participants,
    };

    setMeetingMinutes([...meetingMinutes, minute]);
    setNewMinute({
      title: "",
      content: "",
      participants: 0,
      links: [],
    });
    // setShowAddModal(false);
    closeModal();
  };

  const handleEditMinute = (minute: MeetingMinute) => {
    setEditingMinute(minute);
    setNewMinute({
      title: minute.title,
      content: minute.content,
      participants: minute.participants,
      links: minute.links || [],
    });
    openModal();
  };

  const handleUpdateMinute = () => {
    if (!editingMinute) return;

    // 빈 링크 제거
    const validLinks = newMinute.links.filter(
      (link) => link.title.trim() && link.url.trim()
    );

    const updated = meetingMinutes.map((minute) =>
      minute.id === editingMinute.id
        ? {
            ...minute,
            title: newMinute.title,
            content: newMinute.content,
            participants: newMinute.participants,
            links: validLinks,
          }
        : minute
    );

    setMeetingMinutes(updated);
    setEditingMinute(null);
    setNewMinute({ title: "", content: "", participants: 0, links: [] });
    setShowAddModal(false);
  };

  const handleDeleteMinute = () => {
    if (deleteMinuteId) {
      setMeetingMinutes(
        meetingMinutes.filter((minute) => minute.id !== deleteMinuteId)
      );
    }
    setDeleteMinuteId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteMinuteId(null);
  };

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getPreview = (text: string, limit = 20) =>
    text.length > limit ? `${text.slice(0, limit)}…` : text;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg mt-6">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-cert-black">
              {pageType} 회의록
            </h2>
            <div className="mt-1 space-y-1  rounded-lg">
              <p className="text-sm text-gray-500">
                • {pageType} 회의록을 작성하고 관리합니다.
                <br /> • {pageType} 장만 회의록을 추가할 수 있습니다.
                <br />• 회의록은 회차별로 관리되며 주에 1회 이상 결과물을
                작성해주시기 바랍니다.
              </p>
            </div>
          </div>
          <div>
            {isStudyLeader && (
              <DefaultButton size="sm" onClick={openModal}>
                <Plus className="w-4 h-4 mr-2" />
                회의록 추가
              </DefaultButton>
            )}
          </div>
        </div>
      </div>

      {/* 회의록 목록 */}
      <div className="p-6">
        <div className="space-y-4">
          {meetingMinutes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              아직 작성된 회의록이 없습니다.
            </div>
          ) : (
            meetingMinutes.map((minute) => {
              const isLong = (minute.content || "").length > 30;
              const expanded = expandedIds.has(minute.id);
              const textToShow =
                isLong && !expanded
                  ? getPreview(minute.content)
                  : minute.content;

              return (
                <div
                  key={minute.id}
                  className="bg-gray-50 rounded-lg border border-gray-200 p-3"
                >
                  {/* 상단: 제목 + 액션 */}
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-medium text-gray-900 leading-tight">
                      {minute.title}
                    </h4>
                    {isStudyLeader && (
                      <div className="flex gap-0 shrink-0">
                        <DefaultButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditMinute(minute)}
                        >
                          <Edit className="w-4 h-4" />
                        </DefaultButton>
                        <DefaultButton
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteMinuteId(minute.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </DefaultButton>
                      </div>
                    )}
                  </div>

                  {/* 메타: 날짜 · 참석 · 작성자 (한 줄 배치) */}
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {formatDate(minute.created_at)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      참석: {minute.participants}명
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      작성자: {minute.author}
                    </span>
                  </div>

                  {/* content: 더보기/접기 대상 영역 */}
                  <div className="mt-2 flex flex-row gap-2">
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {textToShow}
                    </p>
                    {isLong && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(minute.id)}
                        className="inline-flex items-center whitespace-nowrap text-xs text-gray-500 hover:underline"
                      >
                        {expanded ? (
                          <>
                            접기 <ChevronUp className="w-3.5 h-3.5 ml-0.5" />
                          </>
                        ) : (
                          <>
                            더보기{" "}
                            <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* 링크: 인라인 배치 */}
                  {minute.links && minute.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {minute.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-blue-600 hover:underline"
                        >
                          🔗 {link.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 회의록 추가/수정 다이얼로그 */}
      {isModalMounted && (
        <div className="fixed inset-0 bg-cert-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className={`bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto ${
              showAddModal ? "opacity-100 scale-100" : "opacity-0 scale-75"
            } transition-transform duration-300 ease-out`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingMinute ? "회의록 수정" : "회의록 추가"}
              </h3>
              <button
                onClick={() => {
                  closeModal();
                  setEditingMinute(null);
                  setNewMinute({
                    title: "",
                    content: "",
                    participants: 0,
                    links: [],
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  value={newMinute.title}
                  onChange={(e) =>
                    setNewMinute({ ...newMinute, title: e.target.value })
                  }
                  placeholder="회의록 제목을 입력하세요"
                  className="text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  참석 인원
                </label>
                <input
                  type="number"
                  value={
                    newMinute.participants === 0 ? "" : newMinute.participants
                  }
                  onChange={(e) =>
                    setNewMinute({
                      ...newMinute,
                      participants:
                        e.target.value === "" ? 0 : Number(e.target.value),
                    })
                  }
                  placeholder="참석 인원 수를 입력하세요 (숫자만 입력)"
                  className="text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  회의록 내용
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  해당 회의록은 회의 내용을 간추려 5줄 이내로 적어주시기
                  바랍니다. 만약 관련 지식이나 내용이 있다면 블로그를
                  활용해주세요.
                </p>
                <textarea
                  value={newMinute.content}
                  onChange={(e) =>
                    setNewMinute({ ...newMinute, content: e.target.value })
                  }
                  placeholder="회의 내용을 간략하게 입력하세요 (5줄 이내)"
                  rows={5}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent resize-none"
                />
              </div>

              {/* 다중 링크 입력 섹션 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    관련 링크 (선택)
                  </label>
                  <DefaultButton
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addLink}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    링크 추가
                  </DefaultButton>
                </div>

                <div className="space-y-3">
                  {newMinute.links.map((link, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) =>
                            updateLink(index, "title", e.target.value)
                          }
                          placeholder="링크 제목"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent text-sm"
                        />
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) =>
                            updateLink(index, "url", e.target.value)
                          }
                          placeholder="https://example.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent text-sm"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="mt-1 p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {newMinute.links.length === 0 && (
                    <p className="text-sm text-gray-500 italic">
                      회의록 링크를 추가해주세요.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <DefaultButton
                  variant="outline"
                  onClick={() => {
                    closeModal();
                    setEditingMinute(null);
                    setNewMinute({
                      title: "",
                      content: "",
                      participants: 0,
                      links: [],
                    });
                  }}
                  className="flex-1"
                >
                  취소
                </DefaultButton>
                <DefaultButton
                  onClick={editingMinute ? handleUpdateMinute : handleAddMinute}
                  disabled={
                    !newMinute.title.trim() ||
                    !newMinute.participants ||
                    !newMinute.content.trim()
                  }
                  className="flex-1"
                >
                  {editingMinute ? "수정하기" : "추가하기"}
                </DefaultButton>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteMinuteId !== null}
        title="회의록 삭제"
        message="정말로 이 회의록을 삭제하시겠습니까?"
        onConfirm={handleDeleteMinute}
        onCancel={handleDeleteCancel}
        confirmText="삭제"
        cancelText="취소"
      />
    </div>
  );
}
