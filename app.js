const http = require('http');
const fs = require('fs');

const PUERTO = process.env.PUERTO || 8080;
const NOMBRE_PARQUE = process.env.NOMBRE_PARQUE || 'Eolica Naranco S.L.';

const servidor = http.createServer((req, res) => {

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // TAREA 2: Ruta /aerogeneradores
    if (req.url === '/aerogeneradores' || req.url.startsWith('/aerogeneradores?')) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <html>
            <head><title>Aerogeneradores - ${NOMBRE_PARQUE}</title></head>
            <body style="font-family:Arial; padding:20px; background:#1a1a2e; color:white;">
                <h1>Aerogeneradores de ${NOMBRE_PARQUE}</h1>
                <table border="1" cellpadding="10" style="border-collapse:collapse;">
                    <tr style="background:#16213e;"><th>ID</th><th>Sector</th></tr>
                    <tr><td>AG-01</td><td>Sector Norte</td></tr>
                    <tr><td>AG-02</td><td>Sector Norte</td></tr>
                    <tr><td>AG-03</td><td>Sector Norte</td></tr>
                    <tr><td>AG-04</td><td>Sector Sur</td></tr>
                    <tr><td>AG-05</td><td>Sector Sur</td></tr>
                    <tr><td>AG-06</td><td>Sector Sur</td></tr>
                    <tr><td>AG-07</td><td>Sector Este</td></tr>
                    <tr><td>AG-08</td><td>Sector Este</td></tr>
                    <tr><td>AG-09</td><td>Sector Este</td></tr>
                    <tr><td>AG-10</td><td>Sector Oeste</td></tr>
                    <tr><td>AG-11</td><td>Sector Oeste</td></tr>
                    <tr><td>AG-12</td><td>Sector Oeste</td></tr>
                </table>
                <br><a href="/" style="color:#4fc3f7;">Volver al panel</a>
            </body>
            </html>
        `);
        return;
    }

    // TAREA 5: Ruta /salud
    if (req.url === '/salud' || req.url.startsWith('/salud?')) {
        const estado = {
            status: 'ok',
            parque: process.env.NOMBRE_PARQUE || 'Eolica Naranco S.L.',
            admin: process.env.ADMIN_EMAIL || 'no configurado',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(estado, null, 2));
        return;
    }

    // Contador de visitas
    const ficheroVisitas = '/data/visitas.txt';
    let visitas = 0;
    try {
        visitas = parseInt(fs.readFileSync(ficheroVisitas, 'utf8')) || 0;
    } catch (e) {}
    visitas++;
    fs.writeFileSync(ficheroVisitas, String(visitas));

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<h1>Panel - ${NOMBRE_PARQUE}</h1><p>Visitas: ${visitas}</p>`);
});

servidor.listen(PUERTO, () => {
    console.log(`Servidor arrancado en puerto ${PUERTO}`);
});
