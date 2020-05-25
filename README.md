# newtechs

## Next.js: The React Framework

Enter Next.js, the React Framework. Next.js provides a solution to all of the above problems. But more importantly, it puts you and your team in the pit of success when building React applications.

Next.js has the best-in-class "Developer Experience" and many built-in features; a sample of them are:

An intuitive page-based routing system (with support for dynamic routes)
Pre-rendering, both static generation (SSG) and server-side rendering (SSR) are supported on a per-page basis
Automatic code splitting for faster page loads
Client-side routing with optimized prefetching
Built-in CSS and Sass support, and support for any CSS-in-JS library
Development environment which supports Hot Module Replacement
API routes to build API endpoints with Serverless Functions
Fully extendable
Next.js is used in tens of thousands of production-facing websites and web applications, including many of the world's largest brands.

```
  npx create-next-app appname
  cd appname
  yarn dev

```

## Pages in Next.js

- Pages are associated with a route based on their file name.
- Simply create a JS file under the pages directory, and the path to the file becomes the URL path.

## Link Component

- When linking between pages on websites you generally use the <a> HTML tag.

- In Next.js, you use the <Link> React Component that wraps the <a> tag. <Link> allows you to do client-side navigation to a different page in the application.

- The Link component enables client-side navigation between two pages in the same Next.js app.

- Client-side navigation means that the page transition happens using JavaScript, which is faster than the default navigation done by the browser.

- Next.js automatically optimizes your application for the best performance by code splitting, client-side navigation, and prefetching (in production).

You create routes as files under pages and use the built-in Link component. No routing libraries are required.

## Note:

Note: If you need to link to an external page outside the Next.js app, just use an <a> tag without Link.

If you need to add attributes like, for example, className, add it to the a tag, not to the Link tag.

## Assets

First, let’s talk about how Next.js handles static assets such as images.

Next.js can serve static files, like images, under the top-level public directory. Files inside public can be referenced from the root of the application similar to pages.
