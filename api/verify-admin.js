// api/verify-admin.js
module.exports = (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    // Safely parse body whether Vercel parses it automatically or sends it as raw text
    let body = req.body;
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { body = {}; }
    }

    const passcode = body?.passcode;
    const serverPasscode = process.env.ADMIN_PASSCODE || "ogco2026";

    if (passcode === serverPasscode) {
        return res.status(200).json({ success: true });
    } else {
        return res.status(401).json({ success: false, message: "Invalid passcode" });
    }
};