import type dayjs from 'dayjs';

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
  thumbnail?: string;
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

interface BoothBase extends BaseEntity {
  dtype: 'MARKER' | 'GATE' | 'STOP' | 'STORE';
  categoryId: number;
  area: Area;
  name: string;
  summary?: string;
  description?: string;
  point: Point;
  hour: Hour;
  thumbnail?: string;
  images?: string[];
  links?: Link[];
}

interface Menu extends BaseEntity {
  image: string;
  name: string;
  price: number;
}

interface Marker extends BoothBase {
  dtype: 'MARKER';
}
interface Gate extends BoothBase {
  dtype: 'GATE';
  type: 'ENTRY' | 'EXIT' | 'ALL';
}
interface Stop extends BoothBase {
  dtype: 'STOP';
  times: dayjs.Dayjs[];
}
interface Store extends BoothBase {
  dtype: 'STORE';
  menus: Menu[];
}

export type Booth = Marker | Gate | Stop | Store;

export interface Timeslot extends BaseEntity {
  id: number;
  name: string;
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
  href?: string;
}
