import { fetchWithAuth } from "@/lib/serverIntercept";
import { BlogsKeywordSearch } from "@/types/blog";

export async function searchBlogsByKeyword(
  filters: BlogsKeywordSearch,
  options: { page?: number; size?: number; sort?: string }
) {
  const params = new URLSearchParams();
  if (filters.search) params.append("search", filters.search);
  if (filters.category) params.append("category", filters.category);
  params.append("page", String(options?.page ?? 0));
  params.append("size", String(options?.size ?? 10));
  params.append("sort", options?.sort ?? "createdAt,desc");

  const response = await fetch(
    `${process.env.API_URL}/blog/keyword?${params.toString()}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch blogs: ${response.statusText}`);
  }

  const { data } = await response.json();
  return data;
}

export async function searchBlogDetail(blogId: number) {
  const response = await fetch(
    `${process.env.API_URL}/blog/detail?blogId=${blogId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch blog detail: ${response.statusText}`);
  }

  const { data } = await response.json();
  return data;
}

export async function getBlogReference() {
  const response = await fetchWithAuth("/blog/blog/reference", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return [];
  }

  const { data } = await response.json();
  return data;
}
