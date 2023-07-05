import classNames from "classnames"
import { graphql, navigate, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { HTMLProps } from "react"
import { routeToLink } from "../routes"

const Logo = ({
  className,
  type,
  ...rest
}: HTMLProps<HTMLDivElement> & {
  type: "big" | "small"
}) => {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
        }
      }
      logoSmall: file(relativePath: { eq: "logo_small.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
        }
      }
    }
  `)

  const logo = getImage(data.logo)
  const logoSmall = getImage(data.logoSmall)
  const onClick = (): void => {
    navigate(routeToLink({ tag: "/" }).link)
  }
  return (
    <>
      <div
        className="hover:opacity-80 transition-all duration-500 hover:cursor-pointer"
        {...rest}
        onClick={onClick}
      >
        {logo && logoSmall && (
          <GatsbyImage
            image={type === "small" ? logoSmall : logo}
            alt="logo"
            className={classNames([
              type === "small" ? "h-14 w-14" : "h-40 w-40",
              "bg-transparent",
            ])}
          />
        )}
      </div>
    </>
  )
}

export default Logo
