import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { teal, deepOrange, orange } from '@mui/material/colors'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

// https://flatuicolors.com/palette/defo
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
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
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
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
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '.MuiTypography-root': {
            fontSize: '0.875rem'
          },
          '& .MuiListItemIcon-root': {
            minWidth: '28px'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
          overflow: 'unset', // Cái này để bỏ ngăn chặn thanh scroll ở trong Column Content
          '.MuiCardMedia-root': {
            height: 140
          },
          '.MuiCardContent-root': {
            padding: '12px',
            '&:last-child': { padding: '12px' }
          },
          '.MuiCardActions-root': {
            padding: '0 4px 8px 4px'
          }
        }
      }
    }
  }
})

export default theme
