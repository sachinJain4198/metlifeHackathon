import Tesseract from 'tesseract.js'
import * as pdfjsLib from 'pdfjs-dist'

export async function ocrImage(file) {
  const { data } = await Tesseract.recognize(await file.arrayBuffer(), 'eng')
  return data.text
}

export async function extractPdfText(file) {
  const data = new Uint8Array(await file.arrayBuffer())
  const pdf = await pdfjsLib.getDocument({ data }).promise
  let text = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    text += content.items.map(it => it.str).join(' ') + '\n'
  }
  return text
}
