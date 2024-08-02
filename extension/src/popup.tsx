import "~style.css"

import { ThemeProvider } from "@Components/app/theme-provide"
import { Auth } from "@Pages/auth"
import Profile from "@Pages/profile"
import { useEffect, useState } from "react"
import { browser } from "webextension-polyfill-ts"

import type { TwitchUser } from "~types/types"

function IndexPopup() {
  let [user, setUser] = useState<TwitchUser | null>(null)

  async function getUser() {
    const res = browser.storage.local.get("user")
    return (await res).user as TwitchUser | null
  }

  useEffect(() => {
    getUser().then(setUser)

    const handleStorageChange = (changes: {
      [key: string]: browser.storage.StorageChange
    }) => {
      if (changes.user) {
        setUser(changes.user.newValue as TwitchUser)
      }
    }

    // Add the storage change listener
    browser.storage.onChanged.addListener(handleStorageChange)

    // Cleanup listener on component unmount
    return () => {
      browser.storage.onChanged.removeListener(handleStorageChange)
    }
  }, [])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-w-[350px]">
        {user ? <Profile user={user} /> : <Auth />}
      </div>
    </ThemeProvider>
  )
}

export default IndexPopup
