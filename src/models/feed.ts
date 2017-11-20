export interface IFeed {
  id: number;
  title: string;
  last_build_date: string;
  is_live: boolean;
  category: string;
  number_unread_article: number;
  image: string;
}
