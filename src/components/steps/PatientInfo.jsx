import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

export default function PatientInfo({ patient, setPatient }) {
  return (
    <Stack spacing={3}>
      <TextField 
        label="Policy Number *" 
        placeholder="Enter policy number" 
        value={patient.policy} 
        onChange={(e) => setPatient(v => ({ ...v, policy: e.target.value }))} 
        fullWidth 
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, backgroundColor: '#f1f5f9' } }} 
      />
      <TextField 
        type="date" 
        label="Date of Birth *" 
        value={patient.dob} 
        onChange={(e) => setPatient(v => ({ ...v, dob: e.target.value }))} 
        fullWidth 
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, backgroundColor: '#f1f5f9' } }} 
        InputLabelProps={{ shrink: true }} 
      />
    </Stack>
  )
}