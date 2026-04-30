FROM node:18-alpine

WORKDIR /app

ENV PUERTO=8080
ENV NOMBRE_PARQUE="Eólica Naranco S.L."

COPY app.js .

EXPOSE 8080

CMD ["node", "app.js"]