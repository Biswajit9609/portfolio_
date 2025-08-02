import axios from 'axios';

const API = axios.create({
  baseURL: 'https://portfolio-pl6k.onrender.com/api'
});

const createFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return formData;
};

export const getAllProjects = () => API.get('/projects');

export const addProject = (projectData) => API.post(
  '/projects/add-project',
  createFormData(projectData),
  {
    headers: { 'Content-Type': 'multipart/form-data' }
  }
);

export const deleteProject = (id) => API.delete(`/projects/delete/${id}`);

export const getAllArticles = () => API.get('/articles');

export const addArticle = (articleData) => API.post('/articles/add-article', articleData);

export const deleteArticle = (id) => API.delete(`/articles/delete/${id}`);

export const getAllCodes = () => API.get('/codes');

export const addCode = (codeData) => API.post('/codes/add-code', codeData);

export const deleteCode = (id) => API.delete(`/codes/delete/${id}`);

export const updateProject = (id, projectData) => API.put(`/projects/update/${id}`, projectData);

export const updateArticle = (id, articleData) => API.put(`/articles/update/${id}`, articleData);

export const updateCode = (id, codeData) => API.put(`/codes/update/${id}`, codeData);
