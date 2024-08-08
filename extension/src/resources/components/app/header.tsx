import { ModeToggle } from "@Components/app/mode-toggle";
import { H4 } from "@Shad/components/ui/typography/h4";
import { User as UserIcon } from "lucide-react";
import { version } from "@Root/package.json"

import { t } from "~utils/i18nUtils";

export default function Header() {
  return (
    <div className="flex my-2 flex-row justify-between px-3 items-center">
      <div className="flex gap-2 dark:text-twitch-11 items-center">
        <UserIcon />
        <H4>{t("headerTitle")}</H4>
        <span className=" font-light tracking-tight text-xs mt-1 text-slate-100">v{version}</span>
      </div>
      <ModeToggle />
    </div>
  );
}
