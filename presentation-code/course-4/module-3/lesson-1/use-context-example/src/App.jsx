import { createContext, useContext, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('sunrise')

  const palette = theme === 'sunrise'
    ? {
        name: 'Sunrise',
        background: 'linear-gradient(135deg, #fff4d6 0%, #ffc76d 100%)',
        surface: 'rgba(255, 255, 255, 0.75)',
        text: '#2e1f12',
        accent: '#c95800',
      }
    : {
        name: 'Forest',
        background: 'linear-gradient(135deg, #d8f3dc 0%, #74c69d 100%)',
        surface: 'rgba(12, 40, 29, 0.78)',
        text: '#f4fff7',
        accent: '#95d5b2',
      }

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      palette,
    }),
    [theme, palette],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return context
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="switcher">
      <button
        className={theme === 'sunrise' ? 'active' : ''}
        onClick={() => setTheme('sunrise')}
      >
        Sunrise
      </button>
      <button
        className={theme === 'forest' ? 'active' : ''}
        onClick={() => setTheme('forest')}
      >
        Forest
      </button>
    </div>
  )
}

function HeaderCard() {
  const { palette } = useTheme()

  return (
    <section className="hero card" style={{ color: palette.text, background: palette.surface }}>
      <p className="eyebrow">React Context Example</p>
      <h1>useContext shares state without prop drilling.</h1>
      <p>
        The selected theme lives once in a provider, then any child component can read it
        with a custom hook.
      </p>
      <ThemeSwitcher />
    </section>
  )
}

function StatusCard() {
  const { palette, theme } = useTheme()

  return (
    <section className="card" style={{ color: palette.text, background: palette.surface }}>
      <h2>Current Context Value</h2>
      <p>
        Theme key: <strong>{theme}</strong>
      </p>
      <p>
        Palette label: <strong>{palette.name}</strong>
      </p>
      <div className="swatch-row">
        <span className="swatch" style={{ background: palette.accent }} />
        <span>Accent color is coming from the same shared context object.</span>
      </div>
    </section>
  )
}

function DeepChild() {
  const { palette } = useTheme()

  return (
    <div className="deep-child" style={{ borderColor: palette.accent }}>
      <p>Deep child component</p>
      <strong>This component reads context directly, no props required.</strong>
    </div>
  )
}

function NestedPanel() {
  const { palette } = useTheme()

  return (
    <section className="card" style={{ color: palette.text, background: palette.surface }}>
      <h2>Nested Tree</h2>
      <p>
        This panel simulates a deeper component tree. The nested child still gets the shared
        theme through context.
      </p>
      <DeepChild />
    </section>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  )
}

function Page() {
  const { palette } = useTheme()

  return (
    <main className="page" style={{ background: palette.background }}>
      <div className="layout">
        <HeaderCard />
        <StatusCard />
        <NestedPanel />
      </div>
    </main>
  )
}