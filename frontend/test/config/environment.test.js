import { vi, describe, test, expect } from 'vitest'
import { enableMocking } from '../../src/config/environment'
import { worker } from '../../mocks/browser'

vi.mock('../../mocks/browser', () => ({ worker: { start: vi.fn() } }))

describe('enableMocking', () => {
  test('Starts the mock service worker in development environment', async () => {
    process.env.NODE_ENV = 'development'
    await enableMocking()
    expect(worker.start).toHaveBeenCalled()
  })

  test('Does not start the mock service worker in production environment', async () => {
    process.env.NODE_ENV = 'production'
    await enableMocking()
    expect(worker.start).not.toHaveBeenCalled()
  })
})
