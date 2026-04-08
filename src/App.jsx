import { ThemeProvider } from './context/ThemeContext'
import AppRoutes from './routes/AppRoutes'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
            <AppRoutes />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  )
}

export default App

