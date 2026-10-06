# Petshop — PetShop App

App React Native (Expo) com Firebase Authentication, navegação por abas e notificações locais.

## Integrantes
- Nome 1
- Nome 2
- Nome 3

## Como rodar

Pré-requisito: [Node.js LTS](https://nodejs.org) instalado.

1. Abra o terminal **dentro da pasta do projeto** (onde está o `package.json`) e instale as dependências:
   ```
   npm install
   npx expo install --fix
   ```
   O segundo comando ajusta cada pacote para a versão exata compatível com o Expo.
2. No Firebase Console: crie o projeto, registre um app **Web** e copie o `firebaseConfig` para `src/config/firebase.js`.
3. Em **Authentication > Sign-in method**, ative **E-mail/senha**.
4. Inicie o projeto:
   ```
   npx expo start
   ```
5. Abra no celular com o app **Expo Go** (escaneie o QR Code). Celular e computador precisam estar na mesma rede Wi-Fi; se não conectar, use `npx expo start --tunnel`.

> Este projeto usa o **Expo SDK 54**, que é a versão compatível com o Expo Go da App Store/Play Store.

### Problemas comuns
- `ENOENT ... package.json`: o terminal não está na pasta do projeto. Use `cd petshop`.
- `Project is incompatible with this version of Expo Go`: o Expo Go do celular é de outro SDK. Baixe a versão certa em https://expo.dev/go (escolha SDK 54).
- `Component auth has not been registered yet` ou erro de Firebase: confira se o `firebaseConfig` foi preenchido e rode `npx expo start -c` (limpa o cache).
- Instalação travada/erros de dependência: apague `node_modules` e `package-lock.json` e rode `npm install` de novo.

## Estrutura
- `App.js`: escolhe entre as telas de acesso (Login, Cadastro) e as telas do app (abas), conforme o usuário esteja logado.
- `src/services/auth.js`: cadastrar, entrar, sair e mensagens de erro.
- `src/services/notificacoes.js`: permissão e os 2 tipos de notificação.
- `src/context/NotificacoesContext.js`: guarda a lista de notificações recebidas.
- `src/screens/`: Login, Cadastro, Home, Notificações, Perfil.

## Notificações
- **Agendamento**: ao confirmar banho, tosa ou consulta na Home.
- **Promoção**: ao tocar em "Compre nossos produtos".

Cada notificação aparece nos dois lugares: na aba Notificações do app **e** na barra de notificações do celular (a permissão é pedida na primeira vez que o app abre).
Teste em celular de verdade; no navegador e em alguns emuladores a notificação do aparelho pode não aparecer.
Se você negou a permissão, ative em Configurações do celular > Apps > Expo Go (ou Petshop) > Notificações.
