const qrcode = require('qrcode')

exports.generateToken = async(req, res) => {
    const email = req.params.email;

    // Generate a QR code based on the email
    qrcode.toDataURL(email, (err, url) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to generate QR code' });
        } else {
            res.send(url);
        }
    });
};