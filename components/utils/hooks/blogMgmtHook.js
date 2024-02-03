import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ENDPOINTS } from "../constants/endpoints";
import Cookies from "universal-cookie";
const cookies = new Cookies();
var baseURL = process.env.NEXT_PUBLIC_APP_URL;

//get access token
var ACCESS_TOKEN, sessionToken;
if (typeof window != "undefined") {
  sessionToken = sessionStorage.getItem("TM_STF_TK");
  sessionToken != undefined
    ? (ACCESS_TOKEN = sessionToken)
    : (ACCESS_TOKEN = undefined);
}

//--> call back function to get all blog posts
const getAllBlogPosts = () => {
  const url = baseURL + ENDPOINTS.blogs;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetBlogPostsHook = (onSuccess, onError) => {
  return useQuery("all_blog_posts", getAllBlogPosts, {
    onSuccess,
    onError,
    staleTime: Infinity,
  });
};

//--> call back function to get specific blog post
const getSelectedBlogPost = (id) => {
  const url = baseURL + ENDPOINTS.blogs + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.get(url, { headers: headers });
};

export const GetSelectedBlogPostHook = (onSuccess, onError, id) => {
  return useQuery(["selectedPost", id], () => getSelectedBlogPost(id), {
    onSuccess,
    onError,
    staleTime: Infinity,
  });
};

//--> call back function to add a blog post
const addBlogPost = (servicedata) => {
  const url = baseURL + ENDPOINTS.blogs;
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.post(url, servicedata, { headers: headers });
};

export const AddBlogPostHook = (onAddSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(addBlogPost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["all_blog_posts"]);
    },
    onAddSuccess,
    onError,
  });
};

//--> call back function to update a blog post
const updateBlogPost = (data) => {
  const url = baseURL + ENDPOINTS.blogs + `/${data?.id}`;
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  delete data?.id;
  return axios.patch(url, data, { headers: headers });
};

export const UpdateBlogPostHook = (onreqSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(updateBlogPost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["all_blog_posts"]);
    },
    onreqSuccess,
    onError,
  });
};

//--> call back function to delete a blog post
const deleteBlogPost = (id) => {
  const url = baseURL + ENDPOINTS.blogs + `/${id}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };
  return axios.delete(url, { headers: headers });
};

export const DeleteBlogPostHook = (onreqSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(deleteBlogPost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["all_blog_posts"]);
    },
    onreqSuccess,
    onError,
  });
};
