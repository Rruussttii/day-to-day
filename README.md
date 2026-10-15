# Day to Day

Money, bills, tips, food, meals, calories and habits. It's an installable web app: add it to your iPhone home screen and it opens full screen, works offline, and syncs through Firebase.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app |
| `firebase-config.js` | Your Firebase project's web settings (public by design) |
| `firestore.rules` | Who can read and write data: each signed-in person only sees their own |
| `manifest.webmanifest`, `icons/` | App name and home-screen icon |
| `sw.js` | Offline support |

## One-time setup

### 1. Firebase (free)
1. Go to https://console.firebase.google.com, sign in with a Google account, and **Create a project** named `day-to-day`. Google Analytics isn't needed.
2. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save.**
3. **Build → Firestore Database → Create database.** Pick a location near you and **Start in production mode**.
4. Open the **Rules** tab there, replace everything with the contents of `firestore.rules`, and click **Publish**.
5. **Project settings** (gear icon) → **Your apps** → the **Web** icon `</>`. Name it `day-to-day`; skip Firebase Hosting. Copy the `firebaseConfig` values into `firebase-config.js`.
6. After step 7 below, add your site to **Authentication → Settings → Authorized domains**: `<your-github-username>.github.io`.

### 2. GitHub Pages (free hosting)
7. Create a GitHub account, then a new **public** repository named `day-to-day`. Upload every file in this folder, keeping the `icons` folder. Then go to **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**. A minute later the app is at `https://<your-github-username>.github.io/day-to-day/`.

### 3. On your iPhone
8. Open that address in **Safari** and tap **Create my account** (or **Sign in** later on other devices).
9. **Share → Add to Home Screen → Add.** Open it from the icon from now on.

### 4. Bring your data over from the Claude version
10. In the old app on claude.ai: **Money → Backup → Export for the new Day to Day app**, which saves a `.json` file.
11. In the new app: **Money → Backup → Import from the old Claude app**, then pick that file. Do this once only, or expenses will show twice.

## Updating the app later
Change the files, bump `VERSION` in `sw.js` (for example `v1` to `v2`), and upload them to the GitHub repository again. Phones pick up the new version the next time the app is opened while online.

## Notes
- **Reminders:** Money → Paydays & bills → **Add bills to my phone's calendar** saves a `.ics` file. On iPhone, tap **Add All**. If nothing happens inside the home-screen app, do it once from Safari.
- The Firebase settings in `firebase-config.js` are not secret. The rules in `firestore.rules` are what keep your data private, so always publish them.
