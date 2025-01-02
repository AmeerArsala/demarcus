export let webcrypto: Crypto;

if (typeof window === "undefined") {
  import("node:crypto").then((module) => {
    webcrypto = module.webcrypto as Crypto;
  });
} else {
  webcrypto = window.crypto;
}

export function removeTrailingSlash(url: string): string {
  if (!url.includes("/")) {
    return url;
  }

  // check if last char is '/'
  if (url.charAt(url.length - 1) === "/") {
    return url.substring(0, url.length - 1);
  }

  const splitURL: string[] = url.split("/");

  // since there exists a '/', we know there will be at least 2 elements in splitURL
  const lastPartition: string = splitURL[splitURL.length - 1];
  if (lastPartition.startsWith("?")) {
    // we conclude that there does in fact exist a trailing slash
    splitURL[splitURL.length - 2] += lastPartition;
    splitURL.pop(); // remove last element

    const urlWithoutTrailingSlash = splitURL.join("/");
    return urlWithoutTrailingSlash;
  } else {
    // we conclude that there is no trailing slash
    return url;
  }
}

export function _getCleanedUrl() {
  const url = new URL(location.href);
  url.searchParams.delete("demarcus");
  url.hash = "";
  return url;
}

export function _formatError(message: string) {
  return `[demarcus] An error occurred. Error message: "${message}".`;
}

export function getMetaContent(property: string, og = false) {
  const ogSelector = og ? `meta[property='og:${property}'],` : "";
  const element = document.querySelector<HTMLMetaElement>(ogSelector + `meta[name='${property}']`);

  return element ? element.content : "";
}

export function cleanAnchor(origin: string) {
  // Make sure the anchor is not followed by / as it means the website probably
  // is an SPA that uses anchor-based routing.
  let length = origin.length;
  const split = origin.split(/#(?!\/)/);
  if (split.length > 1) {
    length -= split.pop().length + 1;
  }
  return origin.substring(0, length);
}

export function cleanSessionParam(url: string) {
  try {
    const newUrl = new URL(url);
    newUrl.searchParams.delete("demarcus");
    return newUrl.toString();
  } catch {
    return url;
  }
}

export function encodeSearchParams(searchParams: URLSearchParams): string {
  const encodedPairs = Array.from(searchParams.entries()).map(
    ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  );

  //console.log("ENCODED PAIRS:", encodedPairs);

  return encodedPairs.join("&");
}

export function isEmpty(v: unknown) {
  return v === null || v === undefined || v === "" || Number.isNaN(v);
}

export async function clipboardCopy(text: string) {
  await navigator.clipboard.writeText(text);
}

export function parseRepoWithOwner(repoWithOwner: string) {
  const [owner, name] = repoWithOwner.split("/");
  return { owner, name };
}

export function normalizeRepoName(repoOrLink: string) {
  if (!repoOrLink) return "";

  // Extract repo name from link if it looks like a GitHub link
  const pattern = /github\.com\/(\S*?\/\S*)/;
  repoOrLink = repoOrLink.match(pattern)?.[1] || repoOrLink;

  // Remove any trailing information as we only need the owner and name
  const { owner, name } = parseRepoWithOwner(repoOrLink);

  if (!name) return `${owner}/${owner}`; // 'giscus' -> 'giscus/giscus'
  return `${owner}/${name}`;
}

export function resizeTextArea(textarea: HTMLTextAreaElement) {
  const maxHeight = 270;
  textarea.style.height = `0px`;
  const height = textarea.scrollHeight <= maxHeight ? textarea.scrollHeight : maxHeight;
  textarea.style.height = `${height}px`;
}

export async function digestMessage(message: string, algorithm: AlgorithmIdentifier = "SHA-1") {
  // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await webcrypto.subtle.digest(algorithm, msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

export async function hasStorageAccess() {
  // If strict tracking protection is enabled in the browser,
  // accessing localStorage may be forbidden.
  if (typeof document.hasStorageAccess === "undefined") return true;
  if (await document.hasStorageAccess()) return true;
  try {
    await document.requestStorageAccess();
  } catch {
    // The request can only be made under very specific conditions.
  }
  return await document.hasStorageAccess();
}
