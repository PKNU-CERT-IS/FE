import Link from "next/link";
import DefaultButton from "@/components/ui/defaultButton";
import { ArrowLeft } from "lucide-react";

interface BackToListButtonProp {
  currentUrl: string;
  isAdmin?: boolean;
  tab?: "study" | "project";
}

export default function BackToListButton({
  currentUrl,
  isAdmin,
  tab,
}: BackToListButtonProp) {
  const href = isAdmin
    ? `/admin/study?tab=${tab ?? "study"}&view=list`
    : `/${currentUrl}`;

  return (
    <Link href={href}>
      <DefaultButton variant="outline" className="shadow-sm">
        <ArrowLeft className="w-4 h-4 mr-2" />
        목록으로 돌아가기
      </DefaultButton>
    </Link>
  );
}
