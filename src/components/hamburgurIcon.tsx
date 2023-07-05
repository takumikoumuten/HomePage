import classNames from "classnames"
import React, { HTMLProps } from "react"

const HamburgerIcon = ({
  expanded,
  size,
  className,
  style,
  barClassName,
  ...rest
}: {
  expanded: boolean
  size: number
  barClassName?: string
} & HTMLProps<HTMLDivElement>) => {
  const barHeight = size / 12
  const barPosition1 = (size * 1) / 6
  const barPosition2 = (size * 5) / 6
  const translateYValue1 = size / 2 - (barPosition1 + barHeight / 2)
  const translateYValue2 = size / 2 - (barPosition2 + barHeight / 2)

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      className={classNames(["relative", className])}
      {...rest}
    >
      <div
        style={{
          top: `${barPosition1}px`,
          height: `${barHeight}px`,
          transform: expanded
            ? `translateY(${translateYValue1}px) rotate(-45deg)`
            : "none",
        }}
        className={classNames([
          "absolute left-0 w-full rounded-full transform-gpu origin-center transition-all duration-300",
          barClassName ?? "",
        ])}
      ></div>
      <div
        style={{ height: `${barHeight}px`, opacity: expanded ? 0 : 1 }}
        className={classNames([
          "absolute top-1/2 left-0 w-full rounded-full transform-gpu origin-center transition-all duration-300",
          barClassName ?? "",
        ])}
      ></div>
      <div
        style={{
          top: `${barPosition2}px`,
          height: `${barHeight}px`,
          transform: expanded
            ? `translateY(${translateYValue2}px) rotate(45deg)`
            : "none",
        }}
        className={classNames([
          "absolute left-0 w-full rounded-full transform-gpu origin-center transition-all duration-300",
          barClassName ?? "",
        ])}
      ></div>
    </div>
  )
}

export default HamburgerIcon
