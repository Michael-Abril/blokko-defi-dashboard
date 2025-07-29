# 🔧 GitHub Pages Setup Guide

Your Blokko DeFi Dashboard has been deployed to the `gh-pages` branch, but GitHub Pages needs to be enabled in your repository settings.

## 📋 **Step-by-Step Setup:**

### 1. **Go to Your Repository Settings**
- Visit: https://github.com/Michael-Abril/blokko-defi-dashboard
- Click on **"Settings"** tab (near the top of the page)

### 2. **Enable GitHub Pages**
- Scroll down to **"Pages"** in the left sidebar
- Or go directly to: https://github.com/Michael-Abril/blokko-defi-dashboard/settings/pages

### 3. **Configure Source**
- **Source**: Select "Deploy from a branch"
- **Branch**: Select `gh-pages` from the dropdown
- **Folder**: Select `/ (root)`
- Click **"Save"**

### 4. **Wait for Deployment**
- GitHub will show a message: "Your site is being built"
- This usually takes 2-5 minutes
- You'll see a green checkmark when it's ready

### 5. **Access Your Live Site**
- Once deployed, your site will be available at:
- **https://michael-abril.github.io/blokko-defi-dashboard**

---

## 🔍 **Troubleshooting:**

### **If the page shows 404:**
1. Check that the `gh-pages` branch exists
2. Verify GitHub Pages is enabled in Settings
3. Wait a few minutes for the first deployment

### **If you see a blank page:**
1. Check the browser console for errors
2. Verify the build was successful
3. Check if there are any routing issues

### **If you see "Page not found":**
1. Make sure you're using the correct URL
2. Check that the repository is public
3. Verify the branch name is exactly `gh-pages`

---

## 🚀 **Alternative Quick Deploy Options:**

### **Option 1: Vercel (Recommended)**
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Set Root Directory to `frontend`
5. Deploy automatically

### **Option 2: Netlify**
1. Go to https://netlify.com
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`

---

## 📞 **Need Help?**

If GitHub Pages still doesn't work after following these steps:

1. **Check the Actions tab** in your repository for any build errors
2. **Verify the gh-pages branch** contains the built files
3. **Try deploying to Vercel** as an alternative (usually faster and more reliable)

---

**🎯 Your dashboard should be live once GitHub Pages is properly configured!** 