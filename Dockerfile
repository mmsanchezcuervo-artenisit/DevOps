FROM node:18-alpine
WORKDIR /app
COPY app.js .
RUN mkdir /data
EXPOSE 8080
ENV PUERTO=8080
ENV NOMBRE_PARQUE="Eólica Naranco"
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:8080/salud || exit 1
CMD ["node", "app.js"]



