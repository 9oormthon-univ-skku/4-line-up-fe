import type { Booth, Post, Timeslot } from '@/types/schema';
import axiosInstance from './axios';
import { API_ENDPOINTS } from './endpoints';
import type { Dispatch, SetStateAction } from 'react';

export const getPosts = async (setPosts: Dispatch<SetStateAction<Post[]>>) => {
  const { data } = await axiosInstance.get<Post[]>(API_ENDPOINTS.GET_POSTS);
  setPosts(data);
};

export const getBooths = async (
  setBooths: Dispatch<SetStateAction<Booth[]>>
) => {
  const response = await axiosInstance.get<Booth[]>(API_ENDPOINTS.GET_BOOTHS);
  setBooths(response.data);
};

export const getTimeSlots = async (setTimeslots: Dispatch<SetStateAction<Timeslot[]>>) => {
  const { data } = await axiosInstance.get<Timeslot[]>(API_ENDPOINTS.GET_TIMETABLE);
  setTimeslots(data);
};