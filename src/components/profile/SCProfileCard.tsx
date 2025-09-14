"server-only";

import DefaultBadge from "@/components/ui/defaultBadge";
import ScheduleSVG from "/public/icons/schedule.svg";
import CCEditProfileCard from "@/components/profile/CCEditProfileCard";
import Image from "next/image";
import { getRoleBadgeStyle } from "@/utils/membersUtils";
import { getProfile } from "@/app/api/profile/SCprofileApi";
import {
  translateMemberRole,
  translateGradeToKorean,
  fromOffsetDateTime,
} from "@/utils/transfromResponseValue";

export default async function SCProfileCard() {
  const profile = await getProfile();

  const role = translateMemberRole(profile.memberRole);
  const grade = translateGradeToKorean(profile.memberGrade);
  const createdAt = fromOffsetDateTime(profile.createdAt);
  return (
    <div className="lg:col-span-1">
      <div className="rounded-lg border shadow-sm border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg group dark-default dark:border-gray-700">
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 mx-auto group-hover:border-red-300 transition-colors">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-auto border group-hover:border-red-300 border-gray-200 text-lg font-medium text-gray-600">
                {profile.profileImage ? (
                  <Image
                    src={profile.profileImage}
                    alt={`${profile.name} 프로필`}
                    width={80}
                    height={80}
                    priority={false}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div>{profile.name}</div>
                )}
              </div>
            </div>
          </div>
          <div className="text-xl font-semibold leading-none tracking-tight dark:text-gray-200">
            {profile.name}
          </div>
          <div className="flex justify-center mt-1">
            <DefaultBadge variant="custom" className={getRoleBadgeStyle(role)}>
              {role}
            </DefaultBadge>
          </div>
          <div className="text-sm text-gray-500  dark:text-gray-300">
            <p>
              {grade} • {profile.major}
            </p>
          </div>
        </div>

        <div className="space-y-4 p-6 pt-0">
          <p className="text-sm text-gray-600  text-center transition-colors duration-300  dark:text-gray-300">
            {profile.description}
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <ScheduleSVG className="w-4 h-4 stroke-cert-dark-red" />
              <span className="text-gray-600 transition-colors duration-300  dark:text-gray-400">
                {createdAt} 가입
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
              기술 스택
            </h4>
            <div className="flex flex-wrap gap-1">
              {profile.skills?.map((skill: string) => (
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

          <CCEditProfileCard />
        </div>
      </div>
    </div>
  );
}
