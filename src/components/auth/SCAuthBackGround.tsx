"server-only";

import { Fingerprint } from "lucide-react";
import EyeSVG from "/public/icons/eye.svg";
import LockSVG from "/public/icons/lock.svg";
import ShieldSVG from "/public/icons/shield.svg";

export default function SCAuthBackGround() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-32 left-10 animate-bounce opacity-20">
        <LockSVG className="w-6  stroke-cert-dark-red dark:stroke-white" />
      </div>
      <div className="absolute bottom-20 right-10 animate-bounce opacity-20">
        <ShieldSVG className="w-9 stroke-cert-dark-red dark:stroke-white" />
      </div>
      <div className="absolute top-1/3 right-20 animate-bounce opacity-20">
        <EyeSVG className="w-8 text-cert-dark-red dark:text-white" />
      </div>
      <div className="absolute bottom-1/3 left-20 animate-bounce opacity-15 text-cert-dark-red">
        <Fingerprint className="w-8 dark:text-white" />
      </div>
    </div>
  );
}
