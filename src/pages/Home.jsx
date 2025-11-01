import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { mockItems } from '../services/mock.js'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function Home() {
  const open = useSelector(s=>s.ui.drawerOpen)
  const [q, setQ] = useState('')
  const items = useMemo(()=>mockItems.filter(m=>m.title.toLowerCase().includes(q.toLowerCase())),[q])
  return (
    <Box>
      <Box className="d-flex gap-2 flex-column flex-md-row mb-3">
        <TextField size="small" label="Search" value={q} onChange={e=>setQ(e.target.value)} className="flex-grow-1" />
        <Typography variant="body2">UI drawer: {open? 'open':'closed'}</Typography>
      </Box>
      <Grid container spacing={2}>
        {items.map(i=> (
          <Grid key={i.id} item xs={12} sm={6} md={4}>
            <Card className="h-100 d-flex">
              <CardContent className="flex-grow-1 d-flex flex-column">
                <Typography gutterBottom variant="h6">{i.title}</Typography>
                <Typography variant="body2" sx={{ flex: 1 }}>{i.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
