import { Button } from "@Shad/components/ui/button";
import { LucideTwitch } from "lucide-react";

import { sendToBackground } from "@plasmohq/messaging";

import { t } from "~utils/i18nUtils";

export default function AuthenticateButton() {
  const authenticate = async () => {
    console.log("authenticate");
    await sendToBackground({
      name: "oauth",
    });
  };

  return (
    <div className="flex flex-row justify-center w-full">
      <Button onClick={authenticate} style={{ width: 250 }}>
        <LucideTwitch />
        <p style={{ paddingLeft: 10 }}>{t("authenticateButtonText")}</p>
      </Button>
    </div>
  );
}
