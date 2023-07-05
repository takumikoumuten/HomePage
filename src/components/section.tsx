import React, { PropsWithChildren } from "react"
import classNames from "classnames"
import SlideIn from "./slideIn"

const Section = ({
  className,
  isVisible,
  contentRef,
  title,
  children,
  fadeInFrom,
}: PropsWithChildren<{
  contentRef: React.LegacyRef<HTMLDivElement>
  isVisible: boolean
  className: string
  title:
    | { tag: "bilingual"; english: string; japanese: string }
    | { tag: "monolingual"; content: string }
  fadeInFrom?: "left" | "right"
}>): React.ReactElement => {
  return (
    <>
      <SlideIn
        className={classNames([className, "grid"])}
        contentRef={contentRef}
        isVisible={isVisible}
        slideInFrom={fadeInFrom ?? "left"}
      >
        {title.tag === "bilingual" ? (
          <>
            <div className="text-3xl text-center">{title.english}</div>
            <div className="mt-4 text-center">{title.japanese}</div>
          </>
        ) : (
          <>
            <div className="text-3xl text-center">{title.content}</div>
          </>
        )}
        {children}
      </SlideIn>
    </>
  )
}

export default Section
