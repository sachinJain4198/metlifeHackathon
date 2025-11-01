import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

export default function ClaimDetails({ details, setDetails }) {
  return (
    <Stack spacing={3}>
      <TextField 
        label="Claim Amount *" 
        placeholder="Enter amount" 
        type="number" 
        value={details.amount} 
        onChange={(e) => setDetails(v => ({ ...v, amount: e.target.value }))} 
        fullWidth 
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, backgroundColor: '#f1f5f9' } }} 
      />
      <TextField 
        label="Description" 
        placeholder="Describe the treatment or service" 
        multiline 
        rows={5} 
        value={details.desc} 
        onChange={(e) => setDetails(v => ({ ...v, desc: e.target.value }))} 
        fullWidth 
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, backgroundColor: '#f1f5f9' } }} 
      />
    </Stack>
  )
}