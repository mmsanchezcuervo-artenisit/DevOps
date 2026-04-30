const http = require('http');
const fs = require('fs');

// ============================================
// EÓLICA NARANCO S.L. - Sistema de gestión
// ============================================

const PUERTO = process.env.PUERTO || 8080;
const NOMBRE_PARQUE = process.env.NOMBRE_PARQUE || 'Eólica Naranco S.L.';
const RUTA_VISITAS = '/data/visitas.txt';

// Lee el contador de visitas
function leerVisitas() {
  try {
    return parseInt(fs.readFileSync(RUTA_VISITAS, 'utf8')) || 0;
  } catch {
    return 0;
  }
}

// Guarda el contador de visitas
function guardarVisitas(n) {
  try {
    fs.mkdirSync('/data', { recursive: true });
    fs.writeFileSync(RUTA_VISITAS, String(n));
  } catch (e) {
    console.error('Error guardando visitas:', e.message);
  }
}

// HTML de la página principal
function paginaPrincipal(visitas) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${NOMBRE_PARQUE}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a1628 100%);
      color: #e0e0e0;
      min-height: 100vh;
    }
    header {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding: 20px 40px;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .logo {
      font-size: 2em;
    }
    header h1 {
      font-size: 1.4em;
      color: #4fc3f7;
      font-weight: 300;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    header span {
      font-size: 0.8em;
      color: #888;
      display: block;
      letter-spacing: 1px;
    }
    .hero {
      text-align: center;
      padding: 60px 40px 40px;
    }
    .hero h2 {
      font-size: 2.5em;
      color: #fff;
      font-weight: 200;
      letter-spacing: 3px;
      margin-bottom: 12px;
    }
    .hero p {
      color: #888;
      font-size: 1em;
      letter-spacing: 1px;
    }
    .stats {
      display: flex;
      justify-content: center;
      gap: 24px;
      padding: 40px;
      flex-wrap: wrap;
    }
    .stat-card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(79,195,247,0.2);
      border-radius: 12px;
      padding: 28px 36px;
      text-align: center;
      min-width: 160px;
      transition: all 0.3s;
    }
    .stat-card:hover {
      border-color: rgba(79,195,247,0.6);
      background: rgba(79,195,247,0.08);
      transform: translateY(-4px);
    }
    .stat-card .numero {
      font-size: 2.8em;
      font-weight: 700;
      color: #4fc3f7;
      display: block;
    }
    .stat-card .etiqueta {
      font-size: 0.8em;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 6px;
      display: block;
    }
    .rutas {
      max-width: 700px;
      margin: 0 auto;
      padding: 20px 40px 60px;
    }
    .rutas h3 {
      color: #4fc3f7;
      font-size: 0.85em;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 16px;
      opacity: 0.7;
    }
    .ruta {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 20px;
      background: rgba(255,255,255,0.03);
      border-radius: 8px;
      margin-bottom: 8px;
      border: 1px solid rgba(255,255,255,0.06);
    }
    .ruta code {
      color: #81c784;
      font-size: 0.95em;
      min-width: 180px;
    }
    .ruta span {
      color: #666;
      font-size: 0.85em;
    }
    .badge {
      margin-left: auto;
      font-size: 0.7em;
      padding: 3px 10px;
      border-radius: 20px;
      background: rgba(79,195,247,0.15);
      color: #4fc3f7;
      border: 1px solid rgba(79,195,247,0.3);
    }
    .badge.pendiente {
      background: rgba(255,183,77,0.1);
      color: #ffb74d;
      border-color: rgba(255,183,77,0.3);
    }
    .visitas {
      text-align: center;
      padding: 20px;
      color: #444;
      font-size: 0.8em;
      letter-spacing: 1px;
    }
    .status {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #4caf50;
      border-radius: 50%;
      margin-right: 8px;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
    footer {
      text-align: center;
      padding: 20px;
      color: #ddd;
      font-size: 0.75em;
      letter-spacing: 1px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
  </style>
</head>
<body>
  <header>
    <div class="logo">🌬️</div>
    <div>
      <h1>${NOMBRE_PARQUE}</h1>
      <span><span class="status"></span>Sistema operativo</span>
    </div>
  </header>

  <div class="hero">
    <h2>Panel de Control</h2>
    <p>Parque eólico · Sierra del Aramo · Asturias</p>
  </div>

  <div class="stats">
    <a href="/aerogeneradores" style="text-decoration:none; color:inherit;">
    <div class="stat-card">
      <span class="numero">12</span>
      <span class="etiqueta">Aerogeneradores</span>
    </div>
    </a>
    <div class="stat-card">
      <span class="numero">4</span>
      <span class="etiqueta">Sectores</span>
    </div>
    <div class="stat-card">
      <span class="numero">48</span>
      <span class="etiqueta">MW instalados</span>
    </div>
    <div class="stat-card">
      <span class="numero">${visitas}</span>
      <span class="etiqueta">Visitas</span>
    </div>
  </div>

  <div class="rutas">
    <h3>Endpoints disponibles</h3>
    <div class="ruta">
      <code>GET /</code>
      <span>Panel de control principal</span>
      <span class="badge">✓ activo</span>
    </div>
    <div class="ruta">
      <code>GET /aerogeneradores</code>
      <span>Lista de aerogeneradores</span>
      <span class="badge pendiente">tarea 2</span>
    </div>
    <div class="ruta">
      <code>GET /salud</code>
      <span>Estado del servidor</span>
      <span class="badge pendiente">tarea 5</span>
    </div>
  </div>

  <footer>
    Artenis IT · ClusterTIC Asturias · 2026
  </footer>
</body>
</html>`;
}

// ============================================
// SERVIDOR
// ============================================

const server = http.createServer((req, res) => {
  const visitas = leerVisitas() + 1;
  guardarVisitas(visitas);

  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  if (req.url === '/' || req.url.startsWith('/?')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(paginaPrincipal(visitas));
    return;
  }

  // TAREA 2: Añade aquí la ruta /aerogeneradores
if (req.url === '/aerogeneradores') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Listado de Aerogeneradores</h1><p>Panel de control de los 12 aerogeneradores en servicio.</p><a href="/">Volver al inicio</a>');
    return;
}
  // TAREA 5: Añade aquí la ruta /salud

  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>404 - Ruta no encontrada</h1>');
});

server.listen(PUERTO, () => {
  console.log(`🌬️  ${NOMBRE_PARQUE} arrancado en puerto ${PUERTO}`);
});
