import {Card, CardContent, CardFooter} from "@Shad/components/ui/card";
import {Label} from "@Shad/components/ui/label";
import {Button} from "@Shad/components/ui/button";
import {type MutableRefObject, useEffect, useRef} from "react";
import type {TwitchUser} from "~types/types";

interface SettingsFormProps {
    user?: TwitchUser
}

export default function SettingsForm({user}: SettingsFormProps) {
    let pronoun: MutableRefObject<HTMLSelectElement> = useRef(null);

    useEffect(() => {

    }, [pronoun]);

    let updatePronouns = async () => {
        console.log('Updating pronouns')

        let response = await fetch('https://twitch-extension.danielheart.dev/settings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pronouns: pronoun.current.value,
                locale: 'en-US',
                user_id: user.id,
                username: user.display_name
            })
        })

        if (response.ok) {
            alert('foi caraio')
        }
    }

    return (
        <Card className="">

            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="pronouns">Select your pronoun</Label>
                            <select
                                ref={pronoun}
                                id="pronouns"
                                onChange={updatePronouns}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300">
                                <option value="He/Him">He/Him</option>
                                <option value="She/Her">She/Her</option>
                                <option value="They/Them">They/Them</option>
                            </select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button>Update</Button>
            </CardFooter>
        </Card>
    )
}