"use client";

import DefaultButton from "@/components/ui/defaultButton";
import { mockProfileData } from "@/mocks/mockProfileData";
import { RefObject, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ModalProps {
  closeModal: () => void;
  modalRef?: RefObject<HTMLDivElement | null>;
}

export default function CCProfileModal({ closeModal, modalRef }: ModalProps) {
  const user = mockProfileData[0];
  const [editedUser, setEditedUser] = useState(user);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-cert-black/50  flex justify-center items-center z-20"
    >
      <div className="rounded-lg border bg-white border-gray-200 shadow-sm w-96 relative animate-pop-in">
        <div className="flex flex-col space-y-1.5 p-6 text-center pb-6">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-md hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center"
            >
              <X />
            </button>
            <p className="text-gray-900">프로필 수정</p>
            <p className="text-gray-500 text-sm">
              People 카드에서 이렇게 보입니다.
            </p>
          </div>
          <div className="space-y-4 text-left my-6">
            <div>
              <p className="text-sm mb-1.5">이름</p>
              <input
                defaultValue={user?.name ?? ""}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    name: e.target.value,
                  })
                }
                className="required text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900"
              />
            </div>
            <div>
              <p className="text-sm mb-1.5">소개</p>
              <textarea
                value={editedUser.bio}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    bio: e.target.value,
                  })
                }
                className="flex text-sm h-20 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900"
              />
            </div>
            <div>
              <p className="text-sm mb-1.5">기술스택</p>
              <input
                defaultValue={user?.skills ?? ""}
                className="required text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 z-10"></div>

            {/* 미리보기 */}
            <div className="mt-4 p-4 flex flex-col border rounded-lg bg-gray-50 border-gray-200  transition-colors duration-300">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">
                미리보기
              </h4>
              <div className="p-6 rounded-lg border text-card-foreground shadow-sm scale-90  bg-white border-gray-200">
                <div className="relative flex shrink-0 overflow-hidden rounded-full w-12 h-12 mx-auto mb-2 border border-gray-200">
                  <div className="aspect-square h-full w-full">
                    <div className="flex h-full w-full items-center justify-center rounded-full">
                      {user.profileImage ? (
                        <Image
                          src={user.profileImage}
                          alt={`${user.name} 프로필`}
                          width={80}
                          height={80}
                          priority={false}
                          className="relative rounded-full object-cover"
                        />
                      ) : (
                        <div>{user.name}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center pb-2 text-black">
                  {editedUser.name}
                </div>
                <div className="text-xs text-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  {editedUser.bio}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <DefaultButton
              variant="outline"
              onClick={closeModal}
              className="border-gray-300 text-gray-600 hover:border-red-400 hover:bg-cert-red/0 hover:text-red-600"
            >
              취소
            </DefaultButton>
            <DefaultButton
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={closeModal}
            >
              저장
            </DefaultButton>
          </div>
        </div>
      </div>
    </div>
  );
}
