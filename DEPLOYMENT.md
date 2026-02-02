# V2V Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Render account (sign up at https://render.com)

## Step 1: Deploy Backend to Render

1. **Push code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Migrate to PostgreSQL and prepare for deployment"
   git push origin main
   ```

2. **Create New Web Service on Render**:
   - Go to https://dashboard.render.com/
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (`phravins/V2V-Tech`)
   - Render will auto-detect the `render.yaml` file

3. **Configure Environment Variables**:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail app password
   - `FRONTEND_URL`: Will be added after deploying frontend
   - `DATABASE_URL`: Auto-configured from PostgreSQL database

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://v2v-backend.onrender.com` (example)

## Step 2: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**:
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Import `phravins/V2V-Tech` from GitHub

2. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Add Environment Variables**:
   - Key: `VITE_API_URL`
   - Value: Your Render backend URL (e.g., `https://v2v-backend.onrender.com`)

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your frontend URL: `https://your-app.vercel.app`

## Step 3: Update CORS Settings

1. **Go back to Render Dashboard**:
   - Navigate to your web service
   - Go to "Environment"
   - Add new environment variable:
     - Key: `FRONTEND_URL`
     - Value: Your Vercel URL (e.g., `https://your-app.vercel.app`)
   - Save and wait for auto-redeploy

## Step 4: Test Your Deployment

1. Visit your Vercel URL
2. Test the contact form
3. Test admin login at `/admin-login`
4. Test admin dashboard at `/admin-dashboard`

## Troubleshooting

### Backend Issues
- Check Render logs: Dashboard → Your Service → Logs
- Verify DATABASE_URL is set correctly
- Ensure PostgreSQL database is running

### Frontend Issues
- Check Vercel deployment logs
- Verify `VITE_API_URL` environment variable is set
- Check browser console for errors

### CORS Errors
- Ensure `FRONTEND_URL` is set in Render
- Verify your Vercel URL is correct
- Wait for Render to redeploy after changing env vars

## Local Development with PostgreSQL

1. **Install PostgreSQL** locally
2. **Create database**:
   ```sql
   CREATE DATABASE v2v_local;
   ```
3. **Update `.env`**:
   ```
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/v2v_local
   ```
4. **Start server**: `npm run dev` (in server directory)

The database will auto-initialize tables and seed admin users.
