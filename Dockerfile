# 1. Imagen base: Node 18 sobre Alpine Linux
FROM node:18-alpine

# 2. Directorio de trabajo dentro del contenedor: /app
WORKDIR /app
ENV PUERTO=8080
ENV NOMBRE_PARQUE="Eolica Naranco"




# 3. Copiar el fichero app.js al contenedor
COPY app.js .

# 4. Crear el directorio /data dentro del contenedor
RUN mkdir /data

# 5. El puerto que usa la app: 8080
EXPOSE 8080

# 6. El comando para arrancar la app: node app.js
CMD ["node", "app.js"]
