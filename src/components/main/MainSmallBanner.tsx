import Image from "next/image";
import Link from "next/link";

interface MainSmallBannerProps {
  linkHref: string;
  title: string;
  bannerCaption: string;
  backgroundColor: string;
  iconImageSrc: string;
  iconImageAlt: string;
  iconWidth: number;
  iconHeight: number;
  imagePosition: string;
  bannerImageSrc: string;
  bannerImageAlt: string;
  bannerWidth: number;
  bannerHeight: number;
}

const MainSmallBanner = ({
  linkHref,
  title,
  bannerCaption,
  backgroundColor,
  iconImageSrc,
  iconImageAlt,
  iconWidth,
  iconHeight,
  imagePosition,
  bannerImageSrc,
  bannerImageAlt,
  bannerWidth,
  bannerHeight,
}: MainSmallBannerProps) => {
  return (
    <Link href={linkHref}>
      <div
        className={`relative w-90 h-[205px] p-[30px] ${backgroundColor} rounded-md`}
      >
        <h3 className="flex flex-col h3-b text-primary-1">
          <p className="flex items-center gap-1 mb-[9px] caption-r text-gray-50">
            {bannerCaption}
            <Image
              src={iconImageSrc}
              alt={iconImageAlt}
              width={iconWidth}
              height={iconHeight}
            />
          </p>
          {title}
        </h3>
        <div className={`absolute ${imagePosition}`}>
          <Image
            src={bannerImageSrc}
            alt={bannerImageAlt}
            width={bannerWidth}
            height={bannerHeight}
          />
        </div>
      </div>
    </Link>
  );
};

export default MainSmallBanner;
