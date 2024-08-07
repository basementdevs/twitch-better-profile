import { Github } from "lucide-react";
import packageJson from "../../../../package.json";

export default function AboutCard() {
  const version = packageJson.version;
  const changelogUrl = `https://github.com/basementdevs/twitch-addon-scylladb-rs/releases/tag/${version}`;

  return (
    <div className="flex flex-col space-y-5">
      <div className="space-y-2">
        <h1 className="font-semibold">Sobre nós</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Twitch Better Profile is maintained by BasementDevs team and it's
          totally open source.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Don't forget to star our project!
        </p>
      </div>
      <div className="space-y-1">
        <h1 className="font-semibold">Changelog</h1>
        <a
          href={changelogUrl}
          className="text-sm underline font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300 ease-in-out"
        >
          Version {version}
        </a>
      </div>

      <div className="flex">
        <a href="https://github.com/basementdevs/twitch-addon-scylladb-rs">
          <Github />
        </a>
      </div>
    </div>
  );
}
