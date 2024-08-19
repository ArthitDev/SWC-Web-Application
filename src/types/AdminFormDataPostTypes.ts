export type WoundFormData = {
  wound_name: string;
  wound_content: string;
  wound_cover: string | File | null;
  ref: string;
};

export type ArticleFormData = {
  article_name: string;
  author_name: string;
  article_cover: string | File | null;
  article_content: string;
  ref: string;
};
export type TrickFormData = {
  trick_name: string;
  trick_content: string;
};
export type DidyouknowFormData = {
  didyouknow_name: string;
  didyouknow_content: string;
};
