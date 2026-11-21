# ShadowEvil // Offensive Security

A Japanese dark-fantasy styled personal pentesting portfolio for **Luka Mgeladze (ShadowEvil)**. Built with static HTML, CSS and vanilla JavaScript: no build step, no tracking, no server, and ready for GitHub Pages.

## Features

- Responsive dark-fantasy hero with Arthur-inspired profile artwork
- Animated particles, scroll transitions, reading indicator, reversible "Awaken the Shadow" mode
- Realistic summary of offensive security skills, training areas and verified projects
- Keyboard-accessible tabbed lab notes and working project filters
- Accessible mobile navigation and reduced-motion support
- Self-contained deployment with relative asset URLs

## Your content

Content was assembled from your cybersecurity résumé and prior discussions. **Please review every public claim before deploying.** It deliberately distinguishes:

- **Completed:** Hack The Box Academy CPTS learning path (not the certification exam); published résumé-listed certificates; network scanner, authentication tester and CYBER//ADAPT prototype.
- **In progress:** CPTS certification exam preparation and the privilege-escalation automation toolkit.
- **Hands-on lab training:** Active Directory attack techniques, web testing, network exploitation, pivoting, and low-level debugging. These are not presented as paid/client pentesting engagements.

For privacy, this version intentionally **does not publish your phone number, personal email or any private client details**. External profile links are empty until you edit them. The Arthur image is based on the image you provided; check copyright/artist permission before public publication.

## Edit your links

Open `script.js` and update `PUBLIC_PROFILE.links` with your **public** GitHub, LinkedIn, Hack The Box and TryHackMe URLs. Blank links do not appear on the page.

To update training status, projects or school details, edit `index.html`. Do not mark CPTS "certified" until you actually pass the exam. Edit the image at `assets/arthur.jpg` if desired.

## Preview locally

Open `index.html` in a web browser. For the best local test, start a static server in the project directory:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a **public** repository named `shadowevil-offsec` (or your preferred repository name).
2. Upload the files **inside** this folder to the repository root, including `.nojekyll`, `assets/`, `index.html`, `styles.css` and `script.js`.
3. Open the repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
5. Your site should be available at `https://YOUR_GITHUB_USERNAME.github.io/shadowevil-offsec/` once GitHub finishes deploying. GitHub shows the exact address in the Pages settings.

For a root-level profile website, name the repository `YOUR_GITHUB_USERNAME.github.io` instead, and the URL becomes `https://YOUR_GITHUB_USERNAME.github.io/`.

All paths are relative so either hosting option works.

## Notes

The "field notes" tabs describe areas of training and methodology, not step-by-step exploit instructions or fictional machine writeups. Add only writeups you can verify and are authorized to publish. No analytics, external libraries or API keys are included (Google Fonts are optional and have local font fallbacks).
