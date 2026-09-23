import './style.css';

import QRCodeStyling from 'qr-code-styling';
import { jsPDF } from 'jspdf';

function createFlower() {
    const canvas = document.createElement('canvas');

    canvas.width = 160;
    canvas.height = 160;

    const context = canvas.getContext('2d');

    context.fillStyle = '#ffffff';

    context.beginPath();
    context.roundRect(0, 0, 160, 160, 35);
    context.fill();

    context.font =
        '90px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';

    context.textAlign = 'center';
    context.textBaseline = 'middle';

    context.fillText('🌸', 80, 82);

    return canvas.toDataURL('image/png');
}

const flower = createFlower();

const qrCode = new QRCodeStyling({
    width: 500,
    height: 500,

    data: 'https://vyacheslav-hub.github.io/romantic-page/',

    image: flower,

    qrOptions: {
        errorCorrectionLevel: 'H',
    },

    dotsOptions: {
        color: '#ff668e',
        type: 'rounded',
    },

    cornersSquareOptions: {
        color: '#ff4f81',
        type: 'extra-rounded',
    },

    cornersDotOptions: {
        color: '#ff4f81',
        type: 'dot',
    },

    backgroundOptions: {
        color: '#ffffff',
    },

    imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.22,
        margin: 8,
    },
});

const container = document.querySelector('#qr');

qrCode.append(container);

// Скачать PDF 3 × 3 см
const downloadPdfButton =
    document.querySelector('#download-pdf');

downloadPdfButton.addEventListener('click', async () => {
    const blob = await qrCode.getRawData('png');

    const imageUrl = URL.createObjectURL(blob);

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [30, 30],
    });

    pdf.addImage(
        imageUrl,
        'PNG',
        0,
        0,
        30,
        30
    );

    pdf.save('romantic-qr-3x3cm.pdf');

    URL.revokeObjectURL(imageUrl);
});
