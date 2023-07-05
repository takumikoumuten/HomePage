import {
  useRef,
  useEffect,
  useCallback,
  useState,
  MutableRefObject,
} from "react"

const useScrollAnimation = <Ref extends HTMLElement>() => {
  const [isVisible, setIsVisible] = useState(false)
  const domRef: MutableRefObject<Ref | null> = useRef<Ref>(null)

  const callbackFunction: IntersectionObserverCallback = useCallback(
    entries => {
      const [entry] = entries
      setIsVisible(entry.isIntersecting)
    },
    []
  )

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction)
    const currentDomRef = domRef.current

    if (currentDomRef) {
      observer.observe(currentDomRef)
    }

    return () => {
      if (currentDomRef) observer.unobserve(currentDomRef)
    }
  }, [callbackFunction])

  return [domRef, isVisible] as const
}

export default useScrollAnimation
