import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    watch: false,
    root: './', // Define la raíz del proyecto para las pruebas.
    dir: './test', // Define el directorio donde buscar archivos de test.
    coverage: {
      enabled: true,
      provider: 'v8',
      reportsDirectory: './coverage', // Define el directorio donde se guardarán los reportes de cobertura generados.
      reporter: ['text', 'html'],
      include: ['**/src/**'],
      exclude: [] // Excluye archivos y carpetas del cálculo de cobertura.
    },
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
    verbose: true
  }
}))
