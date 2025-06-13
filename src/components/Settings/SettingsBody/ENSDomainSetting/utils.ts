export const generateRedirectHtml = (targetUrl: string) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="refresh" content="0; url=${targetUrl}" />
    <title>Redirecting...</title>
  </head>
  <body>
    <p>Redirecting to <a href="${targetUrl}">${targetUrl}</a></p>
  </body>
</html>`
}
