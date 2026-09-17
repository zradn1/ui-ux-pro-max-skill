import { site } from "@/content/site";

/**
 * Accepte une URL TikTok complète ou un ID numérique brut, et renvoie l'ID.
 * Le salon collera en général l'URL du bouton « Partager », d'où les deux formes.
 *
 * Les liens courts (vm.tiktok.com/…) ne contiennent pas l'ID : ils renvoient
 * `null` et la vidéo est simplement ignorée. Il faut l'URL longue, celle qui
 * contient « /video/<id> ».
 */
export function tiktokVideoId(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  if (/^\d+$/.test(value)) return value;
  return value.match(/\/video\/(\d+)/)?.[1] ?? null;
}

/**
 * URL du lecteur embarqué de TikTok.
 * On vise directement l'iframe plutôt que le script embed.js : pas de
 * JavaScript tiers chargé sur chaque visite, et rien n'est requis avant que
 * la visiteuse lance elle-même une vidéo.
 */
export function tiktokEmbedUrl(id: string) {
  return `https://www.tiktok.com/embed/v2/${id}`;
}

/**
 * Vidéos réellement exploitables : celles dont on sait extraire un ID.
 * Une entrée mal formée est écartée plutôt que d'afficher un lecteur vide.
 */
export function activeTikTokVideos() {
  const videos: { id: string; url: string; caption: string }[] = [];
  for (const video of site.tiktokVideos) {
    const id = tiktokVideoId(video.url);
    if (id) videos.push({ id, url: video.url, caption: video.caption });
  }
  return videos;
}
