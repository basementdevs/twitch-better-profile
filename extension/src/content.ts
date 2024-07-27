let mutation = new MutationObserver((mutations) => {

    if (mutations[0].previousSibling.localName === 'span') {
        return
    }

    console.log(mutations);
    let messageEl = null;
    for (let mutation of mutations) {
        let isChildList = mutation.type === 'childList';

        if (!isChildList) {
            console.log('Not a childList mutation');
            continue;
        }

        const addedNode = mutation.addedNodes[0];
        if (!(addedNode instanceof HTMLElement)) {
            continue;
        }

        const isMessageEl = addedNode.classList.contains('chat-line__message');
        if (!isMessageEl) {
            continue;
        }

        messageEl = addedNode;
        break;
    }

    if (messageEl === null) {
        return;
    }

    let usernameEl = messageEl.querySelector('.chat-line__username');
    if (!usernameEl) {
        return;
    }

    let username = usernameEl.textContent;
    console.log(username);
    let uri = `https://twitch-extension.danielheart.dev/settings/${username}`;

    fetch(uri)
        .then(async response => {

            if (!response.ok) {
                return
            }

            let res = await response.json();
            const child = usernameEl.firstChild;

            const pronouns = res.pronouns;
            const pronounsElement = document.createElement('span');
            pronounsElement.textContent = `(${pronouns})`;
            pronounsElement.style.color = "gray";
            pronounsElement.style.marginLeft = "4px";
            if (child) {
                usernameEl.appendChild(pronounsElement);
            }
        }).catch(err => console.error(err));

    messageEl = null;
});

const chat = document.querySelector('.chat-scrollable-area__message-container');
if (chat) {
    console.log("observer on");
    const mutationConfig = {childList: true, subtree: true, characterData: true};
    mutation.observe(chat, mutationConfig);
}