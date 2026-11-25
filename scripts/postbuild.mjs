// Gera em dist/ um site estático pronto para hospedagem compartilhada (KingHost/Apache).
import { cpSync, rmSync, readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
const client = "dist/client";
if (!existsSync(`${client}/_shell.html`)) { console.error("dist/client/_shell.html não encontrado"); process.exit(1); }
for (const f of readdirSync("dist")) if (f !== "client" && f !== "server") rmSync(`dist/${f}`, { recursive: true, force: true });
cpSync(client, "dist", { recursive: true });
const html = readFileSync("dist/_shell.html", "utf8");
writeFileSync("dist/index.html", html);
writeFileSync("dist/404.html", html);
writeFileSync("dist/.htaccess", `DirectoryIndex index.html
Options -Indexes
RewriteEngine On
RewriteBase /
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
<IfModule mod_headers.c>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
  <FilesMatch "\\.(js|css|png|webp|jpg|svg|woff2)$">
    Header set Cache-Control "public, max-age=31536000"
  </FilesMatch>
</IfModule>
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>
`);
rmSync("dist/client", { recursive: true, force: true });
rmSync("dist/server", { recursive: true, force: true });
// index.html da raiz: cópia que aponta para dist/ (referência; publique o conteúdo de dist/)
writeFileSync("index.html", html.replace(/(href|src)="\/(?!\/)/g, '$1="./dist/'));
console.log("dist/ pronto para KingHost");
