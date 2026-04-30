FROM node:18-alpine
WORKDIR /app
COPY app.js .
RUN mkdir /data
EXPOSE 8080
ENV PUERTO=8080
ENV NOMBRE_PARQUE="Eólica Naranco"
CMD ["node", "app.js"]


