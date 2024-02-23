import { useState } from 'react'

const useSteps = (maxStep: number, initialStep?: number) => {
  const [step, setStep] = useState(initialStep || 1)

  return {
    step,
    nextStep: () => maxStep !== step && setStep(prev => prev + 1),
    backStep: () => step !== 1 && setStep(prev => prev - 1),
  }
}

export default useSteps
