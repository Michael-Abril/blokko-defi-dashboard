# 🚀 Blokko DeFi Dashboard - Deployment Guide

This guide shows you how to deploy your Blokko DeFi Dashboard to make it accessible live via GitHub and other platforms.

## 🌐 **Option 1: GitHub Pages (Recommended - Free)**

### Quick Deploy:
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already done)
npm install

# Deploy to GitHub Pages
npm run deploy
```

### Manual Setup:
1. **Go to your GitHub repository**: `https://github.com/Michael-Abril/blokko-defi-dashboard`
2. **Go to Settings → Pages**
3. **Source**: Select "Deploy from a branch"
4. **Branch**: Select `gh-pages` branch
5. **Folder**: Select `/ (root)`
6. **Click Save**

### Access Your Live Site:
- **URL**: `https://michael-abril.github.io/blokko-defi-dashboard`
- **Auto-updates**: Every time you run `npm run deploy`

---

## ☁️ **Option 2: Vercel (Recommended - Free)**

### Quick Deploy:
1. **Go to**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Import Repository**: Select `blokko-defi-dashboard`
4. **Framework Preset**: Vite
5. **Root Directory**: `frontend`
6. **Build Command**: `npm run build`
7. **Output Directory**: `dist`
8. **Click Deploy**

### Access Your Live Site:
- **URL**: `https://your-project-name.vercel.app`
- **Auto-updates**: Every push to main branch

---

## 🔥 **Option 3: Netlify (Free)**

### Quick Deploy:
1. **Go to**: https://netlify.com
2. **Sign up/Login** with GitHub
3. **New site from Git**
4. **Repository**: Select `blokko-defi-dashboard`
5. **Base directory**: `frontend`
6. **Build command**: `npm run build`
7. **Publish directory**: `dist`
8. **Click Deploy**

### Access Your Live Site:
- **URL**: `https://your-project-name.netlify.app`
- **Auto-updates**: Every push to main branch

---

## 🐳 **Option 4: Docker Deployment**

### Create Dockerfile:
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Deploy:
```bash
# Build image
docker build -t blokko-dashboard .

# Run container
docker run -p 80:80 blokko-dashboard
```

---

## 🔧 **Environment Variables**

For production deployment, you may need to set these environment variables:

```bash
# Create .env.production in frontend directory
VITE_API_URL=https://your-backend-url.com
VITE_CHAIN_ID=1
VITE_PROJECT_ID=your-walletconnect-project-id
```

---

## 📱 **Custom Domain Setup**

### GitHub Pages:
1. **Go to repository Settings → Pages**
2. **Custom domain**: Enter your domain
3. **Save**
4. **Add CNAME record** in your DNS provider pointing to `michael-abril.github.io`

### Vercel/Netlify:
1. **Go to project settings**
2. **Custom domains**
3. **Add domain**
4. **Follow DNS instructions**

---

## 🚀 **Quick Commands**

```bash
# Local development
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Preview production build
npm run preview
```

---

## 📊 **Performance Optimization**

### Before Deploying:
1. **Optimize images**: Use WebP format
2. **Enable compression**: Gzip/Brotli
3. **Minify assets**: CSS/JS minification
4. **Lazy load components**: React.lazy()
5. **CDN**: Use CDN for static assets

---

## 🔒 **Security Considerations**

1. **Environment variables**: Never commit secrets
2. **HTTPS**: Always use HTTPS in production
3. **CORS**: Configure CORS for your backend
4. **Content Security Policy**: Add CSP headers
5. **Rate limiting**: Implement API rate limiting

---

## 📞 **Support**

- **GitHub Issues**: Report bugs in the repository
- **Documentation**: Check README.md for setup instructions
- **Community**: Join our Discord/Telegram for help

---

**🎉 Your Blokko DeFi Dashboard will be live and accessible from anywhere!** 