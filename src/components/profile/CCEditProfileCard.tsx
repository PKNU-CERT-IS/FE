"use client";

import { useModal } from "@/hooks/useModal";
import DefaultButton from "@/components/ui/defaultButton";
import EditSVG from "/public/icons/edit.svg";
import CCProfileEditModal from "@/components/profile/CCProfileEditModal";
import { useEffect } from "react";
import { ProfileDataType } from "@/types/profile";

interface CCEditProfileCardProps {
  profile: ProfileDataType;
}

export default function CCEditProfileCard({ profile }: CCEditProfileCardProps) {
  const { setIsOpenModal, isOpenModal, modalOutsideRef } = useModal();
  // 모달 오픈 시 스크롤 잠금
  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpenModal]);

  return (
    <div>
      <DefaultButton
        onClick={() => setIsOpenModal(true)}
        className="w-full transition-all duration-300"
      >
        <EditSVG className="w-4 h-4 mr-2 stroke-white" />
        프로필 수정
      </DefaultButton>
      {isOpenModal && (
        <CCProfileEditModal
          closeModal={() => setIsOpenModal(false)}
          modalRef={modalOutsideRef}
          initialProfileData={profile}
        />
      )}
    </div>
  );
}
