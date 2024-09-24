export type WoundData = {
  id: number;
  wound_name: string;
  wound_name_en: string;
  wound_cover: string | null;
  wound_content: string;
  wound_note: string;
  ref: { value: string }[];
};

export type ArticleData = {
  id: number;
  article_name: string;
  article_cover: string | null;
  article_content: string;
  article_note: string;
  ref: { value: string }[];
  category: string;
};

export type ContactData = {
  id: number;
  contact_name: string;
  contact_email: string;
  contact_message: string;
  contact_subject: string;
  isRead: number;
  createdAt: string;
  updatedAt: string;
};

export type TrickData = {
  id: number;
  trick_name: string;
  trick_content: string;
  updated_at: string;
};

export type DidyouknowData = {
  id: number;
  didyouknow_name: string;
  didyouknow_content: string;
  updated_at: string;
};
