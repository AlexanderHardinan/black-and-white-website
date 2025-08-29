@echo off
REM ===========================================
REM Optimized Deploy Black and White Website
REM Skips node_modules and .next for GitHub
REM ===========================================

REM 1️⃣ Set Git identity
git config --global user.name "Alexander Hardinan"
git config --global user.email "blackchef.alex@gmail.com"

REM 2️⃣ Initialize Git if needed
git init

REM 3️⃣ Ensure .gitignore exists and ignore large folders
if not exist ".gitignore" (
    echo node_modules/>>.gitignore
    echo .next/>>.gitignore
    echo dist/>>.gitignore
    echo .env>>.gitignore
    echo *.log>>.gitignore
    echo .DS_Store>>.gitignore
)

REM 4️⃣ Remove cached large files
git rm -r --cached node_modules 2>nul
git rm -r --cached .next 2>nul
git rm -r --cached dist 2>nul

REM 5️⃣ Add all remaining files and commit
git add .
git commit -m "Deploy: Clean commit ignoring large files" 2>nul

REM 6️⃣ Set main branch
git branch -M main

REM 7️⃣ Remove old remote if exists
git remote remove origin 2>nul

REM 8️⃣ Add GitHub remote
git remote add origin https://github.com/AlexanderHardinan/black-and-white-website.git

REM 9️⃣ Push to GitHub (force to overwrite if necessary)
git push -u origin main --force

REM 🔟 Deploy to Vercel
vercel link 2>nul
vercel --prod --confirm

REM 1️⃣1️⃣ Update Vercel Environment Variables automatically
if exist ".env" (
    for /F "usebackq tokens=1* delims==" %%A in (`type .env`) do (
        setlocal enabledelayedexpansion
        REM Remove existing variable if exists
        vercel env rm %%A production --yes 2>nul
        REM Add updated value
        vercel env add %%A %%B production --yes
        endlocal
    )
)

REM 1️⃣2️⃣ Done
echo Deployment completed successfully! GitHub and Vercel are updated.
pause
