import classNames from "classnames"
import React, { PropsWithChildren } from "react"
import useFirstSuccess from "../useFirstSuccess"

const SlideIn = ({
  className,
  contentRef,
  slideInFrom,
  isVisible,
  children,
}: PropsWithChildren<{
  contentRef: React.LegacyRef<HTMLDivElement>
  isVisible: boolean
  className: string
  slideInFrom: "left" | "right"
}>): React.ReactElement => {
  const isFirstVisible = useFirstSuccess(isVisible)
  return (
    <>
      <div
        className={classNames([
          className,
          {
            "animate-slow-slide-fade-in-left":
              isFirstVisible && slideInFrom === "left",
          },
          {
            "animate-slow-slide-fade-in-right":
              isFirstVisible && slideInFrom === "right",
          },
        ])}
        ref={contentRef}
      >
        {children}
      </div>
    </>
  )
}
export default SlideIn
