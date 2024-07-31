import { Card, CardContent } from "@Shad/components/ui/card"
import { Label } from "@Shad/components/ui/label"
import { useRef, type MutableRefObject } from "react"

import type { TwitchUser } from "~types/types"

interface SettingsFormProps {
  user?: TwitchUser
  pronouns?: string
  setPronoun?: (value: ((prevState: string) => string) | string) => void
  setOccupation?: (value: ((prevState: string) => string) | string) => void
  occupation?: string
}

export default function SettingsForm({
  user,
  pronouns,
  setPronoun,
  setOccupation,
  occupation
}: SettingsFormProps) {
  let pronounsListEl: MutableRefObject<HTMLSelectElement> = useRef(null)
  let occupationListEl: MutableRefObject<HTMLSelectElement> = useRef(null)

  const occupations = [
    "none",
    "Student",
    "Lawyer",
    "Doctor",
    "Civil Engineer",
    "Front-end Engineer",
    "SRE Engineer",
    "Back-end Engineer",
    "Fullstack Engineer"
  ]

  let updateSettings = async () => {
    console.log("Updating pronouns")
    let selectedPronoun = pronounsListEl.current.value
    let selectedOccupation = occupationListEl.current.value
    let response = await fetch(
      "https://twitch-extension.danielheart.dev/settings",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pronouns: selectedPronoun,
          locale: "en-US",
          occupation: selectedOccupation,
          user_id: user.id,
          username: user.display_name
        })
      }
    )

    localStorage.setItem("pronouns", selectedPronoun)
    localStorage.setItem("occupation", selectedOccupation)

    if (response.ok) {
      setPronoun(selectedPronoun)
      setOccupation(selectedOccupation)
    }
  }

  return (
    <Card>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pronouns">Select your pronoun</Label>
              <select
                ref={pronounsListEl}
                id="pronouns"
                onChange={updateSettings}
                value={pronouns}
                className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300">
                <option value="N/D">None</option>
                <option value="He/Him">He/Him</option>
                <option value="She/Her">She/Her</option>
                <option value="They/Them">They/Them</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pronouns">Select your occupation</Label>
              <select
                ref={occupationListEl}
                id="pronouns"
                onChange={updateSettings}
                value={occupation}
                className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300">
                {occupations.map((occupationItem) => (
                  <option key={occupationItem} value={occupationItem}>
                    {occupationItem}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
