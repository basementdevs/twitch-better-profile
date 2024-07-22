import Header from "@Components/app/header";
import ProfileCard from "@Components/settings/profile-card";
import type {TwitchUser} from "~types/types";
import SettingsForm from "@Components/settings/settings-form";

type ProfileProps  = {
    user: TwitchUser
}

export default function Profile({user}: ProfileProps) {

    return (
        <div>
            <Header/>
            <div>
                <ProfileCard user={user}/>
            </div>
            <div className="py-30 px-3">
                <SettingsForm user={user}/>
            </div>
        </div>
    );
}