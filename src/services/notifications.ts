import { createClient } from "@/lib/supabase/client";
import { NotificationEntity } from "@/types/type";
import { getUserInfo } from "./user";

const supabase = createClient();

/**
 * 로그인된 유저의 알림 목록 조회 (최신순)
 */
export const getNotifications = async (): Promise<
  NotificationEntity[] | null
> => {
  const user = await getUserInfo();
  if (!user?.user_id) return null;

  const { data, error } = await supabase
    .from("notifications")
    .select()
    .eq("user_id", user.user_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return null;
  }

  return data ?? null;
};

/**
 * 새로운 알림 실시간 구독
 * @param userId - 구독할 유저의 user_id
 * @param onNewNotification - 새 알림 수신 시 실행할 콜백
 * @returns Supabase RealtimeChannel (구독 해제 시 .unsubscribe() 호출)
 */
export const subscribeToNotifications = (
  userId: string,
  onNewNotification: (notification: NotificationEntity) => void,
) => {
  return supabase
    .channel("notifications")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "notifications" },
      (payload) => {
        const newNotification = payload.new as NotificationEntity;
        if (newNotification.user_id === userId) {
          onNewNotification(newNotification);
        }
      },
    )
    .subscribe();
};

/**
 * 특정 알림을 checked(확인됨) 상태로 변경
 * @param id - 변경할 알림 id
 * @returns 성공 시 true, 실패 시 false
 */
export const markAsChecked = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({ checked: true })
      .eq("id", id);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * 전체 알림을 seen(읽음) 상태로 변경
 * @param notifications - 상태를 변경할 알림 목록
 */
export const allMarkAsSeen = async (
  notifications: NotificationEntity[],
): Promise<void> => {
  const unseenIds = notifications
    .filter((n) => n.seen === false)
    .map((n) => n.id);

  if (unseenIds.length === 0) return;

  const { error } = await supabase
    .from("notifications")
    .update({ seen: true })
    .in("id", unseenIds);

  if (error) {
    console.error("seen 업데이트 오류:", error);
  }
};

/**
 * 전체 알림을 checked(확인됨) 상태로 변경
 * @param notifications - 상태를 변경할 알림 목록
 */
export const allMarkAsChecked = async (
  notifications: NotificationEntity[],
): Promise<void> => {
  const uncheckedIds = notifications
    .filter((n) => n.checked === false)
    .map((n) => n.id);

  if (uncheckedIds.length === 0) return;

  const { error } = await supabase
    .from("notifications")
    .update({ checked: true })
    .in("id", uncheckedIds);

  if (error) {
    console.error("checked 업데이트 오류:", error);
  }
};
