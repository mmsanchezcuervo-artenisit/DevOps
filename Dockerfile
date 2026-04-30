FROM node:18-alpine
WORKDIR /app
COPY app.js .
RUN mkdir -p /data
ENV PUERTO=8080
ENV NOMBRE_PARQUE="Eolica Naranco S.L."
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:8080/salud || exit 1
CMD ["node", "app.js"]
