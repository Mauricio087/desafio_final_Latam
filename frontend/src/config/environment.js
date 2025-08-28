export const enableMocking = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { worker } = await import('../../mocks/browser')
  return worker.start()
}
