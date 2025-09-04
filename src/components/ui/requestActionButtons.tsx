"server-only";

import { CheckCircle, XCircle } from "lucide-react";

interface RequestActionButtonsProps {
  id: number;
  approveAction: (formData: FormData) => Promise<void>;
  rejectAction: (formData: FormData) => Promise<void>;
}

export default function RequestActionButtons({
  id,
  approveAction,
  rejectAction,
}: RequestActionButtonsProps) {
  return (
    <>
      <form action={approveAction} className="flex-1">
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="w-full flex items-center justify-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded h-7 transition-colors cursor-pointer"
        >
          <CheckCircle className="w-3 h-3 mr-1" />
          승인
        </button>
      </form>
      <form action={rejectAction} className="flex-1">
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="w-full flex items-center justify-center px-3 py-1 border border-red-500 text-cert-red hover:text-red-700 hover:bg-red-50 text-xs rounded h-7 transition-colors cursor-pointer"
        >
          <XCircle className="w-3 h-3 mr-1" />
          거절
        </button>
      </form>
    </>
  );
}
