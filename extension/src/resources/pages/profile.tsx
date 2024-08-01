import Header from "@Components/app/header"
import ProfileCard from "@Components/settings/profile-card"
import SettingsForm from "@Components/settings/settings-form"
import { useState } from "react"

import type { TwitchUser } from "~types/types"

type ProfileProps = {
  user: TwitchUser
}

export default function Profile({ user }: ProfileProps) {
  const [currentPronouns, setCurrentPronoun] = useState(
    localStorage.getItem("pronouns")
  )
  const [currentOccupation, setCurrentOccupation] = useState(
    localStorage.getItem("occupation")
  )

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
          setPronoun={setCurrentPronoun}
          occupation={currentOccupation}
          setOccupation={setCurrentOccupation}
        />
      </div>
    </div>
  )
}
