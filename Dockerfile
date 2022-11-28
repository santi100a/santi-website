FROM nginx

EXPOSE ${PORT}

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /app

COPY . .

RUN chmod +x ./start.sh

CMD [ "./start.sh" ]