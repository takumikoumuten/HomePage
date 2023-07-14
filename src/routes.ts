export type Route =
  | {
      tag:
        | "/"
        | "/company"
        | "/contact"
        | "/sitemap"
        | "/privacy-policy"
        | "/contact-success"
    }
  | {
      tag: "/news"
      title: string | null
    }
  | {
      tag: "/business"
      section: "example" | null
    }

export const toRoute = (pathname: string): Route | null => {
  switch (pathname) {
    case "/":
    case "/company":
    case "/contact":
    case "/sitemap":
    case "/contact-success":
    case "/privacy-policy":
      return { tag: pathname }
    default:
      const newsResult = /\/news(\/([^/]+)?)?$/.exec(pathname)
      const businessResult = /\/business(#example)?$/.exec(pathname)
      if (newsResult) return { tag: "/news", title: newsResult[1] ?? null }
      if (businessResult)
        return {
          tag: "/business",
          section: businessResult[2] ? "example" : null,
        }
      return null
  }
}

export const routeToLink = (
  route: Route
): { link: string; section: string | null } => {
  switch (route.tag) {
    case "/":
    case "/company":
    case "/contact":
    case "/sitemap":
    case "/contact-success":
    case "/privacy-policy":
      return { link: route.tag, section: null }
    case "/news":
      if (route.title === null) return { link: `${route.tag}`, section: null }
      return { link: `${route.tag}/${route.title}`, section: null }
    case "/business":
      if (route.section === null) return { link: `${route.tag}`, section: null }
      return { link: `${route.tag}`, section: route.section }
  }
}
