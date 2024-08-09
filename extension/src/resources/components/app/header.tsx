import { ModeToggle } from "@Components/app/mode-toggle";
import { version } from "@Root/package.json";
import { H4 } from "@Shad/components/ui/typography/h4";
import { LogOut, User as UserIcon } from "lucide-react";
import { Button } from "~resources/shad/components/ui/button";

import { t } from "~utils/i18nUtils";
type HeaderProps = {
  onStorageClear?: () => void;
};
export default function Header({ onStorageClear }: HeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex gap-2  dark:text-twitch-11">
        <UserIcon />
        <H4>{t("headerTitle")}</H4>
        <span className=" font-light tracking-tight text-xs mt-2  text-slate-100">
          v{version}
        </span>
      </div>

      <div className="flex gap-2">
        {onStorageClear ? (
          <Button
            onClick={onStorageClear}
            size="icon"
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut size={20} />
          </Button>
        ) : null}
        <ModeToggle />
      </div>
    </div>
  );
}
