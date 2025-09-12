"server-only";
import DefaultBadge from "@/components/ui/defaultBadge";
import { MembersDataType } from "@/types/members";
import { getRoleBadgeStyle, getRoleBorderStyle } from "@/utils/membersUtils";
import Image from "next/image";
import GithubSVG from "/public/icons/github.svg";
import EmailSVG from "/public/icons/email.svg";

interface MembersCardProps {
  members: MembersDataType;
}

export default function MembersCard({ members }: MembersCardProps) {
  return (
    <div
      className={`card-list p-6 group transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-300/50 shadow-sm cursor-default dark:bg-gray-800 dark:border-gray-700 ${getRoleBorderStyle(
        members.role
      )} flex flex-col h-full`}
    >
      <div className="flex-1">
        <div className="text-center mb-4">
          <div
            className={`relative mb-4 w-20 h-20 mx-auto rounded-full border-2 border-gray-200 flex items-center justify-center text-lg font-medium text-gray-600 transition-colors duration-300  dark:border-gray-600 ${getRoleBorderStyle(
              members.role
            )}`}
          >
            {members.profileImage ? (
              <Image
                src={members.profileImage}
                alt={`${members.name} 프로필`}
                width={80}
                height={80}
                priority={false}
                className="rounded-full object-cover dark:text-gray-200"
              />
            ) : (
              <div>{members.name}</div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-gray-200">
            {members.name}
          </h3>

          <DefaultBadge
            variant="custom"
            className={getRoleBadgeStyle(members.role)}
          >
            {members.role}
          </DefaultBadge>

          <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
            <p>
              {members.grade} • {members.major}
            </p>
          </div>
        </div>

        <p className="text-center text-gray-600 mb-4 text-sm leading-relaxed dark:text-gray-300">
          {members.description}
        </p>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            기술 스택
          </h4>
          <div className="flex flex-wrap gap-1">
            {members.skills?.map((skill) => (
              <DefaultBadge
                key={skill}
                variant="outline"
                className="text-xs bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-400"
              >
                {skill}
              </DefaultBadge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 pt-4 border-t border-gray-100 mt-auto dark:border-gray-700">
        <button
          className={`h-8 w-8 flex items-center justify-center text-gray-400 hover:text-cert-black transition-colors duration-300 cursor-pointer`}
        >
          <EmailSVG className="w-4 h-4" />
        </button>
        {members.githubUrl && (
          <button className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-cert-black  transition-colors duration-300 cursor-pointer">
            <GithubSVG className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
