import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      // Replace with your own Clerk Issuer URL from your "convex" JWT template
      // or with `process.env.CLERK_JWT_ISSUER_DOMAIN`
      // and configure CLERK_JWT_ISSUER_DOMAIN on the Convex Dashboard
      // See https://docs.convex.dev/auth/clerk#configuring-dev-and-prod-instances

      domain: "https://helping-tarpon-75.clerk.accounts.dev",
      // domain: "https://upward-insect-1.clerk.accounts.dev",
      applicationID: "convex",
    },
  ]
} satisfies AuthConfig;