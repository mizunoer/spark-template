# Email forms on cPanel (Namecheap)

The site sends mail via **`php/form_process.php`** using PHP’s **`mail()`** function.

## What was wrong if the page “just reloaded”

If **`js/submit-form.js`** had a JavaScript error, the browser fell back to a **normal form submit** (full page reload) and you would **not** see the green toast. Fix: deploy the latest `submit-form.js` and hard-refresh (Ctrl+F5).

## Where mail goes

- **Inbox:** `dev@mythic-rx.com` (set in `form_process.php` as `$mailTo`)
- **From header (visible to recipients):** `info@mythic-rx.com` (must match your domain for most hosts)
- **Reply-To:** the visitor’s email (so you can reply directly)

## Is `mail()` “enabled” on cPanel?

PHP **`mail()`** is usually **already available** on Namecheap shared hosting. It is **not** the same as `mailto:` links in HTML.

You still need:

1. **PHP hosting** — the live site must run `.php` files (not pure static hosting only).
2. **`form_process.php` uploaded** to `public_html/.../php/` (same path the site uses: `php/form_process.php`).
3. **MX / email** — `dev@mythic-rx.com` and `info@mythic-rx.com` should exist in cPanel **Email Accounts** (or forwards) so you can receive messages.

## If mail still doesn’t arrive

- **Spam / Junk** folder for `dev@mythic-rx.com`
- cPanel → **Track Delivery** or **Email Deliverability** (SPF/DKIM for your domain)
- Some hosts block `mail()` from arbitrary `From:` addresses; we use **`info@mythic-rx.com`** on your domain to reduce bounces
- For production, many teams switch to **SMTP** (PHPMailer + real SMTP credentials) instead of raw `mail()` — your host’s docs often describe this

## Quick test

1. Browser **DevTools → Network** → submit the form → look for **`form_process.php`** → response body should be **`success`** (plain text).
2. If you get **404**, PHP isn’t at that URL or the file isn’t deployed.
3. If response is **`error`**, `mail()` failed on the server — check cPanel error logs or ask Namecheap support about outbound mail limits.
