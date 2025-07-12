"server-only";

import DefaultBadge from "@/components/ui/defaultBadge";
import ScheduleSVG from "/public/icons/schedule.svg";
import CCEditProfileCard from "@/components/profile/CCEditProfileCard";
import { mockProfileData } from "@/mocks/mockProfileData";
import Image from "next/image";

export default function SCProfileCard() {
  const user = mockProfileData[0];

  return (
    <div className="lg:col-span-1">
      <div className="rounded-lg border shadow-sm bg-white border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg group">
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 mx-auto group-hover:border-red-300 transition-colors">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-auto border group-hover:border-red-300 border-gray-200 text-lg font-medium text-gray-600">
                {user.profileImage ? (
                  <Image
                    src={user.profileImage}
                    alt={`${user.name} 프로필`}
                    width={80}
                    height={80}
                    priority={false}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div>{user.name}</div>
                )}
              </div>
            </div>
          </div>
          <div className="text-xl font-semibold leading-none tracking-tight">
            {user.name}
          </div>
          <div className="flex justify-center gap-2 mb-2">
            <DefaultBadge className="bg-red-50 text-red-600  border-red-200 ">
              {user.role}
            </DefaultBadge>
            <DefaultBadge
              variant="outline"
              className="border-gray-200  text-gray-600 "
            >
              {user.grade}학년
            </DefaultBadge>
          </div>
          <div className="text-sm text-gray-600  transition-colors duration-300">
            {user.major}
          </div>
        </div>

        <div className="space-y-4 p-6 pt-0">
          <p className="text-sm text-gray-600  text-center transition-colors duration-300">
            {user.bio}
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <ScheduleSVG className="w-4 h-4 stroke-cert-dark-red" />
              <span className="text-gray-600 transition-colors duration-300">
                {user.joinDate} 가입
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900  mb-2 transition-colors duration-300">
              기술 스택
            </h4>
            <div className="flex flex-wrap gap-1">
              {user.skills?.map((skill) => (
                <DefaultBadge
                  key={skill}
                  variant="outline"
                  className="text-xs border-gray-200  text-gray-600  hover:text-gray-900  hover:border-red-300  transition-colors"
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
