import { useState, useEffect } from "react"

export function useScrollPosition(targetPosition: number) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset
      setIsScrolled(currentScrollPosition >= targetPosition)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [targetPosition])

  return isScrolled
}
