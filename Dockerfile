FROM nginx:alpine

COPY www /usr/share/nginx/html

COPY nginxx.conf /etc/nginx/nginx.conf

COPY default.conf /etc/nginx/conf.d/default.conf