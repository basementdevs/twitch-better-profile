import { Label } from "@Shad/components/ui/label";
import { type MutableRefObject, useRef } from "react";

import { Storage } from "@plasmohq/storage";

import type { TwitchUser } from "~types/types";
import { t } from "~utils/i18nUtils";

interface SettingsFormProps {
  user?: TwitchUser;
  pronouns?: string;
  occupation?: string;
}

export default function SettingsForm({
  user,
  pronouns,
  occupation,
}: SettingsFormProps) {
  const pronounsListEl: MutableRefObject<HTMLSelectElement> = useRef(null);
  const occupationListEl: MutableRefObject<HTMLSelectElement> = useRef(null);

  const occupations = [
    "None",
    "Student",
    "Lawyer",
    "Doctor",
    "CivilEngineer",
    "FrontEndEngineer",
    "SreEngineer",
    "BackEndEngineer",
    "FullstackEngineer",
  ];

  const updateSettings = async () => {
    const storage = new Storage();
    const selectedPronoun = pronounsListEl.current.value;
    const selectedOccupation = occupationListEl.current.value;
    const response = await fetch(
      `${process.env.PLASMO_PUBLIC_API_URL}/settings`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pronouns: selectedPronoun,
          locale: navigator.language,
          occupation: selectedOccupation,
          user_id: user.id,
          username: user.display_name,
        }),
      },
    );

    if (response.ok) {
      await storage.set("pronouns", selectedPronoun);
      await storage.set("occupation", selectedOccupation);
    }
  };

  return (
    <form>
      <div className="flex flex-col w-full items-center gap-4">
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="pronouns">{t("pronounsLabel")}</Label>
          <select
            ref={pronounsListEl}
            id="pronouns"
            onChange={updateSettings}
            value={pronouns}
            className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300"
          >
            <option value={"n/d"}>{t("pronounsNone")}</option>
            <option value={"He/Him"}>{t("pronounsHeHim")}</option>
            <option value={"She/Her"}>{t("pronounsSheHer")}</option>
            <option value={"They/Them"}>{t("pronounsTheyThem")}</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="occupation">{t("occupationLabel")}</Label>
          <select
            ref={occupationListEl}
            id="pronouns"
            onChange={updateSettings}
            value={occupation}
            className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300"
          >
            {occupations.map((occupation) => (
              <option key={occupation} value={occupation.toLowerCase()}>
                {t(`occupation${occupation}`)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
