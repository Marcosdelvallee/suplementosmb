const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); 

// Middleware para proteger el Panel de Administración y la base de datos
app.use((req, res, next) => {
    if (req.path.includes('admin') || (req.path === '/api/products' && req.method === 'POST')) {
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

        // Usuario: admin | Contraseña: MateAdmin003374
        if (login === 'admin' && password === 'MateAdmin003374') {
            return next();
        }

        res.set('WWW-Authenticate', 'Basic realm="Panel Privado"');
        res.status(401).send('Acceso denegado. Se requiere autenticación.');
        return;
    }
    next();
});

app.use(express.static(__dirname)); 

const DB_FILE = path.join(__dirname, 'database.json');

const defaultProducts = [
    { id: 1, name: "Creatina gold nutrition 300g", category: "Creatina", desc: "Creatina nacional, máxima pureza.", price: 29000, discount: 0, img: "assets/images/product_creatine.png" },
    { id: 2, name: "Proteina Syntha 6 Bsn 700g", category: "Proteína", desc: "Proteina internacional de alta calidad.", price: 70000, discount: 0, img: "assets/images/product_whey.png" },
    { id: 3, name: "Amino x bsn 30 servicios", category: "Aminoácidos", desc: "Aminoácidos internacionales.", price: 36000, discount: 0, img: "assets/images/product_bcaa.png" },
    { id: 4, name: "Pre entreno venom 35 ser", category: "Pre-Entreno", desc: "Pre entreno internacional.", price: 73000, discount: 0, img: "assets/images/product_preworkout.png" },
    { id: 5, name: "EAA star nutrition 360gr", category: "Aminoácidos", desc: "Aminoácidos esenciales nacionales.", price: 37000, discount: 0, img: "assets/images/product_bcaa.png" },
    { id: 6, name: "Colageno ena sport", category: "Colágeno", desc: "Colageno nacional, protege tus articulaciones.", price: 31000, discount: 0, img: "assets/images/product_vitamins.png" },
    { id: 7, name: "Proteina Vegetal gold 2 lbs", category: "Proteína", desc: "Proteina nacional origen vegetal.", price: 39900, discount: 0, img: "assets/images/product_whey.png" },
    { id: 8, name: "Iron bar 20 unidades", category: "Barritas", desc: "Barritas proteicas nacionales.", price: 40000, discount: 0, img: "assets/images/product_bcaa.png" }
];

if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultProducts, null, 2));
}

let clients = [];

// Endpoint SSE para actualizar en tiempo real
app.get('/api/events', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    clients.push(res);
    req.on('close', () => { clients = clients.filter(c => c !== res); });
});

app.get('/api/products', (req, res) => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        res.json(JSON.parse(data));
    } catch(e) {
        res.json([]);
    }
});

app.post('/api/products', (req, res) => {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(req.body, null, 2));
        const dt = Date.now();
        clients.forEach(c => c.write(`data: ${dt}\n\n`));
        res.json({ success: true });
    } catch(e) {
        res.status(500).json({ error: 'No se pudo guardar en base de datos' });
    }
});

const getLocalIP = () => {
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) return net.address;
        }
    }
    return 'localhost';
};

const port = 3000;
app.listen(port, "0.0.0.0", () => {
    const ip = getLocalIP();
    console.log(`\n=================================================`);
    console.log(`🚀 SERVIDOR VIVO Y BASE DE DATOS LOCAL ONLINE`);
    console.log(`=================================================`);
    console.log(`💻 Para ver y editar desde ESTA PC, abrí en tu navegador:`);
    console.log(`👉 http://localhost:${port}`);
    console.log(`\n📱 Para conectar TU CELULAR u OTRA COMPU al mismo tiempo:`);
    console.log(`👉 http://${ip}:${port}`);
    console.log(`   (Asegurate de que estén en la misma red Wi-Fi)`);
    console.log(`=================================================\n`);
});
