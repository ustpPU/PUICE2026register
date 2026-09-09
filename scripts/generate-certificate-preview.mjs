import fs from 'node:fs';
import path from 'node:path';
import { jsPDF } from 'jspdf';

const projectRoot = path.resolve(import.meta.dirname, '..');
const outputDir = path.join(projectRoot, 'output', 'pdf');
fs.mkdirSync(outputDir, { recursive: true });

const toDataUrl = (relativePath, mimeType) => {
  const bytes = fs.readFileSync(path.join(projectRoot, 'public', relativePath));
  return `data:${mimeType};base64,${bytes.toString('base64')}`;
};

const record = {
  full_name: 'NUR AISYAH BINTI AHMAD',
  attendance_id: 'PU26-CONTOH01',
  certificate_number: 'PUICE26-CONTOH01',
};

const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
const width = doc.internal.pageSize.getWidth();
const height = doc.internal.pageSize.getHeight();

doc.setFillColor(7, 19, 40);
doc.rect(0, 0, width, height, 'F');
doc.setFillColor(246, 241, 231);
doc.roundedRect(11, 11, width - 22, height - 22, 3, 3, 'F');
doc.setDrawColor(242, 199, 110);
doc.setLineWidth(1);
doc.rect(16, 16, width - 32, height - 32);
doc.setDrawColor(83, 29, 52);
doc.setLineWidth(0.35);
doc.rect(19, 19, width - 38, height - 38);

doc.addImage(toDataUrl('brand/puice-logo.jpeg', 'image/jpeg'), 'JPEG', 31, 25, 24, 24);
doc.addImage(toDataUrl('brand/ppd-petaling-utama.png', 'image/png'), 'PNG', width / 2 - 28, 27, 56, 20);
doc.addImage(toDataUrl('brand/mbpj-logo.jpg', 'image/jpeg'), 'JPEG', width - 55, 27, 24, 19);

doc.setTextColor(83, 29, 52);
doc.setFont('helvetica', 'bold');
doc.setFontSize(14);
doc.text('PETALING UTAMA INNOVATIVE CONFERENCE ON EDUCATION', width / 2, 60, { align: 'center' });
doc.setTextColor(19, 35, 65);
doc.setFontSize(30);
doc.text('SIJIL KEHADIRAN', width / 2, 78, { align: 'center' });
doc.setFont('helvetica', 'normal');
doc.setFontSize(12);
doc.text('Dengan ini diperakui bahawa', width / 2, 92, { align: 'center' });
doc.setTextColor(167, 71, 64);
doc.setFont('helvetica', 'bold');
doc.setFontSize(27);
doc.text(record.full_name, width / 2, 109, { align: 'center' });
doc.setTextColor(19, 35, 65);
doc.setFont('helvetica', 'normal');
doc.setFontSize(12);
doc.text('telah menghadiri Kemuncak PUiCE 2026', width / 2, 123, { align: 'center' });
doc.setFont('helvetica', 'bold');
doc.text('10 September 2026  ·  Dewan Sivik, MBPJ', width / 2, 133, { align: 'center' });
doc.setDrawColor(210, 201, 187);
doc.line(55, 157, width - 55, 157);
doc.setFont('helvetica', 'normal');
doc.setTextColor(88, 98, 113);
doc.setFontSize(9);
doc.text(`No. sijil: ${record.certificate_number}`, 24, 174);
doc.text('Dijana secara digital selepas rekod kehadiran dan maklum balas dilengkapkan.', width - 24, 174, { align: 'right' });
doc.setFontSize(8);
doc.text('PUiCE 2026 · Teknologi Memacu, Insan Memimpin', width / 2, 185, { align: 'center' });

const outputPath = path.join(outputDir, 'Sijil-PUiCE-2026-Contoh.pdf');
fs.writeFileSync(outputPath, Buffer.from(doc.output('arraybuffer')));
console.log(outputPath);
