import type { TwitchUser } from "~types/types";
import { t } from "~utils/i18nUtils";

type ProfileCardProps = {
  user: TwitchUser;
  pronouns?: string;
  occupation?: string;
};

export default function ProfileCard({
  user,
  pronouns,
  occupation,
}: ProfileCardProps) {
  return (
    <div className="flex items-center rounded-xl bg-muted">
      <img
        src={user.profile_image_url}
        alt="The user's profile"
        className="size-28 rounded-xl p-1"
      />
      <div className="p-2">
        <div className="flex flex-col">
          <h1
            className="font-extrabold text-lg m-0 line-clamp-1"
            id="usernameEl"
          >
            {user.display_name}
          </h1>
          <p
            className="text-gray-600 dark:text-gray-300 text-sm m-0 p-0"
            id="roleEl"
          >
            {occupation ?? t("occupationNone")}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-sm">
            <span className="font-bold">ID:</span>
            <span className="text-gray-600 dark:text-gray-300 ml-2" id="idEl">
              {user.id}
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold">{t("pronounsTitle")}:</span>
            <span
              className="text-gray-600 dark:text-gray-300 ml-2"
              id="pronounsEl"
            >
              {pronouns}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
