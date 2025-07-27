"server-only";

import Link from "next/link";
import TypingAnimation from "@/components/typingAnimation";
import DefaultCard from "@/components/defaultCard";
import LogoSVG from "/public/icons/logo-white.svg";
import ShieldSVG from "/public/icons/shield.svg";
import LockSVG from "/public/icons/lock.svg";
import EyeSVG from "/public/icons/eye.svg";
import PeopleSVG from "/public/icons/people.svg";
import ScheduleSVG from "/public/icons/schedule.svg";
import StudySVG from "/public/icons/study.svg";
import BlogSVG from "/public/icons/blog.svg";
import BugSVG from "/public/icons/bug.svg";
import ThunderSVG from "/public/icons/thunder.svg";
import GlobeRedSVG from "/public/icons/globe-red.svg";
import ServerSVG from "/public/icons/server.svg";
import SectionBadge from "@/components/sectionBadge";
import MiniCalendar from "@/components/miniCalendar";
import DefaultButton from "@/components/ui/defaultButton";

// 캘린더 동적 이벤트 생성 -> 이 부분은 추후 /schedule 과 연동하여 제거될 변수입니다
const generateUpcomingEvents = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  return [
    {
      date: 5,
      title: "보안 세미나",
      description: "최신 사이버보안 트렌드",
      color: "red",
    },
    {
      date: 12,
      title: "CTF 대회",
      description: "교내 해킹 경진대회",
      color: "red",
    },
  ].filter(
    (event) =>
      event.date >= today.getDate() || currentMonth !== today.getMonth()
  );
};
const upcomingEvents = generateUpcomingEvents();

const Home = () => {
  return (
    <>
      <div className="mx-auto px-4">
        {/* 1p */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
          <>
            <div className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in">
              <span className="text-gray-900 drop-shadow-lg">CERT-IS</span>
            </div>
            <TypingAnimation />
          </>
          <>
            <div className="absolute top-32 left-10 animate-bounce opacity-20">
              <LockSVG className="w-6 h-6 stroke-cert-dark-red" />
            </div>
            <div className="absolute bottom-20 right-10 animate-bounce opacity-20">
              <ShieldSVG className="w-9 h-9 stroke-cert-dark-red" />
            </div>
            <div className="absolute top-1/3 right-20 animate-bounce opacity-20">
              <EyeSVG className="w-8 h-8 text-cert-dark-red" />
            </div>
            <div className="absolute bottom-1/3 left-20 animate-bounce opacity-15 text-cert-dark-red">
              <BugSVG className="w-8 h-8" />
            </div>
          </>
        </section>

        {/* 2p */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-[13%] text-center">
          <div className="flex flex-col items-center mb-24">
            <SectionBadge text={"About CERT-IS"} />
            <div className="text-3xl md:text-5xl font-bold mb-8">
              사이버 보안의 최전선
            </div>
            <div className="text-xl text-gray-500 max-w-4xl mx-auto">
              CERT-IS는 급변하는 사이버 위협 환경에서 우리나라의 정보보안을
              책임질 전문가를 양성하는 대학교 동아리입니다. 실무 중심의 교육과
              최신 보안 기술 연구를 통해 미래의 사이버보안 리더를 키워나갑니다.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <DefaultCard
              title={"Penetration Testing"}
              text={
                "실제 시스템 취약점 분석과 모의해킹을 통한 보안 강화 기법을 학습합니다"
              }
              svgComponent={
                <ShieldSVG className="w-16 h-16 stroke-cert-dark-red" />
              }
            />
            <DefaultCard
              title={"Cryptography"}
              text={
                "암호학 이론과 실습을 통한 데이터 보호 기술 및 암호화 시스템을 구축합니다"
              }
              svgComponent={
                <LockSVG className="w-16 h-16 stroke-cert-dark-red" />
              }
            />
            <DefaultCard
              title={"Digital Forensics"}
              text={
                "디지털 증거 수집과 분석을 통한 사이버 범죄 수사 기법을 연구합니다"
              }
              svgComponent={<EyeSVG className="w-16 h-16 text-cert-dark-red" />}
            />
            <DefaultCard
              title={"Incident Response"}
              text={
                "보안 사고 대응과 복구를 위한 체계적인 프로세스와 절차를 학습합니다"
              }
              svgComponent={<StudySVG className="w-16 h-16" />}
            />
          </div>
        </section>

        {/* 3p */}
        <section className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-[13%] text-center">
          <div className="flex flex-col items-center mb-24">
            <SectionBadge text={"Schedule"} />
            <div className="text-4xl font-bold mb-8">이번 달 주요 일정</div>
            <div className="text-lg text-gray-500 max-w-4xl mx-auto">
              동아리 활동과 교육 스케줄을 확인하세요
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-18 items-center justify-center">
            <div className="max-w-sm mx-auto lg:mx-0">
              <MiniCalendar />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6 w-[28rem] text-center pb-6">
                <div className="flex flex-row">
                  <div className="mb-6">
                    <ScheduleSVG width={24} className="stroke-cert-dark-red" />
                  </div>
                  <div className="text-xl ml-3 font-bold tracking-tight text-gray-900">
                    다가오는 일정
                  </div>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-start p-3 bg-gray-50 rounded-lg border-l-4 border-cert-dark-red"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold bg-cert-dark-red">
                          {event.date}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-medium text-left">
                          {event.title}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-3 border-t border-gray-200">
                  <Link href={"/schedule"}>
                    <DefaultButton
                      size="lg"
                      className="text-md w-full bg-white rounded-md py-2.5 border  border-cert-dark-red/20  text-cert-dark-red hover:bg-cert-dark-red/10 cursor-pointer duration-300"
                    >
                      전체 일정 보기
                    </DefaultButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5p */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-[13%] text-center">
          <div className="flex flex-col items-center mb-24">
            <SectionBadge text={"Platform"} />
            <div className="text-4xl font-bold mb-8">동아리 플랫폼</div>
            <div className="text-lg text-gray-500 max-w-4xl mx-auto">
              체계적인 학습 관리와 효율적인 협업을 위한 통합 플랫폼을 제공합니다
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <DefaultCard
              title={"People"}
              text={"보안 전문가들과의 네트워킹"}
              svgComponent={<PeopleSVG />}
            />
            <DefaultCard
              title={"Schedule"}
              text={"체계적인 교육 일정 관리"}
              svgComponent={
                <ScheduleSVG className="w-12 h-12 stroke-cert-dark-red" />
              }
            />
            <DefaultCard
              title={"Study"}
              text={"최신 보안 기술 연구 자료"}
              svgComponent={<StudySVG className="w-12 h-12" />}
            />
            <DefaultCard
              title={"Blog"}
              text={"보안 지식 공유와 소통"}
              svgComponent={<BlogSVG />}
            />
          </div>
        </section>

        {/* 6p */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-[20%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex flex-col items-start mb-2">
                <SectionBadge text={"Our Mission"} />
              </div>
              <div className="text-4xl font-bold mb-8">
                <span>사이버보안 전문가 양성을 통한</span>
                <br />
                <span className="text-cert-dark-red">디지털 세상 보호</span>
              </div>
              <div className="text-lg text-gray-500 max-w-4xl mx-auto">
                급변하는 사이버 위협 환경에서 우리나라의 정보보안을 책임질
                전문가를 양성하고, 실무 중심의 교육을 통해 즉시 현장에 투입
                가능한 인재를 기르는 것이 우리의 목표입니다.
              </div>
              <div className="flex flex-col text-gray-500 mt-10">
                <div className="flex flex-row items-center">
                  <ThunderSVG className="text-cert-dark-red w-6 h-6" />
                  <span className="my-2 mx-3">
                    실시간 위협 분석 및 대응 훈련
                  </span>
                </div>
                <div className="flex flex-row items-center">
                  <GlobeRedSVG />
                  <span className="my-2 mx-3">
                    국내 보안 컨퍼런스 참가 및 발표
                  </span>
                </div>
                <div className="flex flex-row items-center">
                  <ServerSVG />
                  <span className="my-2 mx-3">
                    기업 연계 실무 프로젝트 수행
                  </span>
                </div>
                <div className="flex flex-row items-center">
                  <ShieldSVG className="w-6 h-6 stroke-cert-dark-red" />
                  <span className="my-2 mx-3">
                    보안 자격증 취득 지원 프로그램
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6 text-center pb-6 items-center">
                <div className="mb-6">
                  <LogoSVG className="w-20 h-20" />
                </div>
                <div className="text-3xl font-bold tracking-tight text-gray-900">
                  Join CERT-IS
                </div>
                <div className="p-1">
                  <div className="mb-8 text-gray-500 leading-relaxed">
                    사이버보안의 미래를 함께 만들어갈 동료를 찾습니다. <br />
                    열정과 도전정신이 있다면 언제든 환영합니다!
                  </div>
                </div>
                <div className="space-y-4 mb-8 w-full">
                  <div className="flex items-center justify-between text-sm border-b border-gray-200 pb-2">
                    <span className="text-gray-500">모집 분야</span>
                    <span className="text-gray-900">모든 전공 환영</span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b border-gray-200 pb-2">
                    <span className="text-gray-500">활동 시간</span>
                    <span className="text-gray-900">월 1회 정기 모임</span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b border-gray-200 pb-2">
                    <span className="text-gray-500">지원 자격</span>
                    <span className="text-gray-900">
                      보안에 대한 열정 (학년 무관)
                    </span>
                  </div>
                </div>
                <button className="w-full rounded-md py-2.5 action-button text-white cursor-pointer duration-300">
                  지원하기
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
