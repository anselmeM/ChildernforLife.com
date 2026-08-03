# Next Steps to Go Live

## 1. Set environment variables in Vercel

Go to [Vercel Project Settings → Environment Variables](https://vercel.com/anselmeM/ChildernforLife.com/settings/environment-variables) and add:

| Key | Description | Required |
|---|---|---|
| `STRIPE_SECRET_KEY` | Your Stripe secret key from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys) | Yes |
| `RESEND_API_KEY` | Your Resend API key from [resend.com/api-keys](https://resend.com/api-keys) | Yes |
| `VITE_SENTRY_DSN` | Your Sentry DSN from [sentry.io](https://sentry.io) (optional — error monitoring) | No |

## 2. Add a social sharing image

Create a **1200×630** PNG image and save it to `public/og-image.png`. This is the image shown when the site is shared on Facebook, Twitter, LinkedIn, and other social platforms.

## 3. Verify analytics

The site includes Plausible Analytics (`plausible.io`). Either:

- Register at [plausible.io](https://plausible.io) and verify the `childrenforlife.com` domain, **or**
- Remove the `<script defer data-domain="childrenforlife.com" src="https://plausible.io/js/script.js">` line from `index.html` if not using Plausible

## 4. Deploy

The site auto-deploys to Vercel on every push to `master`. Push is already done — Vercel will pick up the latest commit (`5a56e11`). Check deployment status at [Vercel Dashboard](https://vercel.com/anselmeM/ChildernforLife.com).
