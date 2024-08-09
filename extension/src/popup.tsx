import "~style.css";

import { ThemeProvider } from "@Components/app/theme-provide";
import { Auth } from "@Pages/auth";
import Profile from "@Pages/profile";

import { useStorage } from "@plasmohq/storage/dist/hook";

function IndexPopup() {
  const [user] = useStorage("user");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-w-[350px]">
        {user ? <Profile user={user} /> : <Auth />}
      </div>
    </ThemeProvider>
  );
}

export default IndexPopup;
