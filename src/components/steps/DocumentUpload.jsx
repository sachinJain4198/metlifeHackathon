import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import { UploadCloud } from 'lucide-react'

export default function DocumentUpload({ files, setFiles }) {
  const onPickFiles = (e) => {
    const incoming = Array.from(e.target.files || [])
    const accepted = incoming.filter((f) => {
      const typeOk = /^(application\/pdf|image\/.+|text\/csv|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/i.test(f.type)
      const extOk = /\.(pdf|png|jpe?g|gif|webp|csv|doc|docx)$/i.test(f.name)
      return typeOk || extOk
    })
    setFiles((prev) => {
      const names = new Set(prev.map((p) => p.name))
      const deduped = accepted.filter((f) => !names.has(f.name))
      return [...prev, ...deduped]
    })
    e.target.value = ''
  }

  const removeFile = (name) => setFiles(prev => prev.filter(f => f.name !== name))

  return (
    <Stack spacing={3}>
      <Box className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center bg-slate-50 p-3">
        <UploadCloud color="#64748b" size={36} />
        <Typography variant="h6" className="mt-2">Upload Documents</Typography>
        <Typography variant="body2" color="text.secondary" className="mt-1">
          Upload medical bills, receipts, or prescriptions
        </Typography>
        <Button variant="contained" className="mt-4 bg-gradient-primary mb-2 rounded-full px-6" component="label">
          Choose Files
          <input 
            hidden 
            type="file" 
            accept="application/pdf,image/*,text/csv,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.csv,.doc,.docx" 
            multiple 
            onChange={onPickFiles} 
          />
        </Button>
      </Box>

      {files.length > 0 && (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {files.map(f => (
            <Chip 
              key={f.name} 
              label={f.name} 
              onDelete={() => removeFile(f.name)} 
              variant="outlined" 
            />
          ))}
        </Stack>
      )}
    </Stack>
  )
}