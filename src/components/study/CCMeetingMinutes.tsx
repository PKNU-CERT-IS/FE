"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import {
  CreateProjectMeeting,
  CreateStudyMeeting,
  LinkItem,
  MeetingResponse,
  UpdateMeeting,
} from "@/types/meeting";
import { formatDate } from "@/utils/formatDateUtil";
import {
  createProjectMeeting,
  deleteProjectMeeting,
  getProjectDetailMeeting,
  updateProjectMeeting,
} from "@/app/api/CCProjectMeetingApi";
import {
  createStudyMeeting,
  deleteStudyMeeting,
  getStudyDetailMeeting,
  updateStudyMeeting,
} from "@/app/api/CCStudyMeetingApi";
import AlertModal from "@/components/ui/defaultAlertModal";
import DefaultButton from "@/components/ui/defaultButton";
import ConfirmModal from "@/components/ui/defaultConfirmModal";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Edit,
  Plus,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react";

interface MeetingMinutesProps {
  dataId: number;
  currentUserId: number;
  leaderId: number;
  initialData: MeetingResponse[];
}

export default function MeetingMinutes({
  dataId,
  currentUserId,
  leaderId,
  initialData,
}: MeetingMinutesProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let pageType: "study" | "project";
  if (pathname.startsWith("/admin")) {
    const tab = searchParams.get("tab");
    pageType = tab === "study" ? "study" : "project";
  } else {
    pageType = pathname.startsWith("/study") ? "study" : "project";
  }
  const pageTypeLabel = pageType === "study" ? "스터디" : "프로젝트";

  const [meetingMinutes, setMeetingMinutes] = useState(initialData);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingMinute, setEditingMinute] = useState<MeetingResponse | null>(
    null,
  );
  const [newMinute, setNewMinute] = useState({
    title: "",
    content: "",
    participantNumber: 0,
    links: [] as LinkItem[],
  });
  const [deleteMinuteId, setDeleteMinuteId] = useState<number | null>(null);
  const [isModalMounted, setIsModalMounted] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const isAdmin = pathname.startsWith("/admin");
  const isLeader = currentUserId === leaderId;

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
        closeModal();
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

  useEffect(() => {
    setMeetingMinutes(initialData);
  }, [initialData]);

  const addLink = () => {
    setNewMinute({
      ...newMinute,
      links: [...newMinute.links, { title: "", url: "" }],
    });
  };

  const removeLink = (index: number) => {
    setNewMinute({
      ...newMinute,
      links: newMinute.links.filter((_, i) => i !== index),
    });
  };

  const updateLink = (index: number, field: "title" | "url", value: string) => {
    setNewMinute((prev) => {
      const updatedLinks = prev.links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link,
      );
      return { ...prev, links: updatedLinks };
    });
  };

  const handleAddMinute = async () => {
    if (!newMinute.title.trim() || !newMinute.content.trim()) return;

    const studyBody: CreateStudyMeeting = {
      studyId: dataId,
      title: newMinute.title,
      content: newMinute.content,
      participantNumber: newMinute.participantNumber,
      links: newMinute.links,
    };

    const projectBody: CreateProjectMeeting = {
      projectId: dataId,
      title: newMinute.title,
      content: newMinute.content,
      participantNumber: newMinute.participantNumber,
      links: newMinute.links,
    };

    try {
      if (pageType === "study") {
        await createStudyMeeting(studyBody);
      }
      if (pageType === "project") {
        await createProjectMeeting(projectBody);
      }
      setNewMinute({
        title: "",
        content: "",
        participantNumber: 0,
        links: [],
      });

      router.refresh();
      closeModal();
    } catch (error) {
      throw error;
    }
  };

  const handleEditMinute = async (minute: MeetingResponse) => {
    setEditingMinute(minute);

    try {
      let detailData = minute;
      if (!minute.content || minute.content.trim() === "") {
        detailData =
          pageType === "study"
            ? await getStudyDetailMeeting(minute.id)
            : await getProjectDetailMeeting(minute.id);

        setMeetingMinutes((prev) =>
          prev.map((m) => (m.id === minute.id ? { ...m, ...detailData } : m)),
        );
      }
      setNewMinute({
        title: detailData.title,
        content: detailData.content || "",
        participantNumber: detailData.participantNumber,
        links: detailData.links
          ? [...detailData.links.map((link) => ({ ...link }))]
          : [],
      });
      openModal();
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      setAlertMessage(
        err.response?.data?.message || "회의록 정보를 불러오는데 실패했습니다.",
      );
      setAlertOpen(true);
    }
  };

  const handleUpdateMinute = async () => {
    if (!editingMinute) return;

    const validLinks = newMinute.links.filter(
      (link) => link.title.trim() && link.url.trim(),
    );

    const body: UpdateMeeting = {
      meetingId: editingMinute.id,
      requesterId: currentUserId,
      title: newMinute.title,
      content: newMinute.content,
      participantNumber: newMinute.participantNumber,
      links: validLinks,
    };

    try {
      if (pageType === "study") {
        await updateStudyMeeting(body);
      } else if (pageType === "project") {
        await updateProjectMeeting(body);
      }

      setMeetingMinutes((prev) =>
        prev.map((minute) =>
          minute.id === editingMinute.id
            ? {
                ...minute,
                title: body.title,
                content: body.content,
                participantNumber: body.participantNumber,
                links: validLinks,
              }
            : minute,
        ),
      );

      closeModal();
      setEditingMinute(null);
      setNewMinute({
        title: "",
        content: "",
        participantNumber: 0,
        links: [],
      });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      setAlertMessage(
        err.response?.data?.message || "회의록 수정에 실패했습니다.",
      );
      setAlertOpen(true);
    }
  };

  const handleDeleteMinute = async () => {
    if (!deleteMinuteId) return;

    try {
      if (pageType === "study") {
        await deleteStudyMeeting(deleteMinuteId);
      }
      if (pageType === "project") {
        await deleteProjectMeeting(deleteMinuteId);
      }

      setMeetingMinutes(
        meetingMinutes.filter((minute) => minute.id !== deleteMinuteId),
      );
      setDeleteMinuteId(null);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      setAlertMessage(
        err.response?.data?.message || "회의록 삭제에 실패했습니다.",
      );
      setAlertOpen(true);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteMinuteId(null);
  };

  const toggleExpand = async (meetingId: number, type: "study" | "project") => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(meetingId)) {
        next.delete(meetingId);
      } else {
        next.add(meetingId);
      }
      return next;
    });
    const target = meetingMinutes.find((m) => m.id === meetingId);
    if (target && (!target.content || target.content.trim() === "")) {
      try {
        const detail =
          type === "study"
            ? await getStudyDetailMeeting(meetingId)
            : await getProjectDetailMeeting(meetingId);

        setMeetingMinutes((prev) =>
          prev.map((m) => (m.id === meetingId ? { ...m, ...detail } : m)),
        );
      } catch (error) {
        throw error;
      }
    }
  };
  return (
    <>
      <div className="rounded-lg border border-gray-200 shadow-lg dark-default dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center justify-between sm:block">
                <h2 className="text-xl font-bold text-cert-black dark:text-gray-200">
                  {pageTypeLabel} 회의록
                </h2>
                {/* 모바일 전용 */}
                {(isLeader || isAdmin) && (
                  <div className="sm:hidden">
                    <DefaultButton size="sm" onClick={openModal}>
                      <Plus className="w-4 h-4 mr-2" />
                      회의록 추가
                    </DefaultButton>
                  </div>
                )}
              </div>

              <div className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                <p>
                  • {pageTypeLabel} 회의록을 작성하고 관리합니다.
                  <br /> • {pageTypeLabel} 장만 회의록을 추가할 수 있습니다.
                  <br /> • 회의록은 회차별로 관리되며 주에 1회 이상 결과물을
                  작성해주시기 바랍니다.
                </p>
              </div>
            </div>
            {/* 데스크톱 전용 */}
            {(isLeader || isAdmin) && (
              <div className="hidden sm:block">
                <DefaultButton size="sm" onClick={openModal}>
                  <Plus className="w-4 h-4 mr-2" />
                  회의록 추가
                </DefaultButton>
              </div>
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
              meetingMinutes.map((minute) => {
                const needsDetail = !minute.content;
                const expanded = expandedIds.has(minute.id);
                const textToShow = expanded ? minute.content : "";

                const shouldShowButton = needsDetail || minute.content;
                return (
                  <div
                    key={minute.id}
                    className="bg-gray-50 rounded-lg border border-gray-200 p-3 dark:bg-gray-700 dark:border-gray-600"
                  >
                    {/* 상단: 제목 + 액션 */}
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-gray-900 leading-tight dark:text-gray-200">
                        {minute.title}
                      </p>
                      {(isLeader || isAdmin) && (
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
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {formatDate(minute.createdAt, "short")}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        참석: {minute.participantNumber}명
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        작성자: {minute.creatorName}
                      </span>
                    </div>

                    {/* content: 더보기/접기 대상 영역 */}
                    <div className="mt-2 flex flex-row">
                      <p className="text-sm text-gray-800 leading-relaxed dark:text-gray-300 break-all whitespace-normal">
                        {textToShow}
                        {shouldShowButton && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(minute.id, pageType)}
                            className="ml-1 inline-flex flex-row items-center whitespace-nowrap text-xs text-gray-500 hover:underline cursor-pointer align-baseline"
                          >
                            {expanded ? (
                              <>
                                접기{" "}
                                <ChevronUp className="w-3.5 h-3.5 ml-0.5" />
                              </>
                            ) : (
                              <>
                                세부 내용 더보기{" "}
                                <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                              </>
                            )}
                          </button>
                        )}
                      </p>
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
                            className="inline-flex items-center text-xs text-blue-600 hover:underline dark:text-blue-500"
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
              className={`bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700 ${
                showAddModal ? "opacity-100 scale-100" : "opacity-0 scale-75"
              } transition-transform duration-300 ease-out`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                  {editingMinute ? "회의록 수정" : "회의록 추가"}
                </h3>
                <button
                  onClick={() => {
                    closeModal();
                    setEditingMinute(null);
                    setNewMinute({
                      title: "",
                      content: "",
                      participantNumber: 0,
                      links: [],
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
                    제목 *
                  </label>
                  <input
                    type="text"
                    value={newMinute.title}
                    onChange={(e) =>
                      setNewMinute({ ...newMinute, title: e.target.value })
                    }
                    placeholder="회의록 제목을 입력하세요"
                    className="text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
                    참석 인원 *
                  </label>
                  <input
                    type="number"
                    value={
                      newMinute.participantNumber === 0
                        ? ""
                        : newMinute.participantNumber
                    }
                    onChange={(e) =>
                      setNewMinute({
                        ...newMinute,
                        participantNumber:
                          e.target.value === "" ? 0 : Number(e.target.value),
                      })
                    }
                    placeholder="참석 인원 수를 입력하세요 (숫자만 입력)"
                    className="text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200">
                    회의록 내용 *
                  </label>
                  <p className="text-xs text-gray-500 mb-2 dark:text-gray-400">
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
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent resize-none dark:border-gray-700"
                  />
                </div>

                {/* 다중 링크 입력 섹션 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                      관련 링크 (선택)
                    </label>
                    <DefaultButton
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addLink}
                      className="dark:bg-gray-600"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent text-sm dark:border-gray-700"
                          />
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) =>
                              updateLink(index, "url", e.target.value)
                            }
                            placeholder="https://example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent text-sm dark:border-gray-700"
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
                      <p className="text-sm text-gray-500 italic dark:text-gray-400">
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
                        participantNumber: 0,
                        links: [],
                      });
                    }}
                    className="flex-1"
                  >
                    취소
                  </DefaultButton>
                  <DefaultButton
                    onClick={
                      editingMinute ? handleUpdateMinute : handleAddMinute
                    }
                    disabled={
                      !newMinute.title.trim() || !newMinute.participantNumber
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
      <AlertModal
        isOpen={alertOpen}
        message={alertMessage}
        type="warning"
        duration={2500}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}
