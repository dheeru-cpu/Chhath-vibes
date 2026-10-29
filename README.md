# Chhath Geet — Complete replacement files

A front-end Chhath Puja music experience built with plain HTML, CSS and JavaScript. It keeps the original song-reactive theme idea and adds the 107-item song catalogue shown on Chhath Geet Gatha, plus a four-day ritual guide, preparation checklist, serving-scaled thekua ingredient list, ghat gallery, better search, singer filtering, favourites, queue search, custom song addition, and responsive navigation.

## Replace the files in VS Code

1. Make a backup of your current project folder first (copy the whole folder and name it `chhath-geet-website-backup`).
2. Download and extract this ZIP.
3. In your existing project, replace these files with the supplied files:
   - `index.html`
   - `css/styles.css`
   - `js/app.js`
   - Add `assets/favicon.svg` (new file)
4. Keep the folder paths exactly as shown above. Do not move `styles.css` or `app.js` beside `index.html`.
5. In VS Code, right-click `index.html` → **Open with Live Server**. If the old page is open, press `Ctrl + Shift + R` to hard-refresh it.

## Music playback

- Playback is handled by YouTube's official IFrame Player API. Unlike the old version, the actual YouTube player is visible on the page and is not hidden offscreen.
- Click any catalogue card or the main Play button to play the selected video in the embedded player.
- If a video is deleted, region-restricted, or has embedding disabled, use **Open current song on YouTube**. That is a YouTube restriction, not a website that can override the uploader's settings.
- A stable internet connection is required for YouTube playback, thumbnails, web fonts and gallery images. The song library, ritual guide and recipe layout still render without YouTube.
- The catalogue contains the 107 entries shown by the reference site, not a claim that it contains every Chhath song ever released. Song titles and video thumbnails were drawn from the reference catalogue; the uploader may change or restrict a video later.
- Add songs with the `＋` button. Paste a valid YouTube watch, short, embed or live URL. Added songs, favourites, preferences and the ritual checklist are stored in the current browser only; there is no cloud sync or server backend.

## Features included

- Song-associated scene transition: the background photograph, sun glow, water shimmer, floating light particles and hero copy change with the selected song's visual mood. This is a song/theme association, not audio beat analysis.
- Song search across Latin transliteration, artist, category and known Hindi aliases (so `suraj` can match `Uga Hai Suraj Dev`).
- Category and singer filters, favourites, pagination, searchable queue, shuffle, repeat, previous/next, seek and volume controls.
- Add-your-own YouTube songs and a fallback link for videos that cannot be embedded.
- Four-day overview: Nahay Khay, Kharna, Sandhya Arghya and Usha Arghya.
- Browser-saved preparation checklist and a thekua ingredient calculator for 10–60 pieces.
- Ghat and prasad gallery, responsive mobile menu, focus-visible keyboard states and reduced-motion support.

## Quick test after replacing

1. Click Play, then Next and Previous. The embedded YouTube player should change to the selected song.
2. Search `suraj`; `Uga Hai Suraj Dev` should appear. Clear the search and try a singer name like `Sharda Sinha`.
3. Click **Arghya songs**, then **Paramparik geet**, then **My songs**.
4. Add a YouTube URL, refresh the page and confirm the added song is still in the library.
5. Open and close the listening queue; search inside the queue; select another song.
6. Change the visual mood and select another song; the scene mood should update again.
7. Toggle a checklist item, refresh, and check that it remains checked.
8. Test at mobile width using browser DevTools.

## Source / limitations

The reference-site catalogue and YouTube thumbnail links may change. Some video IDs can be unavailable or may disallow embedding; the UI detects YouTube player errors and shows an external link instead. Official rights remain with the respective artists and labels. The gallery photos load from external image hosts.
