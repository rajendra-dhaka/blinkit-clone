import { useEffect, useState } from "react";
import { FOOTER_DATA } from "../../data";
import {
  FaAppStoreIos,
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";

interface footerDataType {
  config: {
    usefulLinks: { title: string }[];
    categoriesList: Record<string, string>;
  };
}

export const Footer = () => {
  const [footerData, setFooterData] = useState<footerDataType | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(FOOTER_DATA);
        }, 2000);
      });
      setFooterData(response as footerDataType);
    };
    fetchFooterData();
  }, []);

  return (
    <div className="mt-5">
      {/* USEFUL LINKS & CATEGORIES */}
      <div className="grid grid-cols-12 mb-10">
        <div className="col-span-4">
          <h3 className="mb-6 text-lg font-semibold text-black">
            Useful Links
          </h3>
          <div className="grid grid-cols-3">
            {footerData?.config?.usefulLinks?.map(
              (link: { title: string }, linkIndex: number) => (
                <p key={linkIndex} className="text-sm text-[#666666]">
                  {link?.title}
                </p>
              )
            )}
          </div>
        </div>

        <div className="col-span-8 ">
          <h3 className="mb-6 text-lg font-semibold text-black">Categories</h3>
          <div className="grid grid-cols-3">
            {Object.keys(footerData?.config?.categoriesList || {})?.map(
              (title: string, categoryIndex: number) => (
                <p key={categoryIndex} className="text-sm text-[#666666]">
                  {title}
                </p>
              )
            )}
          </div>
        </div>
      </div>
      {/* SOCIAL MEDIA */}
      <div className="grid grid-cols-12 py-4 mb-3">
        <div className="col-span-4">
          <p>© Blink Commerce Private Limited, 2016-2024</p>
        </div>
        <div className="col-span-8 grid grid-cols-7">
          <p className="text-sm font-semibold text-[#666666]">Download App</p>
          <FaAppStoreIos />
          <IoLogoGooglePlaystore />
          <FaFacebook />
          <FaTwitter />
          <FaInstagramSquare />
          <FaLinkedin />
        </div>
      </div>
      {/* DISCLAIMER */}
      <div>
        <p className="text-sm text-[#666666]">
          “Blinkit” is owned & managed by "Blink Commerce Private Limited" and
          is not related, linked or interconnected in whatsoever manner or
          nature, to “GROFFR.COM” which is a real estate services business
          operated by “Redstone Consultancy Services Private Limited”.
        </p>
      </div>
    </div>
  );
};
