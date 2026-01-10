+   to setup the project in cwd:
    `npm init -y`

    this creates a `package.json` file

+   web framework for handling routes:
    `npm install express`

+   typescript compiler (local):
    `npm install -D typescript`

+   runs typescript files directly without compiling:
    `npm install -D ts-node`

+   auto-restarts server on file changes:
    `npm install -D nodemon`

+   nodemon replacement, it allows display of `console.log`s
    `npm install -D tsx`

+   typescript type definitions for node.js:
    `npm install -D @types/node`

+   typescript type definitions for express:
    `npm install -D @types/express`

+   loads environment variables from .env file:
    `npm install dotenv`

+   openai sdk for whisper transcription:
    `npm install openai`

+   converts time strings to milliseconds, allows me do ms("10s"):
    `npm i ms@2.1.3`
    `npm i -D @types/ms`, `-D` means it's only available in the development environment

+   +   aws s3 client for bucket operations:
    `npm install @aws-sdk/client-s3`

+   generates signed urls for private s3 objects:
    `npm install @aws-sdk/s3-request-presigner`

+   s3 bucket setup
    `https://www.youtube.com/shorts/XMByxkxM2N4`

+   how Claude set up `dist`:

    Claude:
    `
    when I ran npm run build, it executed tsc (the TypeScript compiler).       

    tsc reads your tsconfig.json, sees outDir: "./dist", then:

    1. Finds all your .ts files
    2. Compiles each one to .js
    3. Outputs them to dist/ with the same folder structure

    So:
    server.ts           → dist/server.js
    routes/index.ts     → dist/routes/index.js
    helpers/foo.ts      → dist/helpers/foo.js

    The dist folder didn't exist before. tsc created it automatically.
    `

+   render setup:
    `
    1. Go to https://render.com and sign up (use GitHub)
    2. Click New → Web Service
    3. Connect your GitHub repo
    4. Configure:
        - Build Command: npm install && npm run build
        - Start Command: npm start
    5. Add your environment variables (click Environment):
        - AWS_REGION
        - AWS_ACCESS_KEY
        - AWS_SECRET_ACCESS_KEY
        - AWS_BUCKET_NAME
        - Any others from your .env
    6. Click Create Web Service

    Render will build and deploy.
    
    you'll get a URL like https://is-api-xxxx.onrender.
    `
    
+   allows you to search previous commands by prefix using arrow keys (powershell only):
    `Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward`
    `Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward`