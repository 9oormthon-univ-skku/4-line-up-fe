import type dayjs from "dayjs";

interface BaseEntity {
  id: number;
  createdAt?: dayjs.Dayjs;
  modifiedAt?: dayjs.Dayjs;
}

export interface Hour {
  open: dayjs.Dayjs;
  close: dayjs.Dayjs;
}

export interface Point {
  x: number;
  y: number;
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

export interface Category extends BaseEntity {
  name: string;
  icon: string;
  color?: string;
}

export interface Area extends BaseEntity {
  name: string;
  summary?: string;
  description: string;
  hour: Hour;
  imgaes?: string[];
  points: Point[];
  links?: Link[];
}

export interface Booth extends BaseEntity {
  dtype: 'marker' | 'gate' | 'stop' | 'store';
  category: Category;
  area: Area;
  name: string;
  summary?: string;
  description?: string;
  point: Point;
  hour: Hour;
  images?: string[];
  links?: Link[];
}

interface Menu extends BaseEntity {
  image: string;
  name: string;
  price: number;
}

export interface Gate extends Booth {
  type: 'ENTRY' | 'EXIT' | 'ALL';
}
export interface Stop extends Booth {
  times: dayjs.Dayjs[];
}
export interface Store extends Booth {
  menus: Menu[];
}

export interface Timeslot extends BaseEntity {
  id: number;
  name: string;
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
  href?: string;
}