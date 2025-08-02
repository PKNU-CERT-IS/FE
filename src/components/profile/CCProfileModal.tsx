"use client";

import DefaultButton from "@/components/ui/defaultButton";
import { mockProfileData } from "@/mocks/mockProfileData";
import { RefObject, useState } from "react";
import Image from "next/image";
import { X, Upload, Trash2 } from "lucide-react";

interface ModalProps {
  closeModal: () => void;
  modalRef?: RefObject<HTMLDivElement | null>;
}

export default function CCProfileModal({ closeModal, modalRef }: ModalProps) {
  const user = mockProfileData[0];
  const [editedUser, setEditedUser] = useState(user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    user.profileImage || null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크
      if (file.size > 1 * 1024 * 1024) {
        alert("파일 크기는 1MB 이하로 업로드해주세요.");
        return;
      }
      // 이미지 파일 타입 체크
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("JPG, PNG 파일만 업로드 가능합니다. (GIF 제외)");
        return;
      }

      setProfileImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setPreviewImage(imageUrl);
        setEditedUser({
          ...editedUser,
          profileImage: imageUrl,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImageFile(null);
    setPreviewImage(null);
    setEditedUser({
      ...editedUser,
      profileImage: "",
    });
  };

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
            {/* 프로필 사진 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                프로필 사진
              </label>
              <div className="flex gap-4">
                <div className="relative flex shrink-0 overflow-hidden rounded-full w-16 h-16 border border-gray-200 ml-2 mb-1">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="프로필 미리보기"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400 text-xs">
                      {editedUser.name?.[0] || "사진"}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="flex items-center h-7 gap-1 px-2 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent">
                      <Upload className="w-3 h-3" />
                      업로드
                    </div>
                  </label>

                  <button
                    type="button"
                    onClick={removeImage}
                    className="flex items-center gap-1 px-2 h-7 text-xs text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <Trash2 className="w-3 h-3" />
                    제거
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG 파일만 업로드 가능합니다. (최대 1MB)
              </p>
            </div>

            <div>
              <p className="text-sm mb-1.5">이름</p>
              <input
                value={editedUser.name}
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
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    skills: e.target.value
                      .split(",")
                      .map((skill) => skill.trim()),
                  })
                }
                className="required text-sm flex h-10 w-full rounded-md border px-3 py-2 bg-white border-gray-300 text-gray-900"
                placeholder="React, Node.js, Python (쉼표로 구분)"
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
                      {previewImage ? (
                        <Image
                          src={previewImage}
                          alt={`${editedUser.name} 프로필`}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="bg-gray-100 text-gray-500 text-xs w-full h-full flex items-center justify-center rounded-full">
                          {editedUser.name?.[0] || "사진"}
                        </div>
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
