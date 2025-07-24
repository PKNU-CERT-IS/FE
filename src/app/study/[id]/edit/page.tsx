import EditForm from "@/components/write/CCEditForm";
import React from "react";

function getId(id: string) {
  const dataId = parseInt(id, 10);
  return dataId;
}

export default async function StudyEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dataId = getId(id);
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg ">
        <div className="p-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">게시글 수정</h1>
          <div className="border-t border-gray-300 mb-5 mt-5"></div>
          <EditForm type="study" dataId={dataId} />
        </div>
      </div>
    </div>
  );
}
