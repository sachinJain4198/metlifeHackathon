// Optional utilities for client-side extraction if needed later.
// Install heavy libs only when using this file in production.

// Example: OCR from images using tesseract.js
// import Tesseract from 'tesseract.js'
// export async function ocrImage(file) {
//   const { data: { text } } = await Tesseract.recognize(file, 'eng')
//   return text
// }

// Example: Extract text from PDFs using pdfjs-dist
// import * as pdfjsLib from 'pdfjs-dist'
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker'
// pdfjsLib.GlobalWorkerOptions.workerPort = new pdfWorker()
// export async function extractPdf(file) {
//   const array = await file.arrayBuffer()
//   const pdf = await pdfjsLib.getDocument({ data: array }).promise
//   let text = ''
//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i)
//     const content = await page.getTextContent()
//     text += content.items.map(it => it.str).join(' ') + '\n'
//   }
//   return text
// }
