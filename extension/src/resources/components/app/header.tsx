import {User as UserIcon} from "lucide-react";
import {H4} from "@Shad/components/ui/typography/h4";
import {ModeToggle} from "@Components/app/mode-toggle";

export default function Header() {

    return (
        <div className="flex my-2 flex-row justify-between px-3 items-center">
            <div className="flex flex-row">
                <UserIcon/>
                <H4>Twitch Profiler</H4>
            </div>
            <ModeToggle/>
        </div>
    )
}