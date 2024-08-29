import Button from '@mui/material/Button'
import { useColorScheme } from '@mui/material/styles'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

function App() {

  return (
    <>
      <ModeToggle />

      <h1>Test</h1>
      <Button variant="contained">Hello world</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  )
}

export default App
