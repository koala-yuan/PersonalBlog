#!/bin/bash
CUR_DIR=$(pwd)

function usage() {
  echo -e "Usage: $0 [-h]
    -h: show usage" 1>&2;
  exit 0;
}

while getopts "h" o; do
  case "${o}" in
    h | *)
      usage
      ;;
  esac
done

# add some env for the service
export LOCALMODE=1
export APP_DIR=$CUR_DIR
export BACKEND_PROTOCOL=http
export BACKEND_HOST=172.16.233.1
export BACKEND_PORT=18000
export BACKEND_VERSION=v1
export WEBUI_PROTOCOL=http
export WEBUI_HOST=127.0.0.1
export WEBUI_PORT=3000
export BDOS_DOMAIN=http://127.0.0.1:3000

# `LOGINMODE` values:
# `auto` - As default, make the app as no-login mode, always be the user `dcos`
# `bdos` - Login and connect with bdos-web to get system infomations
# export LOGINMODE=bdos

# run node
cd "$APP_DIR"/web && npm install && npm run dev
