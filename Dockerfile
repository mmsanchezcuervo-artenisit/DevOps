# 1. Imagen base
FROM node:18-alpine

# 2. Directorio de trabajo
WORKDIR /app

# 3. Copiar el fichero app.js
COPY app.js .

# 4. Crear el directorio de datos
RUN mkdir /data

# 5. Puerto que usa la app
ENV PUERTO=8080
ENV NOMBRE_PARQUE="Eólica Naranco"

EXPOSE 8080

# 6. Comando para arrancar
CMD ["node", "app.js"]

