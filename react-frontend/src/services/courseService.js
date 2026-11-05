import API from './api';

export const fetchCourses = async () => {
  const response = await API.get('/courses');
  return response.data;
};

export const fetchCourseById = async (id) => {
  const response = await API.get(`/courses/${id}`);
  return response.data;
};