# Docker - Build, Run y Actualización

## Descripción
Este proyecto utiliza Docker para empaquetar y ejecutar la aplicación Node.js en un entorno aislado y reproducible.

---

## Construcción de la imagen

Desde la carpeta `DevOps` donde se encuentra el `Dockerfile`:

```bash
docker build -t eolica-naranco .
```
Esto crea una imagen basada en Node 18 Alpine con la aplicación configurada.

---

## Ejecución del contenedor

Para arrancar la aplicación:
```bash
docker run -p 8080:8080 -v visitas-eolica:/data eolica-naranco
```

Opcional (en segundo plano):
```bash
docker run -d -p 8080:8080 --name eolica-naranco -v visitas-eolica:/data eolica-naranco
```

---
## Acceso a la aplicación
* Abrir Web Preview
* Seleccionar puerto 8080
* Verificar que carga el panel de control

## Actualización de la aplicación

Cada vez que se realicen cambios en el código o en el Dockerfile, es necesario:

1. Parar el contenedor anterior:
```bash
docker ps
docker stop <container_id> 
```

2. (Opcional) Eliminar contenedor:
```bash
docker rm <container_id>
```

3. Construir la imagen:
```bash
docker build -t eolica-naranco .
```

4. Arrancar el contenedor:
```bash
docker run -p 8080:8080 --name eolica-naranco -v visitas-eolica:/data eolica-naranco
```

---

## 📜 Logs y ejecución en segundo plano

Cuando un contenedor se ejecuta en modo background (`-d`), no vemos directamente lo que ocurre dentro. Para ello utilizamos los logs.

### Ejecutar en segundo plano

```bash
docker run -d -p 8080:8080 --env-file .env --name eolica-naranco eolica-naranco
```

### Ver logs del contenedor
```bash
docker logs eolica-naranco
```

### Ver logs en tiempo real
```bash
docker logs -f eolica-naranco
```

### Ver solo las últimas líneas
```bash
docker logs -f -t 20 eolica-naranco
```

### Listar todos los contenedores (incluidos los parados)
```bash
docker ps -a
```

---

## Problemas comunes

### Dockerfile no encontrado
* Verificar nombre exacto: Dockerfile
* Comprobar ubicación correcta

### Puerto no accesible
* Verificar que la app escucha en 0.0.0.0
* Revisar puerto 8080

### Cambios no aplicados
* Asegurarse de reconstruir la imagen tras modificaciones

---

### Notas

* Siempre reconstruir la imagen tras cambios
* Mantener coherencia entre código y contenedor
* Usar nombres claros para imágenes y contenedores
* Los logs son esenciales para depurar errores en contenedores
* En producción, suelen enviarse a sistemas externos (ELK, Grafana, etc.)
* Ejecutar en background es el modo habitual en entornos reales
