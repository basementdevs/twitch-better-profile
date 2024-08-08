
<p align="center">
<img src="https://i.imgur.com/HSVbNfT.png" alt="Twitch Better Profile Logo" width="150"/>
<h1 align="center">Twitch Better Profile</h1>
</p>
<p align="center">
  <i>A browser extension that offers a new way to interact with users on Twitch. This app is designed to provide more detailed information about you on Twitch, making it easier for both viewers and streamers to connect with newcomers.</i>
  <br/><br/>
  <b><a href="https://addons.mozilla.org/pt-BR/firefox/addon/twitch-better-profile/">Firefox</a></b> | <b><a href="https://chromewebstore.google.com/detail/twitch-better-profile/iddhipciblhpinegnkagcnddikhnkbag?authuser=0&hl=pt-PT">Chrome</a></b>
  <br/><br/>
  <img src=".github/images/app-base.png" alt="App Preview" width="100%"/>
</p>

  ## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
  - [Backend Installation](#backendapi-installation)
  - [Frontend Installation](#frontendextension-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Twitch Better Profile is a tool built with **Rust** using **Actix** and **ScyllaDB** using the Charybdis driver) for the back-end, and **React** with **Plasmo** for the frontend. The project is organized into two main folders:
- `extension` for the frontend
- `api` for the backend.

## Prerequisites

Ensure you have the following tools installed on your machine:

### Backend/API Installation
- **Rust and Cargo**: [Install Rust](https://www.rust-lang.org/tools/install)
- **ScyllaDB**: [Run ScyllaDB with Docker](https://github.com/gvieira18/ws-scylla/)

### Frontend/Extension Installation
- **pnpm**: [Install pnpm](https://pnpm.io/installation)

You will also need a [Twitch Developer](https://dev.twitch.tv/) account and a [Twitch Application](.github/images/loading-extension.png).

![alt text](.github/images/twitch-base.png)

> **Note:** Set a default OAuth Callback URL when creating your extension.

## Usage

### Running the Extension

1. Navigate to the extension directory:

    ```sh
    cd extension
    ```

2. Create a `.env` file in the `extension` directory using the provided `.env.example`:

    ```sh
    cp .env.example .env
    ```

3. Open the `.env` file and set your Twitch Client ID:

    ```env
    PLASMO_PUBLIC_TWITCH_CLIENT_ID="your-client-id-here"
    PLASMO_PUBLIC_TWITCH_API_URL="https://api.twitch.tv/helix"
    PLASMO_PUBLIC_API_URL="https://twitch-extension.danielheart.dev"
    ```

4. Install the Node.js dependencies using pnpm:

    ```sh
    pnpm install
    ```

5. Run the plasmo dev mode with Firefox as the target:

    ```sh
    pnpm dev:firefox
    ```

   This will create a server for hot-reload along with a dev extension that you can find at `./extension/build/firefox-mv2-dev`.

6. Access the [about:debugging](about:debugging) (firefox only) and load your extension by selecting the `manifest.json` file:

   ![Debugging Tab at Firefox](.github/images/loading-extension.png)

7. Run the Authentication for the first time, retrieve the `redirect_url`, and add it to your Twitch App.

    ![alt text](.github/images/redirect_uri.png)
    ![twitch with redirect uri](.github/images/twitch_with_redirect.png)

8. Close the Redirect Tab and try to authenticate again:

    ![App Authenticated](.github/images/app_authenticated.png)

##  Contributing

We welcome contributions to improve this project! To contribute, please follow these steps:

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your changes:

    ```sh
    git checkout -b feature/your-feature-name
    ```

3. Make your desired changes to the codebase.
4. Test your changes to ensure they work as expected.
5. Commit your changes with a descriptive commit message:

    ```sh
    git commit -m "Add feature/fix: description of your changes"
    ```

6. Push your changes to your forked repository:

    ```sh
    git push origin feature/your-feature-name
    ```

7. Open a pull request in the original repository and provide a clear description of your changes.
8. Wait for the project maintainers to review and merge your pull request.

Thank you for contributing! Your help is greatly appreciated.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
