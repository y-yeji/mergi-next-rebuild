import { createClient } from "@/lib/supabase/client";
import MainSmallBanner from "@/components/main/MainSmallBanner";
import Image from "next/image";
import PostcardSectionList from "@/components/main/PostcardSectionList";
import { getAllPosts } from "@/services/post";

export default async function Home() {
  const supabase = await createClient();

  const posts = (await getAllPosts({})) ?? [];

  const popularPosts = [...posts].sort(
    (a, b) => (b.like_count ?? 0) - (a.like_count ?? 0),
  );

  // 마감일이 가까운 순 (오름차순)
  const closingSoonPosts = [...posts].sort(
    (a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime(),
  );

  // 등록일이 최근인 순 (내림차순)
  const newPosts = [...posts].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <div className="max-w-[1120px] mx-auto mt-30 overflow-hidden">
      <section className="mb-20">
        <div className="mb-5">
          <Image
            src="/images/main_banner.png"
            alt="메인배너"
            width={1120}
            height={400}
          />
        </div>
        <div className="flex flex-wrap gap-5">
          <MainSmallBanner
            linkHref="/study"
            title="스터디 보러가기"
            bannerCaption="모집 중인 스터디를 찾아보세요"
            backgroundColor="bg-secondary-2"
            iconImageSrc="/images/pencil.png"
            iconImageAlt="연필이모티콘"
            iconWidth={13}
            iconHeight={13}
            imagePosition="top-[64px] right-5"
            bannerImageSrc="/images/main_study_banner.png"
            bannerImageAlt="메인스몰스터디배너"
            bannerWidth={145}
            bannerHeight={133}
          />
          <MainSmallBanner
            linkHref="/project"
            title="프로젝트 보러가기"
            bannerCaption="모집 중인 프로젝트를 찾아보세요"
            backgroundColor="bg-secondary-1"
            iconImageSrc="/images/search.png"
            iconImageAlt="돋보기이모티콘"
            iconWidth={12}
            iconHeight={13}
            imagePosition="top-[64px] right-5"
            bannerImageSrc="/images/main_project_banner.png"
            bannerImageAlt="스터디 바로가기 배너"
            bannerWidth={145}
            bannerHeight={133}
          />
          <MainSmallBanner
            linkHref="/service"
            title="서비스 보러가기"
            bannerCaption="홍보 중인 서비스를 찾아보세요"
            backgroundColor="bg-primary-5"
            iconImageSrc="/images/talk.png"
            iconImageAlt="연필이모티콘"
            iconWidth={14}
            iconHeight={13}
            imagePosition="top-[27px] right-[26px]"
            bannerImageSrc="/images/main_service_banner.png"
            bannerImageAlt="서비스 바로가기 배너"
            bannerWidth={145}
            bannerHeight={133}
          />
        </div>
      </section>
      <section className="mb-20">
        <PostcardSectionList
          posts={popularPosts}
          title="Hot 인기있는 프로젝트"
          badgeType="success"
          badgeText="인기있는"
        />
        <PostcardSectionList
          posts={closingSoonPosts}
          title="Now 곧 마감되는 프로젝트"
          badgeType="danger"
          badgeText="마감직전"
        />
        <PostcardSectionList
          posts={newPosts}
          title="New 새로운 프로젝트"
          badgeType="warning"
          badgeText="새로운"
        />
      </section>
    </div>
  );
}
