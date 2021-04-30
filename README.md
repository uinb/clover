# FUSOTAO Wallet

FUSOTAO Wallet is a wallet for for [Polkadot blockchain.](https://polkadot.network/)

FUSOTAO Wallet is currently a work in progress, so changes will occur.


## Prerequisites

- NodeJS >= v11
- Yarn latest

## Get It

Once published FUSOTAO Wallet will be installable from the Chrome Web Store. Until then, it can be run via yarn by cloning this repo. Unpacked builds will be made available at [https://github.com/uinb/fusotao-wallet](https://github.com/uinb/fusotao-wallet) shortly.

### Installation

Execute the following to clone, install dependencies, and run a development server:

    git clone https://github.com/uinb/fusotao-wallet.git
    cd fusotao-wallet
    yarn install
    yarn run dev

Once running Chrome:

- Go to chrome://extensions
- Enable 'Developer Mode' (top right corner of window)
- Click "Load Unpacked" and select the fusotao-wallet/dev/chrome directory
- Navigate to : https://localhost:3001 and accept the https connection

The fusotao Wallet icon should show up in your Chrome toolbar.

Once running Firefox:

- Go to about:debugging#/runtime/this-firefox
- Click 'Load Temporary Addon' 
- select the fusotao-wallet/dev/firefox directory
- Navigate to : https://localhost:3001 and accept the https connection

The fusotao Wallet icon should show up in your Firefox toolbar.
