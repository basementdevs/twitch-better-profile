# Twitch Better Profile

## Table of Contents
- [Introduction](#introduction)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Installation](#backend-installation)
  - [Frontend Installation](#frontend-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This project uses Rust with Actix and ScyllaDB (using the Charybdis driver) for the backend, and React with Plasmo for the frontend. The project is organized into two main folders: `extension` for the frontend and `api` for the backend.

## Folder Structure

.
├── extension # Frontend code
└── api # Backend code


## Prerequisites
Make sure you have the following tools installed on your machine:
- Rust and Cargo: [Install Rust](https://www.rust-lang.org/tools/install)
- pnpm: [Install pnpm](https://pnpm.io/installation)

## Installation

### Backend Installation
1. Navigate to the `api` directory:
```sh
cd api
```

2. Install the Rust dependencies using Cargo:

```sh
cargo run
```

### Frontend Installation

1. Navigate to the extension directory:

```sh
cd extension
```

2. Install the Node.js dependencies using pnpm:

```
pnpm install
```

