const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit'); // Requires installation: npm install pdfkit

// Function to create a PDF certificate
exports.createCertificatePDF = async ({ userName, bookTitle, donationDate, certificatePath }) => {
    return new Promise((resolve, reject) => {
        try {
            // Create PDF document
            const doc = new PDFDocument({
                size: 'A4',
                margin: 50
            });

            // Create directory if it doesn't exist
            const dir = path.dirname(certificatePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            // Pipe PDF to file
            const stream = fs.createWriteStream(certificatePath);
            doc.pipe(stream);

            // Add content to PDF
            doc.fontSize(25).text('Certificate of Book Donation', { align: 'center' });
            doc.moveDown();
            doc.fontSize(15).text(`This is to certify that ${userName} has donated the book`, { align: 'center' });
            doc.moveDown();
            doc.fontSize(20).text(`"${bookTitle}"`, { align: 'center' });
            doc.moveDown();
            doc.fontSize(15).text(`to our library on ${donationDate}.`, { align: 'center' });
            doc.moveDown(2);
            doc.fontSize(15).text('We appreciate your contribution to our community.', { align: 'center' });
            doc.moveDown(2);
            doc.fontSize(12).text('Library Director', 400, 500);
            doc.moveTo(400, 520).lineTo(550, 520).stroke();
            doc.moveDown();
            doc.fontSize(12).text('Signature', 450, 540);

            // Finalize PDF
            doc.end();

            stream.on('finish', () => {
                resolve(certificatePath);
            });

            stream.on('error', (error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
};