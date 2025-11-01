import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const claimTypes = [
  { value: 'hospital', label: 'Hospitalization' },
  { value: 'dental', label: 'Dental' },
  { value: 'vision', label: 'Vision' },
  { value: 'pharmacy', label: 'Pharmacy' },
]

export default function SubmitClaim() {
  const [step, setStep] = useState(0)
  const [patient, setPatient] = useState({ name: '', policy: '', date: null })
  const [details, setDetails] = useState({ type: '', amount: '', provider: '', desc: '' })
  const [files, setFiles] = useState([])
  const [confirm, setConfirm] = useState(false)
  const nav = useNavigate()

  const next = () => setStep(s => Math.min(2, s + 1))
  const prev = () => setStep(s => Math.max(0, s - 1))
  const onFiles = (e) => {
    const list = Array.from(e.target.files || [])
    setFiles(list)
  }
  const submit = () => setConfirm(true)
  const confirmSubmit = () => { setConfirm(false); nav('/claims') }

  const title = ['Patient Information', 'Claim Details', 'Document Upload'][step]
  const stepText = `Step ${step + 1} of 3 - ${title}`

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg">
        <Paper elevation={0} className="rounded-xl border overflow-hidden">
          <Box className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-6">
            <Typography variant="h5" className="font-semibold">Submit New Claim</Typography>
            <Typography variant="body2" className="opacity-90">{stepText}</Typography>
          </Box>

          <Box className="p-6">
            {step === 0 && (
              <Stack spacing={3}>
                <TextField label="Patient Name" required value={patient.name} onChange={e=>setPatient({ ...patient, name: e.target.value })} fullWidth />
                <TextField label="Policy Number" required value={patient.policy} onChange={e=>setPatient({ ...patient, policy: e.target.value })} fullWidth />
                <DatePicker label="Date of Service" value={patient.date} onChange={v=>setPatient({ ...patient, date: v })} slotProps={{ textField: { fullWidth: true } }} />
              </Stack>
            )}

            {step === 1 && (
              <Stack spacing={3}>
                <TextField select label="Claim Type" required value={details.type} onChange={e=>setDetails({ ...details, type: e.target.value })} fullWidth>
                  {claimTypes.map(o=> <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                </TextField>
                <TextField label="Claim Amount" type="number" required value={details.amount} onChange={e=>setDetails({ ...details, amount: e.target.value })} fullWidth />
                <TextField label="Provider Name" required value={details.provider} onChange={e=>setDetails({ ...details, provider: e.target.value })} fullWidth />
                <TextField label="Description" value={details.desc} onChange={e=>setDetails({ ...details, desc: e.target.value })} multiline minRows={4} fullWidth />
              </Stack>
            )}

            {step === 2 && (
              <Stack spacing={3}>
                <Box className="border-2 border-dashed rounded-lg p-10 text-center text-slate-500">
                  <CloudUploadIcon fontSize="large" />
                  <Typography variant="h6" className="mt-2">Upload Documents</Typography>
                  <Typography variant="body2" className="mb-4">Upload medical bills, receipts, or prescriptions</Typography>
                  <Button variant="contained" component="label">
                    Choose Files
                    <input type="file" hidden multiple accept="image/*,application/pdf" onChange={onFiles} />
                  </Button>
                </Box>
                <Box className="flex flex-wrap gap-2">
                  {files.map((f,i)=> (
                    <Chip key={i} label={f.name} variant="outlined" />
                  ))}
                </Box>
                <Alert icon={<InfoOutlinedIcon />} severity="info" variant="outlined" className="bg-cyan-50">
                  AI Document Processing will extract key information from uploaded documents.
                </Alert>
              </Stack>
            )}
          </Box>

          <Box className="px-6 pb-6 flex justify-between">
            <Button variant="outlined" onClick={prev} disabled={step===0}>Previous</Button>
            {step<2 ? (
              <Button variant="contained" onClick={next}>Next</Button>
            ) : (
              <Button variant="contained" onClick={submit}>Submit Claim</Button>
            )}
          </Box>
        </Paper>
      </Container>

      <Dialog open={confirm} onClose={()=>setConfirm(false)}>
        <DialogTitle>Submit Claim</DialogTitle>
        <DialogContent>Do you want to submit this claim?</DialogContent>
        <DialogActions>
          <Button onClick={()=>setConfirm(false)}>Cancel</Button>
          <Button onClick={confirmSubmit} variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  )
}
