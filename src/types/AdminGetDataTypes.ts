export type WoundData = {
  id: number;
  wound_name: string;
  wound_cover: string | null;
  wound_content: string;
  ref: string;
};

export type ArticleData = {
  id: number;
  article_name: string;
  author_name: string;
  article_cover: string | null;
  article_content: string;
  ref: string;
};

export type TrickData = {
  id: number;
  trick_name: string;
  trick_content: string;
};

export type DidyouknowData = {
  id: number;
  didyouknow_name: string;
  didyouknow_content: string;
};
