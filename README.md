This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started



First, make sure you have the necessary environment variables set up. Create a .env file in the root directory of your project and add the following:
```bash
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000/api/auth/"
PORT=4000
```
Replace your-google-client-id and your-google-client-secret with your actual Google client ID and secret. You can obtain these by setting up a new OAuth 2.0 Client ID in the Google Cloud Console (https://console.cloud.google.com/). Make sure to add http://localhost:3000/api/auth/callback/google as an authorized redirect URI in your Google OAuth 2.0 client settings.

Choose a secure value for your-nextauth-secret. This is used to encrypt the NextAuth.js JWT tokens.

Insall dependencies:

```npm install```

Next, run the Express server on port 4000:

```npm run express```

In a separate terminal, run the development server for Next.js:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


