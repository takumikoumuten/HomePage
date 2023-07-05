import React, { PropsWithChildren } from "react"

import { Route, routeToLink } from "../routes"
import classNames from "classnames"
import { LinkWrapper } from "./linkButton"

const Breadcrumb = ({
  path,
  className,
}: {
  path: { link: Route | null; title: string }[]
  className: string
}): React.ReactElement => {
  return (
    <div
      className={classNames([
        "grid items-center grid-flow-col place-content-start",
        className,
      ])}
    >
      {path.map((item, index) => {
        const Wrapper = ({
          children,
          className,
        }: PropsWithChildren<{ className: string }>) =>
          item.link === null ? (
            <div className={className}>{children}</div>
          ) : (
            <LinkWrapper
              link={routeToLink(item.link)}
              className={classNames([
                className,
                "text-[#01984c] underline hover:opacity-60 transition-all duration-700 ",
              ])}
            >
              {children}
            </LinkWrapper>
          )
        return (
          <span
            key={index}
            className="grid items-center grid-flow-col place-items-start"
          >
            {<Wrapper className="text-xs ml-2">{item.title}</Wrapper>}
            {index < path.length - 1 && (
              <div className="text-xs ml-2"> {">"} </div>
            )}
          </span>
        )
      })}
    </div>
  )
}

export default Breadcrumb
