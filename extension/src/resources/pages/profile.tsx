import Header from "@Components/app/header";
import ProfileCard from "@Components/settings/profile-card";
import SettingsForm from "@Components/settings/settings-form";
import { Button } from "@Shad/components/ui/button";

import { useStorage } from "@plasmohq/storage/dist/hook";
import AboutCard from "@Components/about/about";
import ChatAppearance from "@Components/settings/chat-appearance";
import Tabs from "@Shad/components/ui/tabs";

import type { TwitchUser } from "~types/types";
import {t} from "~utils/i18nUtils";

type ProfileProps = {
  user: TwitchUser;
};

export default function Profile({ user }: ProfileProps) {

  const [currentPronouns] = useStorage("pronouns");
  const [currentOccupation] = useStorage("occupation");
  const [color] = useStorage("color");

  const tabData = [
    {
      name: t("profileSettings"),
      value: "settings",
      content: (
        <div className="flex flex-col w-full gap-3">
          <SettingsForm
            user={user}
            pronouns={currentPronouns}
            occupation={currentOccupation}
          />
          <ChatAppearance
            user={user}
            pronouns={currentPronouns}
            color={color}
            occupation={currentOccupation}
          />
        </div>
      ),
    },
    {
      name: t("aboutTitle"),
      value: "about",
      content: <AboutCard />,
    },
  ];

  return (
    <div className="flex flex-col max-w-96 p-3 gap-3">
      <Header />
      <ProfileCard
        user={user}
        pronouns={currentPronouns}
        occupation={currentOccupation}
      />
      <Tabs tabData={tabData} />
    </div>
  );
}
