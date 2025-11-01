import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import PatientInfo from '../components/steps/PatientInfo.jsx'
import ClaimDetails from '../components/steps/ClaimDetails.jsx'
import DocumentUpload from '../components/steps/DocumentUpload.jsx'
import './SubmitClaims.css'


export default function SubmitClaim() {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const [confirmOpen, setConfirmOpen] = useState(false)

    const [patient, setPatient] = useState({ policy: '', dob: '' })
    const [details, setDetails] = useState({ amount: '', desc: '' })
    const [files, setFiles] = useState([])
    const [validationErrors, setValidationErrors] = useState({})

    const steps = [
        {
            title: 'Step 1 of 3 - Patient Information',
            component: <PatientInfo patient={patient} setPatient={setPatient} setValidationErrors={setValidationErrors} />
        },
        {
            title: 'Step 2 of 3 - Claim Details',
            component: <ClaimDetails details={details} setDetails={setDetails} />
        },
        {
            title: 'Step 3 of 3 - Document Upload',
            component: <DocumentUpload files={files} setFiles={setFiles} />
        }
    ]

    const disabledNext = useMemo(() => {
        if (step === 0) return !(patient.policy && patient.dob) || validationErrors.dob
        if (step === 1) return !(details.amount)
        return files.length === 0
    }, [step, patient, details, files, validationErrors])

    const next = () => setStep(s => Math.min(steps.length - 1, s + 1))
    const prev = () => setStep(s => Math.max(0, s - 1))
    const submit = () => {
        setConfirmOpen(true)
    }
    const confirm = () => {
        setConfirmOpen(false)
        const data = {
            policyNumber: patient.policy,
            dateOfBirth: patient.dob,
            amount: details.amount,
            description: details.desc,
            attachments: files.map((f) => ({ name: f.name, type: f.type, size: f.size }))
        }
        console.log('data ---',data)
        navigate('/claims', { replace: true })
    }

    return (
        <Box className="flex justify-center px-6 py-12 ">
            <Paper elevation={3} className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg ring-1 ring-slate-200">
                <Box className="bg-gradient-primary text-white px-6 py-7">
                    <Typography variant="h5" fontWeight={700} className="tracking-tight">Submit New Claim</Typography>
                    <Typography variant="body2" className="opacity-90 mt-1">
                        {steps[step].title}
                    </Typography>
                </Box>

                <Box sx={{ m: 3 }}>
                    {steps[step].component}

                    <Box className="flex justify-between mt-12 pt-4">
                        {step !== 0 && <Button variant="outlined" className="rounded-full px-6" sx={{ textTransform: 'none' }} onClick={prev}>Previous</Button>}
                        {step < steps.length - 1 ? (
                            <Button variant="contained" className="rounded-full bg-gradient-primary  text-white  px-6 next-button" sx={{ textTransform: 'none' }} onClick={next} disabled={disabledNext}>Next</Button>
                        ) : (
                            <Button variant="contained" className="rounded-full bg-gradient-primary  text-white  px-6" sx={{ textTransform: 'none' }} onClick={submit} disabled={disabledNext}>Submit Claim</Button>
                        )}
                    </Box>
                </Box>
            </Paper>
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Confirm Submit</DialogTitle>
                <DialogContent>
                    <Typography>The details you have added - are you sure you want to continue?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button variant="contained" className="bg-gradient-primary" onClick={confirm}>Yes, Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
