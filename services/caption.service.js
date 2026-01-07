export const getCaptionFromDB = (quoteDoc) => {
  const caption = quoteDoc.caption || "";
  const hashtags = Array.isArray(quoteDoc.hashtags)
    ? quoteDoc.hashtags.join(" ")
    : "";

  return `${caption}\n\n${hashtags}`;
};
