interface Hour {
  open: string;
  close: string;
}

interface Point {
  x: number;
  y: number;
}

export interface Link {
  label: string;
  href: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  images?: string[];
  links?: Link[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  color?: string;
}

export interface Area {
  id: number;
  name: string;
  summary?: string;
  description: string;
  hour: Hour;
  imgaes?: string[];
  points: Point[];
  links?: Link[];
}

export interface Booth {
  id: number;
  categoryId: number;
  areaId: number;
  name: string;
  summary?: string;
  description?: string;
  point: Point;
  hour: Hour;
  images?: string[];
  links?: Link[];
}

interface Menu {
  id: number;
  image: string;
  name: string;
  price: number;
}

export interface Gate extends Booth {
  type: 'ENTRY' | 'EXIT' | 'ALL';
}
export interface Stop extends Booth {
  times: string[];
}
export interface Store extends Booth {
  menus: Menu[];
}
