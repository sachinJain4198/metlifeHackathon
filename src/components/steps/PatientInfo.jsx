import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { useState } from 'react'

export default function PatientInfo({ patient, setPatient, setValidationErrors }) {
  const [dobError, setDobError] = useState('')

  // Calculate min and max dates for the date input
  const today = new Date().toISOString().split('T')[0]
  const minDate = new Date()
  minDate.setFullYear(minDate.getFullYear() - 150)
  const minDateString = minDate.toISOString().split('T')[0]

  const validateDateOfBirth = (dateValue) => {
    if (!dateValue) {
      setDobError('')
      setValidationErrors(prev => ({ ...prev, dob: false }))
      return true
    }

    const selectedDate = new Date(dateValue)
    const todayDate = new Date(today)
    const minAllowedDate = new Date(minDateString)

    if (isNaN(selectedDate.getTime())) {
      const errorMsg = 'Please enter a valid date'
      setDobError(errorMsg)
      setValidationErrors(prev => ({ ...prev, dob: true }))
      return false
    }

    if (selectedDate > todayDate) {
      const errorMsg = 'Date of birth cannot be in the future'
      setDobError(errorMsg)
      setValidationErrors(prev => ({ ...prev, dob: true }))
      return false
    }

    if (selectedDate < minAllowedDate) {
      const errorMsg = 'Invalid date'
      setDobError(errorMsg)
      setValidationErrors(prev => ({ ...prev, dob: true }))
      return false
    }

    setDobError('')
    setValidationErrors(prev => ({ ...prev, dob: false }))
    return true
  }

  const handleDobChange = (e) => {
    const value = e.target.value
    setPatient(v => ({ ...v, dob: value }))
    validateDateOfBirth(value)
  }

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
        onChange={handleDobChange}
        fullWidth 
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, backgroundColor: '#f1f5f9' } }} 
        InputLabelProps={{ shrink: true }}
        inputProps={{
          min: minDateString,
          max: today
        }}
        error={!!dobError}
        helperText={dobError}
      />
    </Stack>
  )
}