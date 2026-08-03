# Next Steps to Go Live

## 1. Set environment variables in Vercel

Go to [Vercel Project Settings → Environment Variables](https://vercel.com/anselmeM/ChildernforLife.com/settings/environment-variables) and add:

| Key | Description | Required |
|---|---|---|
| `STRIPE_SECRET_KEY` | Your Stripe secret key from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys). Enables donations, receipt emails, and the donor portal. | Yes |
| `RESEND_API_KEY` | Your Resend API key from [resend.com/api-keys](https://resend.com/api-keys). Enables the contact form, donation receipts, and the newsletter. | Yes |
| `RESEND_AUDIENCE_ID` | Your Resend **audience** ID (Newsletter list). Create one at [resend.com/audiences](https://resend.com/audiences) — needed for the footer newsletter signup. | Yes |
| `VITE_SENTRY_DSN` | Your Sentry DSN from [sentry.io](https://sentry.io) (optional — error monitoring) | No |

## 2. Verify the social sharing image ✅

`public/og-image.png` (1200×630) now ships with the site and is the default OG image.
Regenerate it anytime with `python scripts/generate-og-image.py`.

## 3. Verify analytics

The site includes Plausible Analytics (`plausible.io`). Either:

- Register at [plausible.io](https://plausible.io) and verify the `childrenforlife.com` domain, **or**
- Remove the `<script defer data-domain="childrenforlife.com" src="https://plausible.io/js/script.js">` line from `index.html` if not using Plausible

## 4. Donation receipts & donor portal (new)

- `POST /api/send-receipt` emails a branded donation receipt via Resend after a successful
  Stripe checkout (triggered from `/donate/success`). The amount/email are read from the
  Stripe session server-side — never trusted from the client.
- `POST /api/create-portal-session` opens the Stripe **Customer Portal** so monthly donors
  can update or cancel their recurring gift.
- **Action**: in the Stripe Dashboard, confirm your branding, and (recommended) enable
  Stripe's built-in receipts for one-time payments as a fallback: Settings → Customer emails.

## 5. Verify the newsletter (new)

The footer newsletter signup (`POST /api/subscribe`) adds subscribers to your Resend
audience and sends a welcome email. Create an audience in
[Resend → Audiences](https://resend.com/audiences), copy its ID into `RESEND_AUDIENCE_ID`,
and submit the footer form to confirm the welcome email arrives.

## 6. Campaigns & matching gifts (new)

- Campaign pages (`/campaigns`, `/campaigns/:slug`) show progress bars from
  `src/data/campaigns.js`. Update `raised`/`goal` there as donations come in — or, once
  Stripe is live, sum payments by the `campaign` metadata that checkout attaches.
- The employer matching-gift form (`POST /api/matching-gift`) emails requests to
  `info@childrenforlife.com`. Confirm the sending address (`contact@childrenforlife.com`)
  is verified in Resend.

## 7. Deploy

The site auto-deploys to Vercel on every push to `master`. Check deployment status at
[Vercel Dashboard](https://vercel.com/anselmeM/ChildernforLife.com). After deploying, test
a live donation with a Stripe [test card](https://docs.stripe.com/testing) (4242 4242 4242 4242)
to confirm receipts and the portal work end-to-end.
