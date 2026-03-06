# Antigravity App

## Start the app

This project runs with a Node server (website + SMTP API) from the project folder:

```bash
npm install
npm start

or

npx serve . -p 8080
```

Then open:

- http://localhost:5500/

## Alternative (auto-reload)

```bash
npx nodemon server.js
```

## Stop the server

In the terminal where the server is running, press:

- `Ctrl + C`

## Newsletter SMTP setup

The newsletter form posts to `/api/newsletter`, and the backend sends the email through SMTP.

1. Copy `.env.example` to `.env`
2. Fill SMTP values in `.env`:
	- `SMTP_HOST`
	- `SMTP_PORT`
	- `SMTP_USER`
	- `SMTP_PASS`
	- `SMTP_FROM`
	- optional `NEWSLETTER_TO` (default is `newletter@andres.ch`)
3. Keep [trackteamdenmark/config.js](trackteamdenmark/config.js) endpoint as:
	- `apiEndpoint: '/api/newsletter'`

After configuration, newsletter registrations are sent through your SMTP server.
