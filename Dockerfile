FROM node:18-alpine

RUN apk add --no-cache curl

WORKDIR /app

ENV PUERTO=8080
ENV NOMBRE_PARQUE="Eólica Naranco S.L."
ENV EMAIL_ADMIN="admin@eolica-naranco.es"

COPY app.js .

VOLUME /data

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:8080/salud || exit 1

CMD ["node", "app.js"]