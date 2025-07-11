import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import reportWebVitals from './reportWebVitals'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import App from './App'
import { SnackbarProvider } from 'notistack'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      maxSnack={3}
      autoHideDuration={4000}
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
