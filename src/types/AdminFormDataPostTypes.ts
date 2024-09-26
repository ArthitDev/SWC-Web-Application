export type WoundFormData = {
  wound_name: string;
  wound_name_en: string;
  wound_content: string;
  wound_cover: string | null | File;
  wound_note: string;
  ref: { value: string }[];
};

export type WoundFormDataMulti = {
  wound_name: string;
  wound_name_en: string;
  wound_content: string;
  wound_cover: (string | null | File)[];
  wound_note: string;
  ref: { value: string }[];
};

export type ArticleFormData = {
  article_name: string;
  article_cover: string | null | File;
  article_content: string;
  article_note: string;
  ref: { value: string }[];
  category: string;
};

export type TrickFormData = {
  trick_name: string;
  trick_content: string;
};
export type DidyouknowFormData = {
  didyouknow_name: string;
  didyouknow_content: string;
};
