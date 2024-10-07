import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// after each test, afterEach
// is executed and resets jsdom
afterEach(() => {
  cleanup()
})

// Test file location:
// - two common conventions: store them in...
//   1: same directory as component that is being tested
//   2: a seperate test directory
// - we do option 1 bc this is the default config of Vite apps