import Header from "@Components/app/header";
import ProfileCard from "@Components/settings/profile-card";
import SettingsForm from "@Components/settings/settings-form";
import { Button } from "@Shad/components/ui/button";

import { Storage } from "@plasmohq/storage";
import { useStorage } from "@plasmohq/storage/dist/hook";

import type { TwitchUser } from "~types/types";
import { t } from "~utils/i18nUtils";

type ProfileProps = {
  user: TwitchUser;
};

export default function Profile({ user }: ProfileProps) {
  const storage = new Storage();
  const [currentPronouns] = useStorage("pronouns");
  const [currentOccupation] = useStorage("occupation");

  return (
    <div className="max-w-96">
      <Header />
      <div>
        <ProfileCard
          user={user}
          pronouns={currentPronouns}
          occupation={currentOccupation}
        />
      </div>
      <div className="py-30 px-3 my-4">
        <SettingsForm
          user={user}
          pronouns={currentPronouns}
          occupation={currentOccupation}
        />
      </div>
      <Button
        className={"w-full"}
        onClick={() => {
          storage.clear();
        }}
      >
        {t("logoutButtonText")}
      </Button>
    </div>
  );
}
