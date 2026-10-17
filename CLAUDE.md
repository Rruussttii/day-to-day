# Day to Day: notes for Claude

Personal web app (money, bills, tips, food, meals, calories, habits). Installed on the owner's iPhone from the home screen.

- Live site: https://rruussttii.github.io/day-to-day/ (GitHub Pages, repo `Rruussttii/day-to-day`, branch `main`, root folder)
- Data: Firebase project `day-to-day-f4076` (Email/Password auth + Firestore). Rules are in `firestore.rules`; each user can only touch `data/users/{uid}/**`.
- The whole app is `index.html` (plain HTML/CSS/JS, Firebase compat SDK 10.12.2 from gstatic). No build step.

## Updating the app
1. Edit the files.
2. Bump `VERSION` in `sw.js` (e.g. `v1` → `v2`) on every change, or phones keep the old cached files.
3. Check the scripts still parse, then commit and `git push origin main`. Pages republishes in about a minute.

Never change the Firestore document paths without migrating existing data:
- Personal: `data/users/<uid>/budget` (+ subcollections `expenses`, `tips`), `food`, `calories`, `kitchen`, `quick`, `debts`, `goals`, `habits`, `calendar`, `household` (pointer `{id}`).
- Shared with a roommate: `households/<inviteCode>` (`members`, `names`) with subcollections `shopping`, `votes/<date>`, `expenses` (shared costs; `kind: 'settle'` for paybacks), `bills`, `chores`, `notes`.
- Rules for both live in `firestore.rules`; the owner pastes them into the Firebase console by hand.
