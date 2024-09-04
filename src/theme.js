import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { teal, deepOrange, orange } from '@mui/material/colors'

// https://flatuicolors.com/palette/defo
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  },
  colorSchemes: {
    light: {
      palette: {
        appBarPrimary: {
          main: '#fff',
          50: 'rgba(255, 255, 255, 0.1)',
          light: 'rgba(255, 255, 255, 0.5)',
          dark: '#f0f0f0'
        }
        // primary: teal,
        // secondary: deepOrange,
        // background: {
        //   default: '#fff'
        // }
      }
    },
    dark: {
      palette: {
        appBarPrimary: {
          main: '#fff',
          50: 'rgba(255, 255, 255, 0.2)',
          light: 'rgba(255, 255, 255, 0.5)',
          dark: '#f0f0f0'
        },
        // primary: {
        //   main: '#DDE6ED',
        //   50: 'rgba(221, 230, 237, 0.2)',
        //   contrastText: '#27374D'
        // },
        // secondary: orange,
        background: {
          paper: '#1f2b3d'
        }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '3px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#aeb4b8'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '.MuiButton-endIcon': {
            marginLeft: 0
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem'
          // color: theme.palette.primary.main,
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem'
          // color: theme.palette.primary.main,
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.main
          //   }
          // }
          // '& fieldset': {
          //   borderWidth: '1px !important'
          // }
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.appBarPrimary.main,
          backgroundColor: '#a4b0be',
          fontSize: '1rem'
        })
      }
    }
  }
})

export default theme
