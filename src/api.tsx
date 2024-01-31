import axios from "axios";
import { GroupProps } from "./Group/Group";
import { MusicianProps } from "./Musicians/Musician/Musician";

const baseURL = import.meta.env.VITE_API_URL as string;

const api = axios.create({
  baseURL: baseURL,
});

export const getRoot = () => {
  return api.get("/");
};

export const getUsers = () => {
  return api.get("/users/");
};

export const getGroup = () => {
  return api.get<GroupProps>("/group/");
};

export const getMusicians = () => {
  return api.get<MusicianProps[]>("/musicians/");
};

export const patchMusician = (
  id: number,
  bio: string,
  name: string,
  headshot_id: string,
  user_token: string
) => {
  return api.patch<MusicianProps>(
    `/musicians/${id}/`,
    { id, bio, name, headshot_id },
    { headers: { Authorization: `Bearer ${user_token}` } }
  );
};

export const patchGroup = (
  id: number,
  bio: string,
  name: string,
  user_token: string
) => {
  return api.patch<GroupProps>(
    `/group/`,
    { id, bio, name },
    { headers: { Authorization: `Bearer ${user_token}` } }
  );
};

export const postHeadshot = (id: number, file: File, user_token: string) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post<MusicianProps>(`/musicians/${id}/headshot`, formData, {
    headers: { Authorization: `Bearer ${user_token}` },
  });
};

export const postMessage = (name: string, email: string, message: string) => {
  return api.post("/contact/", { name, email, message });
};
