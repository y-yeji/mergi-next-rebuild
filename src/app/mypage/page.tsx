import { createClient } from "@/lib/supabase/server";
import MypageView from "./components/MypageView";
import { redirect } from "next/navigation";

const Page = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  console.log("user:", user);
  console.log("user.id:", user.id);
  const { data: profile, error } = await supabase
    .from("user_list")
    .select(
      `
    *,
    user_list_positions (
      id,
      position,
      user_list_stacks (
        stacks
      )
    )
  `,
    )
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: post, error: postError } = await supabase
    .from("post")
    .select(
      `
    *,
    post_positions (
      position
    ),
    post_stacks (
      stack
    )
  `,
    )
    .eq("author", user.id);

  const { data: bookmarks, error: bookmarkError } = await supabase
    .from("post_bookmark")
    .select(
      `
    post:post_id (
      id,
      content,
      end_date,
      recruit_field,
      author,
      post_positions ( position ),
      post_stacks ( stack )
    )
  `,
    )
    .eq("user_id", user.id);

  const favoritePostRaw = bookmarks?.flatMap((b) => b.post) ?? [];

  const authorIds = [...new Set(favoritePostRaw.map((p) => p.author))];
  const { data: authors } = authorIds.length
    ? await supabase
        .from("user_list")
        .select("user_id, name")
        .in("user_id", authorIds)
    : { data: [] };

  const favoritePost = favoritePostRaw.map((p) => ({
    ...p,
    authorName:
      authors?.find((a) => a.user_id === p.author)?.name ?? "알 수 없음",
  }));

  return (
    <MypageView
      profile={profile}
      post={post ?? []}
      favoritePost={favoritePost}
    />
  );
};

export default Page;
