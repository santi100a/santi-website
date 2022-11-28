FROM nginx

EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /app

COPY . .

RUN echo "$PORT"

CMD [ "nginx", "-g", "daemon off;" ]