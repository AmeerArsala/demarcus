const COUNT_REPLACEMENT = "[#]";
const WORD_REPLACEMENT = "[?]";

/// template: "Blah blah blah [#] blah blah [?] blah blah"
/// singularPlural: "singular|plural"
/// Example template: "See [#] previous [?] on GitHub"
/// Example singularPlural: "reply|replies"
export function pluralize(template: string, count: number, singularPlural: string): string {
  const templateWithCount = template.replace(COUNT_REPLACEMENT, `${count}`);

  const [singular, plural] = singularPlural.split("|") as [string, string];
  const word: string = count === 1 ? singular : plural;

  const pluralizedString = templateWithCount.replace(WORD_REPLACEMENT, word);

  return pluralizedString;
}
