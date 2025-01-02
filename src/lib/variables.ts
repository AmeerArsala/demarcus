export const env = {
  revalidate_first_page: import.meta.env.PUBLIC_REVALIDATE_FIRST_PAGE !== "false", // important; used to be NEXT_PUBLIC_REVALIDATE_FIRST_PAGE
} as const;
