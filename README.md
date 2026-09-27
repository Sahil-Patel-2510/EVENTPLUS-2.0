# Event Plus

A polished event-planning website with login, registration, enquiry forms, and zero-database storage. This project is ready for direct GitHub Pages deployment.

## GitHub Pages / direct link setup

1. Upload the project files to a GitHub repository.
2. In GitHub, open the repository and enable GitHub Pages.
3. Use the root folder as the published source (or a docs folder if you prefer).
4. Open the generated GitHub Pages URL.

No MongoDB, no server connection, and no `.env` setup are required for the browser flow. User data and enquiry data are stored directly in the browser using browser `localStorage`.

## Local Node setup (optional)

1. Install dependencies:
   npm install

2. Start the server:
   npm start

3. Open the app:
   http://localhost:5000

All data still stays local and no external database is required.

## OTP setup

Orders require OTP verification on the submitted email and mobile number. Add an SMTP account and either the provider API settings or Twilio settings to `.env` before using order confirmation:

   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-smtp-user
   SMTP_PASSWORD=your-smtp-password
   SMTP_FROM=Event Plus <no-reply@example.com>
   OTP_API_URL=https://your-otp-provider.example/send
   OTP_API_KEY=your-server-side-api-key
   TWILIO_ACCOUNT_SID=your-account-sid
   TWILIO_AUTH_TOKEN=your-auth-token
   TWILIO_FROM=+10000000000

The OTP expires after 10 minutes. For local development only, the app also allows a fallback OTP flow unless `OTP_DEV_MODE=false`.

## API endpoints

- POST /api/register
- POST /api/login
- POST /api/enquiry
- POST /api/send-otp
- POST /api/verify-otp
- GET /api/health
