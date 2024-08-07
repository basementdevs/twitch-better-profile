import type { TwitchUser } from "~types/types";
import Logo from "data-base64:~assets/icon.png";
import { cn } from "@Shad/lib/utils";

type ChatAppearanceProps = {
  user: TwitchUser;
  pronouns?: string;
  color: string;
};

export default function ChatAppearance({
  user,
  pronouns,
  color,
}: ChatAppearanceProps) {
  return (
    <div className="flex flex-col space-y-2 pt-5">
      <h1 className="text-gray-600 dark:text-gray-300">Aparencia no chat</h1>
      <div className="flex items-center space-x-0.5">
        <img width={16} src={Logo} alt="logo" />
        <span className={cn(`font-bold text-[${color}]`)}>
          {user.display_name}
        </span>
        {pronouns && (
          <span className="font-light text-gray-500 dark:text-gray-400">
            ({pronouns}):
          </span>
        )}
        <span className="font-light dark:text-gray-300">Olá!</span>
      </div>
      <p className="text-gray-400 dark:text-gray-500">
        A cor do seu nome é definida no seu perfil da Twitch
      </p>
    </div>
  );
}
