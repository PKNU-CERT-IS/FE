"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, ShieldX, Home, ArrowLeft, Eye } from "lucide-react";

// ✅ Hook: 글리치 효과
function useGlitchEffect(interval = 3000, duration = 200) {
  const [glitchActive, setGlitchActive] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), duration);
    }, interval);
    return () => clearInterval(id);
  }, [interval, duration]);
  return glitchActive;
}

// ✅ Hook: 터미널 타이핑 효과
function useTypewriter(message: string, speed = 50) {
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < message.length) {
        setText(message.slice(0, i + 1));
        i++;
      } else clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [message, speed]);
  return text;
}

export default function Page403() {
  const [isVisible, setIsVisible] = useState(false);
  const glitchActive = useGlitchEffect();
  const terminalText = useTypewriter("ACCESS DENIED - INSUFFICIENT PRIVILEGES");
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-cert-red rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 border border-cert-red rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-cert-red rounded-full animate-pulse delay-2000"></div>
      </div>

      <div
        className={`max-w-2xl mx-auto text-center transform transition-all duration-1000 ease-out
          ${
            isVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 translate-y-10"
          }`}
      >
        {/* 메인 */}
        <div className="mb-12">
          <div
            className={`relative mb-8 ${glitchActive ? "animate-pulse" : ""}`}
          >
            <ShieldX
              className={`w-32 h-32 mx-auto text-cert-red transition-all duration-300 
                ${glitchActive ? "text-red-400 scale-110" : ""}`}
            />
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            ACCESS <span className="text-cert-red">FORBIDDEN</span>
          </h2>

          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            이 페이지에 접근할 권한이 없습니다.
            <br />
            CERT-IS 보안 동아리 관리자에게만 접근 가능한 제한된 영역입니다.
          </p>
        </div>

        {/* 터미널 메시지 */}
        <div className="bg-black border-2 border-cert-red rounded-lg p-6 mb-8 font-mono text-left shadow-2xl">
          <div className="flex items-center gap-2 text-cert-red mb-4">
            <span className="w-3 h-3 bg-cert-red rounded-full animate-pulse"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-200"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-400"></span>
            <span className="ml-2 text-sm">CERT-IS Security Terminal</span>
          </div>
          <div className="text-green-400 text-sm">
            <div className="mb-2">$ whoami</div>
            <div className="mb-2 text-gray-400">unauthorized_user</div>
            <div className="mb-2">$ access /admin/**</div>
            <div className="text-cert-red">
              {terminalText}
              <span className="animate-pulse">|</span>
            </div>
          </div>
        </div>

        {/* 액션 버튼 (inline) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="cursor-pointer inline-flex items-center gap-3 px-8 py-4 bg-cert-red hover:bg-red-700 
                         text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 
                         shadow-lg hover:shadow-cert-red/25"
            >
              <ArrowLeft className="w-5 h-5" /> 이전 페이지로
            </button>

            <Link
              href="/"
              className="cursor-pointer inline-flex items-center gap-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 
                         text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 
                         border border-gray-600 hover:border-gray-500"
            >
              <Home className="w-5 h-5" /> 홈으로 가기
            </Link>
          </div>
        </div>

        {/* 도움말 */}
        <div className="mt-12 p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-left">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-cert-red" /> 도움말
          </h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              •{" "}
              <span className="text-cert-red font-semibold">관리자 페이지</span>
              는 운영진만 접근 가능합니다
            </li>
            <li>• 접근 권한이 필요한 경우 동아리 운영진에게 문의하세요</li>
          </ul>
        </div>

        {/* 푸터 */}
        <div className="mt-8 text-gray-500 text-sm text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-cert-red" />
            <span>CERT-IS 보안 동아리</span>
          </div>
          <p>Cybersecurity Education & Research Team</p>
        </div>
      </div>
    </div>
  );
}
