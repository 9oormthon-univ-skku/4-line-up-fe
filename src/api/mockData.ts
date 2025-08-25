import type { Area, Booth, Category, Post } from '@/types/schema';

export const areaData: Area = {
  id: 1,
  name: 'area1',
  description: 'desc',
  hour: { open: '2025-08-20T09:00:00', close: '2025-08-20T18:00:00' },
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
    hour: { open: '2025-08-20T09:00:00', close: '2025-08-20T18:00:00' },
  },
  {
    dtype: 'store',
    id: 2,
    category: categoriesData[1],
    area: areaData,
    name: '부스명 03',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    point: { x: 375, y: 250 },
    hour: { open: '2025-08-20T09:00:00', close: '2025-08-20T18:00:00' },
    images: ['https://avatars.githubusercontent.com/u/220365751?s=200&v=4','/img-02.jpg'],
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
    title: 'title2',
    content:
      'content2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum error consequatur qui nostrum voluptatem vero saepe velit nesciunt fugit et nemo eius perspiciatis, consequuntur, temporibus exercitationem similique minima ab rem!',
  },
];
