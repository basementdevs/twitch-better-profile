import Header from "@Components/app/header";
import ProfileCard from "@Components/settings/profile-card";
import SettingsForm from "@Components/settings/settings-form";
import { Button } from "@Shad/components/ui/button";

import { Storage } from "@plasmohq/storage";
import { useStorage } from "@plasmohq/storage/dist/hook";
import AboutCard from "~resources/components/about/about";
import ChatAppearance from "~resources/components/settings/chat-appearance";
import Tabs from "~resources/shad/components/ui/tabs";

import type { TwitchUser } from "~types/types";
import { t } from "~utils/i18nUtils";

type ProfileProps = {
  user: TwitchUser;
};

export default function Profile({ user }: ProfileProps) {
  const storage = new Storage();
  const [currentPronouns] = useStorage("pronouns");
  const [currentOccupation] = useStorage("occupation");
  const [color] = useStorage("color");

  const tabData = [
    {
      name: t("profileSettings"),
      value: "settings",
      content: (
        <>
          <SettingsForm
            user={user}
            pronouns={currentPronouns}
            occupation={currentOccupation}
          />
          <ChatAppearance
            user={user}
            pronouns={currentPronouns}
            color={color}
          />
        </>
      ),
    },
    {
      name: t("aboutTitle"),
      value: "about",
      content: <AboutCard />,
    },
  ];

  return (
    <div className="max-w-96">
      <Header />
      <ProfileCard
        user={user}
        pronouns={currentPronouns}
        occupation={currentOccupation}
      />
      <Tabs tabData={tabData} />
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
