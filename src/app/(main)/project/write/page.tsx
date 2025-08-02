import WriteForm from "@/components/write/CCWriteForm";
export default function ProjectWrtiePage() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg ">
        <div className="p-6 ">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">새 프로젝트</h1>
          <p className="text-gray-600">
            프로젝트를 작성하고 팀원들을 모집해보세요. 프로젝트는 다른
            사용자들과 협업할 수 있는 좋은 기회입니다.
          </p>
          <div className="border-t border-gray-300 mb-5 mt-5"></div>
          <WriteForm type="project" />
        </div>
      </div>
    </div>
  );
}
