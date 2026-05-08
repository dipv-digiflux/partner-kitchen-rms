import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { seoConfig } from "@/config/seo";

function pathToRegex(routePath: string): RegExp {
  if (routePath === "*") {
    return /^.*$/;
  }

  const escaped = routePath
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\/:([^/]+)/g, "/[^/]+");

  return new RegExp(`^${escaped.replace(/\/+$/, "")}/?$`);
}

export function SeoRouteManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const matchedRoute = seoConfig.routeMeta.find((route) => pathToRegex(route.path).test(pathname));
    const routeTitle = matchedRoute?.title ?? seoConfig.defaultTitle;
    document.title = `${routeTitle} | ${seoConfig.siteName}`;
  }, [pathname]);

  return null;
}
