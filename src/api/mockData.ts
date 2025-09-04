import type { Area, Booth, Category, Post, Timeslot } from '@/types/schema';
import dayjs from 'dayjs';

export const areaData: Area = {
  id: 1,
  name: 'area1',
  description: 'desc',
  hour: {
    open: dayjs('2025-08-20T09:00:00'),
    close: dayjs('2025-08-20T18:00:00'),
  },
  points: [],
};
export const categoriesData: Category[] = [
  { id: 1, name: 'cat1', icon: '/mk-example.svg' },
  { id: 2, name: 'cat2', icon: '', color: '#1c60adff' },
];
export const boothsData: Booth[] = [
  {
    dtype: 'store',
    id: 1,
    category: categoriesData[0],
    area: areaData,
    name: '부스명 01',
    description: '부스에 관한 설명 예시',
    point: { x: 375, y: 750 },
    hour: {
      open: dayjs('2025-08-20T09:00:00'),
      close: dayjs('2025-08-20T18:00:00'),
    },
  },
  {
    dtype: 'store',
    id: 2,
    category: categoriesData[1],
    area: areaData,
    name: '부스명 03',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    point: { x: 375, y: 250 },
    hour: {
      open: dayjs('2025-08-20T09:00:00'),
      close: dayjs('2025-08-20T18:00:00'),
    },
    images: [
      'https://avatars.githubusercontent.com/u/220365751?s=200&v=4',
      '/img-02.jpg',
    ],
  },
];

export const postsData: Post[] = [
  {
    id: 1,
    title: 'title1',
    content: 'content1',
  },
  {
    id: 2,
    title: '2025 ESKARA: 초록의 파도',
    content: `불어오는 바람을 따라
더욱 거세게 일렁일,

2025 ESKARA: 초록의 파도

| 9. 11. - 9. 12. 
성균관대학교 자연과학캠퍼스`,
    images: [
      "https://flzedqolwsvpundopfcv.supabase.co/storage/v1/object/public/images/post/1/538384101_17897415579279504_1198110012817654601_n.jpg",
      'https://flzedqolwsvpundopfcv.supabase.co/storage/v1/object/public/images/post/1/539195561_17897415570279504_8517221295134760683_n.jpg',
      'https://flzedqolwsvpundopfcv.supabase.co/storage/v1/object/public/images/post/1/540624198_17897415558279504_3597118504383467209_n.jpg',
    ]
  },
  {
    id: 3,
    title: 'notice w/ image 2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero ',
    images: ['/img-01.jpg','/img-01.jpg','/img-02.jpg']
  },
];

export const timeslotData: Timeslot[] = [
  {
    id: 0,
    name: 'name',
    startTime: dayjs('2025-05-07T13:00:00'),
    endTime: dayjs('2025-05-07T15:00:00'),
  },
  {
    id: 1,
    name: 'name',
    startTime: dayjs('2025-05-07T16:00:00'),
    endTime: dayjs('2025-05-07T20:00:00'),
    href: 'https://instagram.com/',
  },
  {
    id: 2,
    name: 'name',
    startTime: dayjs('2025-05-07T10:30:00'),
    endTime: dayjs('2025-05-07T11:45:00'),
    href: 'https://instagram.com/',
  },
];
