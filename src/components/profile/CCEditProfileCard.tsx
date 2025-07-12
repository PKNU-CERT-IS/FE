"use client";

import { useModal } from "@/hooks/useModal";
import DefaultButton from "@/components/ui/defaultButton";
import EditSVG from "/public/icons/edit.svg";
import CCProfileModal from "@/components/profile/CCProfileModal";

export default function CCEditProfileCard() {
  const { setIsOpenModal, isOpenModal, modalOutsideRef } = useModal();
  return (
    <div>
      <DefaultButton
        onClick={() => setIsOpenModal(true)}
        className="w-full bg-red-600 hover:bg-red-700 text-white transition-all duration-300"
      >
        <EditSVG className="w-4 h-4 mr-2 stroke-white" />
        프로필 수정
      </DefaultButton>
      {isOpenModal && (
        <CCProfileModal
          closeModal={() => setIsOpenModal(false)}
          modalRef={modalOutsideRef}
        />
      )}
    </div>
  );
}
