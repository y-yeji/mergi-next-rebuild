import { createClient } from "@/lib/supabase/server";
import MypageView from "./components/MypageView";
import { redirect } from "next/navigation";
import { getUserInfoToUserId } from "@/services/user";
import { getPostsByUser, getBookmarkPostsByUser } from "@/services/post";

const Page = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getUserInfoToUserId(user.id, supabase);
  const postResult = await getPostsByUser(user.id, {}, 1, 100, supabase);
  const bookmarkResult = await getBookmarkPostsByUser({}, 1, 100, supabase);
  console.log("bookmarkResult:", JSON.stringify(bookmarkResult, null, 2));

  return (
    <MypageView
      profile={profile}
      post={postResult?.posts ?? []}
      favoritePost={bookmarkResult?.posts ?? []}
    />
  );
};

export default Page;
