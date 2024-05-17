import { decode } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
interface AuthorizedUsers {
  [route: string]: string[]; // Index signature
}
const protectedRoutes = [
  "/CreateCampaign",
  "/UserProfile",
  "/admin"
];
const authorizedUsers: AuthorizedUsers = {
  "/UserProfile": ["User"],
  "/admin": ["Admin"],
};

export default function middleware(req: NextRequest) {
  const cookies = req.cookies.get("token");
  const token = cookies?.value;
  /// console.log(token, ">>>>>>>>>>>>>>>>>>>>>>>>>>");

  if (token) {
    try {
      const decodedToken: any = decode(token);
      // console.log(decodedToken, ">>>???>>");
      const isLoggedIn = decodedToken.id && decodedToken.role ? true : false;
      const userRole = decodedToken.role;

      if (!isLoggedIn) {
        const loginUrl = new URL("/signin", req.nextUrl.origin);
        return NextResponse.redirect(loginUrl.toString());
      }

      const requestedRoute = req.nextUrl.pathname;
      if (protectedRoutes.includes(requestedRoute)) {
        const authorizedRoles = authorizedUsers[requestedRoute];

        if (authorizedRoles && !authorizedRoles.includes(userRole)) {
          const notAuthorizedUrl = new URL("/", req.nextUrl.origin);
          return NextResponse.redirect(notAuthorizedUrl.toString());
        }
      }else if (
        protectedRoutes.some((route) => requestedRoute.startsWith(route))
      ) {
        if (
          userRole === "user" &&
         ( requestedRoute === "/UserProfile/campaigns"|| requestedRoute === "/UserProfile/contibutions" )
        ) {
          return NextResponse.next();
        }
        if (
          userRole === "Admin" &&
         ( requestedRoute === "/admin/campaigns"|| requestedRoute === "/admin/users" )
        ) {
          return NextResponse.next();
        }
        if (userRole !== "Admin" ) {
          const loginUrl = new URL("/signin", req.nextUrl.origin);
          return NextResponse.redirect(loginUrl.toString());
        }
        if ( (userRole === "Admin" && requestedRoute.startsWith("/UserProfile")  )) {
          const notAuthorizedUrl = new URL("/", req.nextUrl.origin);
          return NextResponse.redirect(notAuthorizedUrl.toString());
        }
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else if (
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    const loginUrl = new URL("/signin", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl.toString());
  }

  return NextResponse.next();
}
