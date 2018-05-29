interface IArticleCategroy {
  id?: number;
  name?: string;
  images?: string[];
  sort?: number;

  created_at?: Date;
  updated_at?: Date;
  checked?: boolean;
}

interface IArticles {
  id?: number;
  title?: string;
  content?: string;
  content_md: string;
  autor_id?: number;
  verify_id?: number;
  click_num?: number;

  article_categroy_id?: number; //组id
  autor_name?: string; //作者
  verify_name?: string; //审核
  created_at?: Date;
  updated_at?: Date;
  verify_status?: number; //审核状态
  images?: string | string[];
  is_recommand?: boolean;
}
