# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TypeScript/Express.js REST API for the Idea Survey project. Accepts audio uploads, transcribes them using OpenAI Whisper, evaluates ideas using Grok AI, and stores transcriptions in AWS S3.

## Development Commands

```bash
npm run dev      # Start dev server with hot reload (tsx watch)
npm run build    # Compile TypeScript to dist/
npm start        # Run compiled server from dist/
```

## Architecture

```
server.ts              - Express app entry point (default port 5001)
routes.ts              - API route definitions
request-handlers/      - HTTP request handlers
helpers/               - Business logic (transcription, AI judgement, S3 upload)
services/              - External API clients (OpenAI, Grok, S3)
envConfig/             - Type-safe environment variable loading
```

## API Endpoint

**POST** `/api/idea/audio` - Upload audio for transcription and idea evaluation
- Accepts: audio/* or video/webm (10MB limit)
- Returns: JSON with success status and idea judgement

## Environment Variables

Required in `.env`:
- `OPENAI_API_KEY` - OpenAI API key for Whisper
- `GROK_API_KEY` - X.ai API key for Grok
- `AWS_REGION`, `AWS_ACCESS_KEY`, `AWS_SECRET_ACCESS_KEY`, `AWS_BUCKET_NAME` - S3 configuration
- `PORT` - Optional, defaults to 5001
