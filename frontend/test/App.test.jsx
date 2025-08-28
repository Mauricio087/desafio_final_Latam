import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('App render', () => {
  test('Should render the App component', () => {
    render(<App />)

    expect(screen).toBeTruthy()
    expect(screen.getByText('Proyecto Frontend Base')).toBeInTheDocument()
  })
})
