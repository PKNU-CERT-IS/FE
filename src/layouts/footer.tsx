import LogoSVG from "/public/icons/logo-white.svg";

const Footer = () => {
  return (
    <footer className="w-full text-gray-900 py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <LogoSVG width={30} />
            <div>
              <h3 className="font-bold text-sm dark:text-gray-200">CERT-IS</h3>
              <p className="text-xs text-gray-500">
                부경대학교 사이버 보안 동아리
              </p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs text-gray-500">© 2007. PKNU CERT-IS.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
