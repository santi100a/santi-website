FROM nginx

EXPOSE ${PORT}

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /app

COPY . .

CMD [ "nginx", "-g", "daemon off;" ]