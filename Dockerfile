FROM nginx

EXPOSE 10000

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /app

COPY . .

CMD [ "nginx", "-g", "daemon off;" ]