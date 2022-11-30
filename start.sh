#! /usr/bin/env bash

echo "Running. PORT: $PORT"
cat /etc/nginx/nginx.conf 
nginx -tg "daemon off;"
