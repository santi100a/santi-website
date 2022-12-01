FROM nginx:alpine

COPY www /usr/share/nginx/html

COPY conf/nginx.conf /etc/nginx/nginx.conf

COPY conf/default.conf /etc/nginx/conf.d/default.conf