import React from "react";
import { BlogDetailDataType } from "@/types/blog";
import { getBlogReference, searchBlogDetail } from "@/app/api/blog/SCblogApi";
import EditForm from "@/components/write/CCEditForm";

function getId(id: string) {
  const dataId = parseInt(id, 10);
  return dataId;
}

export default async function BlogEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dataId = getId(id);
  const references = await getBlogReference();
  const blogData: BlogDetailDataType = await searchBlogDetail(dataId);
  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 dark:text-gray-200">
            게시글 수정
          </h1>
          <div className="border-t border-gray-300 mb-5 mt-5 dark:border-gray-600"></div>
          <EditForm
            type="blog"
            dataId={dataId}
            initialData={blogData}
            initialReference={references}
          />
        </div>
      </div>
    </div>
  );
}
