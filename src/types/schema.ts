interface BaseEntity {
  id: number;
  createdAt?: string;
  modifiedAt?: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface Post extends BaseEntity {
  title: string;
  content: string;
  images?: string[];
  links?: Link[];
}

