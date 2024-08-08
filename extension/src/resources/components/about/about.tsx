import { Github } from "lucide-react";
import packageJson from "../../../../package.json";

import { t } from "~utils/i18nUtils";

export default function AboutCard() {
  const version = packageJson.version;
  const repositoryUrl =
    "https://github.com/basementdevs/twitch-addon-scylladb-rs/";
  const changelogUrl = `${repositoryUrl}/releases/tag/${version}`;

  return (
    <div className="flex flex-col space-y-5">
      <div className="space-y-2">
        <h1 className="font-semibold">{t("aboutTitle")}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("aboutDescription")}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("aboutSubdescription")}
        </p>
      </div>
      <div className="space-y-1">
        <h1 className="font-semibold">{t("aboutChangelog")}</h1>
        <a
          href={changelogUrl}
          className="text-sm underline font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300 ease-in-out"
        >
          {t("aboutVersion")} {version}
        </a>
      </div>

      <div className="flex">
        <a href={repositoryUrl}>
          <Github />
        </a>
      </div>
    </div>
  );
}
