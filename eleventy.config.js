import yaml from "js-yaml";
import footnote from "markdown-it-footnote";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// One-letter amino acid codes. Used for the footer: if the letters of your
// name all happen to be valid residues, it is printed as a peptide.
const RESIDUES = {
  A: "Ala", C: "Cys", D: "Asp", E: "Glu", F: "Phe", G: "Gly", H: "His",
  I: "Ile", K: "Lys", L: "Leu", M: "Met", N: "Asn", P: "Pro", Q: "Gln",
  R: "Arg", S: "Ser", T: "Thr", V: "Val", W: "Trp", Y: "Tyr",
};

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));
  eleventyConfig.amendLibrary("md", (md) => md.use(footnote));

  // Changes on every build, so browsers fetch the new stylesheet after a deploy.
  eleventyConfig.addGlobalData("buildId", () => Date.now().toString(36));

  eleventyConfig.addPassthroughCopy("src/assets");

  // Posts with `draft: true` show up in `npm start` but are left out of `npm run build`.
  eleventyConfig.addPreprocessor("drafts", "md", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
  });

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").reverse()
  );
  eleventyConfig.addCollection("postsByYear", (api) => {
    const years = new Map();
    for (const post of api.getFilteredByGlob("src/posts/*.md").reverse()) {
      const year = post.date.getUTCFullYear();
      if (!years.has(year)) years.set(year, []);
      years.get(year).push(post);
    }
    return [...years].map(([year, posts]) => ({ year, posts }));
  });

  eleventyConfig.addFilter("dateLong", (d) =>
    `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
  );
  eleventyConfig.addFilter("dateShort", (d) => `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`);
  eleventyConfig.addFilter("dateISO", (d) => d.toISOString());
  eleventyConfig.addFilter("byYear", (items) => {
    const years = new Map();
    for (const item of items || []) {
      if (!years.has(item.year)) years.set(item.year, []);
      years.get(item.year).push(item);
    }
    return [...years]
      .sort((a, b) => b[0] - a[0])
      .map(([year, entries]) => ({ year, entries }));
  });
  eleventyConfig.addFilter("peptide", (name) => {
    const letters = String(name || "").toUpperCase().replace(/[^A-Z]/g, "").split("");
    if (!letters.length || letters.some((l) => !RESIDUES[l])) return "";
    return letters.map((l) => RESIDUES[l]).join("·");
  });

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
