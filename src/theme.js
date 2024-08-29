import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { red, teal } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: red
      }
    },
    dark: {
      palette: {
        primary: teal
      }
    }
  }
})

export default theme