import { isStringContain } from "./functions.js"
import keywords from './keywords.json'

describe('testing isStringConatin :',()=>{

  test(`test if paraghraph contain any of keywords`, () => {
    const paraghraph = 'Rédacteur web / journaliste (h-f) - stage rémunéré'
    const result = isStringContain(paraghraph, keywords)
    expect(result).toBe(true)
  })
  
  test(`test if paraghraph contain none of keywords`, () => {
    const paraghraph = 'Rédacteur / journaliste (h-f) - stage rémunéré'
    const result = isStringContain(paraghraph, keywords)
    expect(result).toBe(false)
  })
  
  test(`test if empty return false`, () => {
    const paraghraph = ''
    const result = isStringContain(paraghraph, keywords)
    expect(result).toBe(false)
  })
  
  test(`test if non string inputs return false`, () => {
    const paraghraph = 666
    const result = isStringContain(paraghraph, keywords)
    expect(result).toBe(false)
  })
  
})