import type {TwitchUser} from "~types/types";

type ProfileCardProps = {
    user: TwitchUser,
    pronouns?: string,
}


export default function ProfileCard({user, pronouns}: ProfileCardProps) {


    return (
        <div className="flex gap-4 mx-4 my-4">
            <img src={user.profile_image_url} alt="Profile Image" className="size-28 rounded-3xl"/>
            <div>
                <div className="flex flex-col">
                    <h1 className="text-white font-extrabold text-lg m-0" id="usernameEl">{user.display_name}</h1>
                    <p className="text-gray-400 text-lg m-0 p-0" id="roleEl">Designer</p>
                </div>
                <div className="mt-2">
                    <p className="text-white font-extrabold text-sm">
                        <span> ID: </span>
                        <span className="text-gray-400 ml-2" id="idEl">{user.id}</span>
                    </p>
                    <p className="text-white font-extrabold text-sm">
                        <span> Pronouns: </span>
                        <span className="text-gray-400 ml-2" id="pronounsEl">{pronouns}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}