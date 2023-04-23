# 💄 turing-pi-ui
> Web Interface for a Turing Pi 2 BMC 


## ℹ️ Overview

### 📦 Prerequisites
- [Node.js](https://nodejs.org/en)
- [Turing Pi 2](https://turingpi.com/product/turing-pi-2/)

This project was created by @PhearZero and is not affiliated with [Turing Machines](). `turing-pi-ui` is a simplifed
interface with a heavy focus on optimizations (304kb bundle size). It leverages the [turing-pi-js](https://www.npmjs.com/package/turing-pi-js) 
library, an API client for a Turing Pi 2 BMC.

### 📝 Remaining Issues:
 - [X] Power Management
 - [X] USB Management
 - [X] BMC Host Information
 - [X] BMC SD Card Information
 - [X] Node Information
 - [ ] Allow firmware uploads 

## 🚀 Quick Install

Included is a deployment shell script that will upload the assets to the appropriate directory on the BMC

```bash
git clone https://github.com/PhearZero/turing-pi-ui
cd turing-pi-ui

# Update the target to the BMC
# ./deploy.sh <target>
./deploy.sh root@192.168.1.X
```

## 👷 Developing

### 🔃 Starting the Proxy

Included is a simple proxy to fix the headers of the BMC Web API. Ensure that the BMC_API variable is pointing
to a BMC api that is reachable.

Add the following `.env` file:
```dotenv
# The location of the BMC API, used for proxy connections
BMC_API=http://192.168.1.36

# The location of the NGINX proxy, used for frontend connections in development
PUBLIC_SERVICE_API=http://127.0.0.1:8080
```

Run docker services
```bash
docker compose up
```

### ⚙️ Running UI Locally

```bash
# Install dependencies
npm install

# Start the server and open the app in a new browser tab
npm run dev -- --open
```

### 🏗️ Building

To create a production version of the app:

```bash
npm run build
```
