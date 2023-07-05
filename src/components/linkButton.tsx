import React, { PropsWithChildren } from "react"
import { Route, routeToLink } from "../routes"
import { Link } from "gatsby"
import classNames from "classnames"

export const LinkWrapper = ({
  children,
  className,
  link,
}: PropsWithChildren<{
  link: { link: string; section: string | null }
  className: string
}>) =>
  link.section === null ? (
    <Link to={link.link} className={className}>
      {children}
    </Link>
  ) : (
    <a href={`${link.link}#${link.section}`} className={className}>
      {children}
    </a>
  )

export const LinkButton = ({
  title,
  className,
  to,
  type,
}: {
  title: string
  className: string
  to: Route
  type: "normal" | "inverse"
}): React.ReactElement => {
  const linkClassName = classNames([
    "border rounded-md border-[#01984c] hover:border-opacity-60 transition-all duration-700 hover:text-opacity-60 text-center py-2",
    type === "normal" ? "text-[#01984c] bg-white" : "text-white bg-[#01984c]",
    className,
  ])
  const route = routeToLink(to)
  return (
    <>
      <LinkWrapper className={linkClassName} link={route}>
        {title}
      </LinkWrapper>
    </>
  )
}
