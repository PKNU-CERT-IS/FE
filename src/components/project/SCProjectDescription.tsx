"server-only";
import TerminalSVG from "/public/icons/terminal.svg";

export default function SCProjectDescription() {
  return (
    <div className="mb-4">
      <div className="flex items-center mb-4">
        <TerminalSVG className="w-8 h-8 mr-4 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-900">Project</h1>
      </div>
      <p className="text-gray-600 text-lg">
        다양한 보안 프로젝트와 연구 결과를 공유하는 공간입니다.
      </p>
    </div>
  );
}
