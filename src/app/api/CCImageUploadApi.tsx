import { NewPageCategoryType } from "@/types/newPageForm";
import { apiClient } from "@/lib/clientIntercept";

export const imageUploadApi = {
  // 이미지 업로드
  uploadImage: async (file: Blob, type: NewPageCategoryType) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    const res = await apiClient.post("/files/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};
