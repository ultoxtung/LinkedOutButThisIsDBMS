FROM consul
FROM envoyproxy/envoy-alpine:v1.20.0
FROM python:3.8

WORKDIR /app
COPY --from=0 /bin/consul /usr/local/bin/consul
COPY --from=1 /usr/local/bin/envoy /usr/local/bin/envoy
COPY ./requirements.txt /app/requirements.txt
RUN ["pip", "install", "-r", "requirements.txt"]

EXPOSE 8000

COPY ./config /config
COPY ./consul /consul/config
COPY ./backend /app/backend
COPY ./app /app/app
COPY ./manage.py /app/manage.py
COPY ./docker-entrypoint.sh .

CMD ["/bin/bash", "docker-entrypoint.sh"]
