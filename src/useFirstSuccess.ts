import { useState, useEffect } from "react"

function useFirstSuccess(currentSuccess: boolean): boolean {
  const [firstSuccess, setFirstSuccess] = useState(false)

  useEffect(() => {
    if (currentSuccess && !firstSuccess) {
      setFirstSuccess(true)
    }
  }, [currentSuccess, firstSuccess])

  return firstSuccess
}

export default useFirstSuccess
