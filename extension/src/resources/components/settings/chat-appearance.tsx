import Logo from "data-base64:@Root/assets/icon.png";
import { cn } from "@Shad/lib/utils";
import type { TwitchUser } from "~types/types";

import { t } from "~utils/i18nUtils";
import { env } from "../../../config/env";

type ChatAppearanceProps = {
  user: TwitchUser;
  pronouns?: string;
  color: string;
  occupation?: string;
};

export default function ChatAppearance({
  user,
  pronouns,
  color,
  occupation
}: ChatAppearanceProps) {

  let baseUrl = env.data.PLASMO_PUBLIC_API_URL;
  let occupationIcon = occupation ? occupation.toLowerCase() : 'none';

  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-gray-600 dark:text-gray-300">
        {t("chatAppearanceTitle")}
      </h1>
      <div className="flex items-center space-x-0.5">
        <img width={18} src={`${baseUrl}/static/icons/${occupationIcon}.png`} alt="logo" />
        <span className={cn(`font-bold text-[${color}]`)}>
          {user.display_name}
        </span>
        {pronouns && (
          <span className="font-light text-gray-500 dark:text-gray-400">
            ({t(`pronouns${pronouns.replace("/", "")}`)}):
          </span>
        )}
        <span className="font-light dark:text-gray-300">
          {t("chatAppearanceGreeting")}
        </span>
      </div>
      <p className="text-gray-400 dark:text-gray-500">
        {t("chatAppearanceDescription")}
      </p>
    </div>
  );
}
