import React from "react";
import EditForm from "@/components/write/CCEditForm";

function getId(id: string) {
  const dataId = parseInt(id, 10);
  return dataId;
}

export default async function AdminStudyProjectEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: "study" | "project" }>;
}) {
  const { id } = await params;
  const { tab } = await searchParams;

  const dataId = getId(id);

  const type: "study" | "project" = tab === "project" ? "project" : "study";

  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 dark:text-gray-200">
            {type === "study" ? "스터디 수정" : "프로젝트 수정"}
          </h1>
          <div className="border-t border-gray-300 mb-5 mt-5 dark:border-gray-600"></div>
          <EditForm type={type} dataId={dataId} />
        </div>
      </div>
    </div>
  );
}
