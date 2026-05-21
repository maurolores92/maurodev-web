const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
const fs = require("fs");

const date = new Date().toISOString();
// An array with your links
const links = [
  { url: "/", changefreq: "daily", lastmod: date, priority: 1 },
  // Agrega más URLs aquí si es necesario
];

// Create a stream to write to
const stream = new SitemapStream({ hostname: "https://maurodev.online" });

// Return a promise that resolves with your XML string
streamToPromise(Readable.from(links).pipe(stream))
  .then((data) => {
    const sitemap = data.toString();
    fs.writeFileSync("./dist/sitemap.xml", sitemap);
  })
  .catch((err) => {
    console.error("Error generating sitemap:", err);
  });
