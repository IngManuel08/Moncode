import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendOrderConfirmation = async (userEmail, orderDetails) => {
    try {
        const mailOptions = {
            from: `"MONCODE" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Confirmación de Pedido - MONCODE',
            html: `
                <h1>¡Gracias por tu compra en MONCODE!</h1>
                <p>Tu pedido ha sido creado exitosamente.</p>
                <h3>Resumen de la orden:</h3>
                <ul>
                    ${orderDetails.items.map(item => `<li>${item.quantity}x (Producto ID: ${item.productId}) - $${item.price}</li>`).join('')}
                </ul>
                <h2>Total pagado: $${orderDetails.total}</h2>
                <p>Nos pondremos en contacto contigo pronto con las actualizaciones de tu envío.</p>
                <br>
                <p>Saludos,</p>
                <p>El equipo de MONCODE</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return false;
    }
};
