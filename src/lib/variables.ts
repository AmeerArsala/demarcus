export const env = {
  revalidate_first_page: process.env.PUBLIC_REVALIDATE_FIRST_PAGE !== "false",
}; // as const

export function setRevalidateFirstPage(revalidate: boolean) {
  env.revalidate_first_page = revalidate;
}
