import { graphql, useStaticQuery } from "gatsby"
import { IGatsbyImageData, getImage } from "gatsby-plugin-image"
import React, { PropsWithChildren } from "react"
import Logo from "./logo"

const Hero = ({
  image,
  children,
  type,
}: PropsWithChildren<{
  type: "large" | "small"
  image?: IGatsbyImageData
}>): React.ReactElement => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${image?.images.fallback?.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          minHeight: `calc(${type === "large" ? "100" : "20"}svh - 96px)`,
        }}
      >
        {children}
      </div>
    </>
  )
}

export default Hero
