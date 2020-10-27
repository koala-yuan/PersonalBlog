### Requirements
* start docker
* run the BDOS local app in docker

### node env
``` bash
# make sure the nvm is installed
nvm use
node -V
```

### Quick Development of frontend
``` bash
# API_BASE=https://test.linktimecloud.com:3002/ npm run debug
```

### Integration ENV

# run linktime-fe-typical-web-app node service
cd ~/linktime-fe-typical-web-app/web
bash setupBackend.sh

# run linktime-fe-typical-web-app frontend
cd ~/linktime-fe-typical-web-app/frontend
API_BASE=http://127.0.0.1:19999/ npm run debug

# login locally
1. go to http://127.0.0.1:3000/#/tour
2. copy link of `linktime-fe-typical-web-app` app
3. paste the url in the browser, and change the port to `19999`, press enter

```
