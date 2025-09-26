import { BlogCreateRequest, BlogUpdateRequest } from "@/types/blog";
import { apiClient } from "@/lib/clientIntercept";

export async function createBlog(body: BlogCreateRequest) {
  const res = await apiClient.post(`/blog/create`, body);
  return res.data; // GlobalResponse 래핑 → 인터셉터에서 data만 추출되도록 설정했다면 그대로 반환됨
}

export async function updateBlog(body: BlogUpdateRequest) {
  const res = await apiClient.put(`/blog/update`, body);
  return res.data;
}

export async function deleteBlog(body: { blogId: number }) {
  const res = await apiClient.delete(`/blog/delete`, { data: body });
  return res.data;
}
