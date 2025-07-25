"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Users, Edit, Trash2, Calendar } from "lucide-react";
import DefaultButton from "@/components/ui/defaultButton";
import ConfirmModal from "@/components/ui/defaultConfirmModal";

// Mock data for meeting minutes
const mockMeetingMinutes = [
  {
    id: 1,
    week: 1,
    title: "웹 기초 및 HTTP 프로토콜",
    date: "2024.03.06",
    content:
      "HTTP 프로토콜의 기본 구조와 요청/응답 메커니즘에 대해 학습했습니다. Burp Suite를 이용한 HTTP 트래픽 분석 실습을 진행했습니다.",
    attendees: ["김보안", "이해커", "박펜테", "최시큐"],
    author: "김보안",
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
  },
];

interface MeetingMinutesProps {
  studyId: string;
  currentUserId: number;
  studyLeaderId: number;
}

export default function MeetingMinutes({
  studyId, // 스터디 ID DB 접근시 필요
  currentUserId,
  studyLeaderId,
}: MeetingMinutesProps) {
  const [meetingMinutes, setMeetingMinutes] = useState(mockMeetingMinutes);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingMinute, setEditingMinute] = useState(null);
  const [newMinute, setNewMinute] = useState({
    title: "",
    content: "",
  });
  const [deleteMinuteId, setDeleteMinuteId] = useState<number | null>(null);
  const [isModalMounted, setIsModalMounted] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // 스터디 장인지 확인
  const isStudyLeader = currentUserId === studyLeaderId;

  // 모달 열기 함수 (트랜지션을 위해 약간의 지연 추가)
  const openModal = () => {
    setIsModalMounted(true);
    setTimeout(() => setShowAddModal(true), 10); // 트랜지션 트리거
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
      document.body.style.overflow = "unset"; // 모달 닫을 때 스크롤 복원
      document.removeEventListener("keydown", handleEsc); // 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddModal]);

  const handleAddMinute = () => {
    if (!newMinute.title.trim() || !newMinute.content.trim()) return;

    const minute = {
      id: Date.now(), // 실제로는 API에서 ID를 받아옴
      week: meetingMinutes.length + 1,
      title: newMinute.title,
      date: new Date().toLocaleDateString("ko-KR"),
      content: newMinute.content,
      attendees: ["현재 사용자"], // 실제로는 API에서 가져옴
      author: "현재 사용자", // 실제로는 현재 로그인 사용자
    };

    setMeetingMinutes([...meetingMinutes, minute]);
    setNewMinute({
      title: "",
      content: "",
    });
    setShowAddModal(false);
  };

  const handleEditMinute = (minute) => {
    setEditingMinute(minute);
    setNewMinute({
      title: minute.title,
      content: minute.content,
    });
    openModal();
  };

  const handleUpdateMinute = () => {
    if (!editingMinute) return;

    const updated = meetingMinutes.map((minute) =>
      minute.id === editingMinute.id
        ? {
            ...minute,
            title: newMinute.title,
            content: newMinute.content,
          }
        : minute
    );

    setMeetingMinutes(updated);
    setEditingMinute(null);
    setNewMinute({ title: "", content: "" });
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
          <h2 className="text-xl font-bold text-cert-black">스터디 회의록</h2>
          {isStudyLeader && (
            <DefaultButton size="sm" onClick={openModal}>
              <Plus className="w-4 h-4 mr-2" />
              회의록 추가
            </DefaultButton>
          )}
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
                      {minute.week}주차: {minute.title}
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

                <div className="flex items-center justify-between text-sm">
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
                  setNewMinute({ title: "", content: "" });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
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

              <div className="flex gap-3 pt-4">
                <DefaultButton
                  variant="outline"
                  onClick={() => {
                    closeModal();
                    setEditingMinute(null);
                    setNewMinute({ title: "", content: "" });
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
