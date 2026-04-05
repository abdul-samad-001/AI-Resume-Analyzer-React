import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const ACCEPTED_EXTENSIONS = ['pdf', 'docx', 'doc', 'txt', 'md', 'markdown'];

export function getFileExtension(file) {
  return file.name.split('.').pop().toLowerCase();
}

export function isValidFile(file) {
  const ext = getFileExtension(file);
  return ACCEPTED_EXTENSIONS.includes(ext);
}

export function validateFileSize(file, maxSizeMB = 10) {
  return file.size <= maxSizeMB * 1024 * 1024;
}

function readAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

function readAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

async function parsePDF(file) {
  const buffer = await readAsArrayBuffer(file);
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const pages = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map((item) => item.str).join(' ');
    pages.push(text);
  }

  return pages.join('\n\n');
}

async function parseDOCX(file) {
  const mammoth = await import('mammoth');
  const buffer = await readAsArrayBuffer(file);
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value;
}

async function parseDOCFallback(file) {
  const text = await readAsText(file);
  const printable = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s{3,}/g, ' ');
  if (printable.trim().length < 50) {
    throw new Error(
      'Legacy .doc format could not be parsed in browser. Please convert to .docx or .pdf.'
    );
  }
  return printable;
}

export async function parseFile(file) {
  const ext = getFileExtension(file);

  switch (ext) {
    case 'pdf':
      return await parsePDF(file);
    case 'docx':
      return await parseDOCX(file);
    case 'doc':
      return await parseDOCFallback(file);
    case 'txt':
    case 'md':
    case 'markdown':
      return await readAsText(file);
    default:
      throw new Error(`Unsupported file format: .${ext}`);
  }
}
