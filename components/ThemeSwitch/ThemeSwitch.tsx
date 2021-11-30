import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === 'system' ? systemTheme : theme

  const renderThemeChanger = () => {
    if (!mounted) return null

    if (currentTheme === 'dark') {
      return (
        <SunIcon
          className='w-7 h-7'
          role='button'
          onClick={() => setTheme('light')}
        />
      )
    } else {
      return (
        <MoonIcon
          className='w-7 h-7'
          role='button'
          onClick={() => setTheme('dark')}
        />
      )
    }
  }

  return (
    <div className='sidebar-icon group'>
      {renderThemeChanger()}
      <span className='sidebar-tooltip group-hover:scale-100'>
        {currentTheme === 'dark'
          ? 'Switch to light mode'
          : 'Switch to dark mode'}
      </span>
    </div>
  )
}

export default ThemeSwitch
