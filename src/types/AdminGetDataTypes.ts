export type WoundData = {
  id: number;
  wound_name: string;
  wound_name_en: string;
  wound_covers: { id: number; url: string }[];
  wound_content: string;
  wound_note: string;
  ref: { value: string }[];
  wound_video: { value: string }[];
  click_counts: number[];
  created_at: string;
  updated_at: string;
};

export type ArticleData = {
  id: number;
  article_name: string;
  article_cover: string | null;
  article_content: string;
  article_note: string;
  ref: { value: string }[];
  article_video: { value: string }[];
  category: string;
  clicks: [
    {
      id: number;
      created_at: string;
      updated_at: string;
      click_count: number;
    }
  ];
  created_at: string;
  updated_at: string;
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
