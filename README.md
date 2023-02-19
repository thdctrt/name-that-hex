# Name that HEX!

### Specific yet funny app to get a name for the color based on OpenAI API

### [Demo](https://namethathex.vercel.app)

Sometimes you need a specific name for the color. For example, if you have a lot of `Blue` colors in project and you need to differentiate them. 

*Name that HEX!* relieves you of the task of inventing a creative and understandable name — it uses `da-vinci` Text AI by OpenAI and comes up with a name for every custom color you need to name. Colors already preformatted in CamelCase so you will be able to seamlessy use them in Figma and JS code both.

## Run Locally
```bash
pnpm i
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Thanks to
- [@mustafa-turk](https://github.com/mustafa-turk/where-next) for button apporoach inspiratino
- [@masonyekta](https://github.com/masonyekta/nextjs-openai-text-to-color) for API inspiration and stuff

Works on [Next.js](https://nextjs.org/), uses [styled-components] (https://github.com/styled-components/styled-components) for styling and TinyColor Library (https://github.com/bgrins/TinyColor) for some functions.
