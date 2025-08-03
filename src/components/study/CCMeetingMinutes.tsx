"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Users, Edit, Trash2, Calendar, X } from "lucide-react";
import DefaultButton from "@/components/ui/defaultButton";
import ConfirmModal from "@/components/ui/defaultConfirmModal";
import { LinkItem, MeetingMinute } from "@/types/study";

// Mock data for meeting minutes
const mockMeetingMinutes: MeetingMinute[] = [
  {
    id: 1,
    week: 1,
    title: "웹 기초 및 HTTP 프로토콜",
    date: "2024.03.06",
    content:
      "HTTP 프로토콜의 기본 구조와 요청/응답 메커니즘에 대해 학습했습니다. Burp Suite를 이용한 HTTP 트래픽 분석 실습을 진행했습니다.",
    attendees: ["김보안", "이해커", "박펜테", "최시큐"],
    author: "김보안",
    links: [
      { title: "HTTP 기본 자료", url: "https://example.com/web-basics" },
      { title: "Burp Suite 가이드", url: "https://example.com/burp-guide" },
    ],
  },
  {
    id: 2,
    week: 2,
    title: "SQL Injection 이론 및 실습",
    date: "2024.03.13",
    content:
      "SQL Injection의 원리와 다양한 공격 기법에 대해 학습했습니다. DVWA를 이용한 실습을 통해 Union-based, Boolean-based, Time-based SQL Injection을 실습했습니다.",
    attendees: ["김보안", "이해커", "박펜테", "최시큐", "정웹해"],
    author: "김보안",
    links: [
      {
        title: "SQL Injection 실습 자료",
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
  const [meetingMinutes, setMeetingMinutes] =
    useState<MeetingMinute[]>(mockMeetingMinutes);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingMinute, setEditingMinute] = useState<MeetingMinute | null>(
    null
  );
  const [newMinute, setNewMinute] = useState({
    title: "",
    content: "",
    links: [] as LinkItem[],
  });
  const [deleteMinuteId, setDeleteMinuteId] = useState<number | null>(null);
  const [isModalMounted, setIsModalMounted] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

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
      week: meetingMinutes.length + 1,
      title: newMinute.title,
      date: new Date().toLocaleDateString("ko-KR"),
      content: newMinute.content,
      links: validLinks,
      attendees: ["현재 사용자"],
      author: "현재 사용자",
    };

    setMeetingMinutes([...meetingMinutes, minute]);
    setNewMinute({
      title: "",
      content: "",
      links: [],
    });
    setShowAddModal(false);
  };

  const handleEditMinute = (minute: MeetingMinute) => {
    setEditingMinute(minute);
    setNewMinute({
      title: minute.title,
      content: minute.content,
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
            links: validLinks,
          }
        : minute
    );

    setMeetingMinutes(updated);
    setEditingMinute(null);
    setNewMinute({ title: "", content: "", links: [] });
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg mt-6">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-cert-black">스터디 회의록</h2>
            <div className="mt-1 space-y-1  rounded-lg">
              <p className="text-sm text-gray-500">
                스터디 회의록을 작성하고 관리합니다.
                <br /> 스터디 장만 회의록을 추가할 수 있습니다.
                <br />
                회의록은 회차별로 관리되며 주에 한 번이상 결과물을 작성해주시기
                바랍니다.
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
            meetingMinutes.map((minute) => (
              <div
                key={minute.id}
                className="bg-gray-50 rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {minute.week}회차: {minute.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-500">{minute.date}</p>
                    </div>
                  </div>
                  {isStudyLeader && (
                    <div className="flex gap-2">
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

                <p className="text-gray-700 mb-3 leading-relaxed">
                  {minute.content}
                </p>

                <div className="flex items-center justify-between text-sm mb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        참석: {minute.attendees.length}명
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-500">작성자: {minute.author}</span>
                </div>

                {/* 다중 링크 표시 */}
                {minute.links && minute.links.length > 0 && (
                  <div className="space-y-1">
                    {minute.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:underline mr-4"
                      >
                        🔗 {link.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))
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
                  setNewMinute({ title: "", content: "", links: [] });
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  내용
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  해당 회의록은 회의내용을 간추려 5줄이내로 적어주시기 바랍니다.
                  만약 관련 지식이나 내용이 있다면 블로그를 활용해주세요.
                </p>
                <textarea
                  value={newMinute.content}
                  onChange={(e) =>
                    setNewMinute({ ...newMinute, content: e.target.value })
                  }
                  placeholder="회의 내용을 간략하게 입력하세요 (5줄 이내)"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent resize-none"
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
                      링크를 추가하려면 &quot;링크 추가&quot; 버튼을 클릭하세요.
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
                    setNewMinute({ title: "", content: "", links: [] });
                  }}
                  className="flex-1"
                >
                  취소
                </DefaultButton>
                <DefaultButton
                  onClick={editingMinute ? handleUpdateMinute : handleAddMinute}
                  disabled={
                    !newMinute.title.trim() || !newMinute.content.trim()
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
