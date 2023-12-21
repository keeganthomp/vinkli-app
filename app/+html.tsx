export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta name="apple-itunes-app" content="app-id=6473663181" />

        {/* Other head elements... */}
      </head>
      <body>{children}</body>
    </html>
  );
}
