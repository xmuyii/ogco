// api/verify-admin.js
module.exports = (req, res) => {
    // Enable CORS if needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { passcode } = req.body || {};
    const serverPasscode = process.env.ADMIN_PASSCODE || "ogco2026"; // Fallback for local testing

    if (passcode === serverPasscode) {
        return res.status(200).json({ success: true });
    } else {
        return res.status(401).json({ success: false, message: "Invalid passcode" });
    }
};