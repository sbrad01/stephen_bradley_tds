## Getting Started

Create and .env.local file based off the env.template file at the root level

Create an account with currency-beacon and paste your api key in your new .env.local file.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Design followed

Given this is a frontend role, I wanted to take a look at the UI and basing it on a live wesbite. This was my design source: https://www.xe.com.

## Decisions

- Used next.js as this is the recommened default. This then installs all tailwinds and a basic folder structure automatically.
- The last company I worked for we used language selection and have incorporated this as an added feature.
- This is a basic application but have still followed some principles of separating the client logic from the business logic. Created a services folder which is simply there for the client side to call API. That endpoint then calls the third party API. This means we have a secure env variable in the server side. Also means we can easily swap out service calls in the future or change the business logic with minimum
- Formatted the values to be localised text to be more user friendly.
- Disabled the "to currency" for time reasons but you could develop further so that when a user inputs in the to input it recalculates the from value.

## Improvements

- With more time and context, would look at caching the rates calls server side ideally.
- Tried to make it as dry as possible but there is probably a few other instances that could be better.
