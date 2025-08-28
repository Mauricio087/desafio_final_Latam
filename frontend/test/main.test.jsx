import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { act } from 'react'

describe('Main entrypoint rendering', () => {
  test('Should mount the components', async () => {
    const root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)

    await act(async () => {
      await import('../src/main')
    })

    expect(screen).toBeTruthy()
  })
})
