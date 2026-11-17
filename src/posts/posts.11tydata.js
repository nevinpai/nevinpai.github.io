export default {
  layout: "post.njk",
  eleventyComputed: {
    permalink: (data) => `/writing/${data.page.fileSlug}/`,
  },
};
