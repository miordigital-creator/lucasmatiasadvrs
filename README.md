# Lucas Matias Advocacia — Landing Page

Site estático do escritório Lucas Matias Advocacia (Porto Alegre/RS).

## Como publicar no GitHub Pages

1. Envie estes arquivos para o repositório (branch `main`).
2. No GitHub, abra **Settings → Pages**.
3. Em **Source**, escolha **Deploy from a branch**.
4. Em **Branch**, selecione `main` e a pasta **/ (root)**. Salve.
5. Em alguns minutos o site estará no ar em `https://<usuario>.github.io/<repositorio>/`.

## Estrutura

- `index.html` — página inicial (é o que o GitHub Pages abre na raiz)
- `404.html` — cópia da página inicial; o GitHub Pages a exibe para endereços inexistentes
- `.nojekyll` — impede o GitHub de processar os arquivos com Jekyll
- `assets/` — scripts, estilos e o logotipo
- `favicon.png` — ícone da aba do navegador
- `robots.txt` — orientações para mecanismos de busca
- `_shell.html` e `.htaccess` — versão para hospedagem Apache (não são usados pelo GitHub Pages)

## Observação

A seção "Conte seu caso" (resumo com IA) depende de um servidor e **não funciona em hospedagem estática** como o GitHub Pages. O restante da página, incluindo todos os botões de WhatsApp, funciona normalmente.
