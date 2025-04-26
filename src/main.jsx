import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'

const theme = createTheme({
    palette: {
        primary: {
            light: "#598456",
            main: "#3B5839",
            dark: "#1D2C1C"
        },
        secondary: {
            light: "#365c8f",
            main: "#183a69",
            dark: "#001f49"
        },
        info: {
            light: "#f9f4ed",
            main: "#c8982a",
            dark: "#272727"
        }
    },
    typography: {
        h1: {
            fontSize: "3rem",
            fontWeight: "800"
        },
        h2: {
            fontSize: "1.75rem",
            fontWeight: "600"
        },
        h3: {
            fontSize: "1.5rem",
            fontWeight: "600"
        },
        body1: {
            fontSize: "1rem",
            fontWeight: "400"
        },
        fontFamily: "'EB Garamond', serif"
        
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#f9f4ed"
                }
            }
        }
        // MuiPaper: {
        //     styleOverrides: {
        //         root: {
        //             padding: "14px",
        //             borderRadius: "12px",
        //         }
        //     }
        // }
    }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
        <App /> 
    </ThemeProvider>
  </StrictMode>,
)
