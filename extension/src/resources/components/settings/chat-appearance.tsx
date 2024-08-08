import type { TwitchUser } from "~types/types";
import Logo from "data-base64:~assets/icon.png";
import { cn } from "@Shad/lib/utils";

import { t } from "~utils/i18nUtils";

type ChatAppearanceProps = {
  user: TwitchUser;
  pronouns?: string;
  color: string;
};

export default function ChatAppearance({
  user,
  pronouns,
  color,
}: ChatAppearanceProps) {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-gray-600 dark:text-gray-300">{t('chatAppearanceTitle')}</h1>
      <div className="flex items-center space-x-0.5">
        <img width={16} src={Logo} alt="logo" />
        <span className={cn(`font-bold text-[${color}]`)}>
          {user.display_name}
        </span>
        {pronouns && (
          <span className="font-light text-gray-500 dark:text-gray-400">
            ({pronouns}):
          </span>
        )}
        <span className="font-light dark:text-gray-300">{t("chatAppearanceGreeting")}</span>
      </div>
      <p className="text-gray-400 dark:text-gray-500">
        {t("chatAppearanceDescription")}
      </p>
    </div>
  );
}
