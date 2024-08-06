import { ModeToggle } from "@Components/app/mode-toggle";
import { H4 } from "@Shad/components/ui/typography/h4";
import { User as UserIcon } from "lucide-react";

import { t } from "~utils/i18nUtils";

export default function Header() {
	return (
		<div className="flex my-2 flex-row justify-between px-3 items-center">
			<div className="flex gap-2 dark:text-twitch-11">
				<UserIcon />
				<H4>{t("headerTitle")}</H4>
			</div>
			<ModeToggle />
		</div>
	);
}
