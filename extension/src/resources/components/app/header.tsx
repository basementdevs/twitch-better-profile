import { ModeToggle } from "@Components/app/mode-toggle";
import { version } from "@Root/package.json";
import { H4 } from "@Shad/components/ui/typography/h4";
import { LogOut, User as UserIcon } from "lucide-react";
import { Button } from "~resources/shad/components/ui/button";

import { Storage } from "@plasmohq/storage";
import { useStorage } from "@plasmohq/storage/dist/hook";
import { t } from "~utils/i18nUtils";
import {env} from "~config/env";

export default function Header() {
  const [isAuthenticated] = useStorage("accessToken");
  const storage = new Storage();
  const onStorageClear = async () => {
    await storage.clear();
  };
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex gap-2  dark:text-twitch-11">
        <UserIcon />
        <H4>{t("headerTitle")}</H4>
        <span className=" font-light tracking-tight text-xs mt-2 text-slate-800  dark:text-slate-100">
          v{version} {env.data.APP_ENVIRONMENT === "production" ? `(${env.data.APP_STAGE})` : `(dev)`}
        </span>
      </div>

      <div className="flex gap-2">
        <ModeToggle />
        {isAuthenticated ? (
          <Button
            onClick={onStorageClear}
            size="icon"
            className="inline-flex items-center dark:scale-100 scale-100 justify-center whitespace-nowrap text-sm font-medium disabled:opacity-50 border border-input  bg-background hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut size={20} />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
