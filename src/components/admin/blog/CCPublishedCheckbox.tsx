"use client";

interface CCPublishedCheckboxProps {
  postId: number;
  published: boolean;
}

export default function CCPublishedCheckbox({
  postId,
  published,
}: CCPublishedCheckboxProps) {
  const handleTogglePublic = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    console.log(postId, published);
  };

  return (
    <label
      className="flex items-center gap-2 cursor-pointer"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="checkbox"
        checked={published}
        onChange={handleTogglePublic}
        className="rounded z-20"
      />
      <span className="text-sm">외부 공개</span>
    </label>
  );
}
