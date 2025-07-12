"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AngleSVG from "/public/icons/angle.svg";
import { getPageNumbers } from "@/utils/paginationUtils";

interface ProfilePaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function CCProfilePagination({
  currentPage,
  totalItems,
  itemsPerPage,
}: ProfilePaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "study";

  const createPageUrl = (page: number): string => {
    const queryParams = new URLSearchParams({
      ...(tab && { tab }),
      ...(page > 1 && { page: page.toString() }),
    });

    return `/profile?${queryParams.toString()}`;
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {currentPage > 1 ? (
        <Link href={createPageUrl(currentPage - 1)}>
          <div className="inline-flex items-center justify-center h-9 px-3.5 rounded-md border border-gray-300 text-gray-600 hover:bg-cert-red hover:border-cert-red hover:text-white transition-colors">
            <AngleSVG className="rotate-90" width={8} />
          </div>
        </Link>
      ) : (
        <div className="inline-flex items-center justify-center h-9 px-3.5 rounded-md border border-gray-300 text-gray-400 opacity-50 cursor-not-allowed">
          <AngleSVG className="rotate-90" width={8} />
        </div>
      )}

      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
              ...
            </span>
          );
        }

        const pageNumber = page as number;

        return pageNumber === currentPage ? (
          <div
            key={pageNumber}
            className="inline-flex items-center justify-center h-9 px-3 rounded-md bg-cert-red text-white min-w-[40px]"
          >
            {pageNumber}
          </div>
        ) : (
          <Link key={pageNumber} href={createPageUrl(pageNumber)}>
            <div className="inline-flex items-center justify-center h-9 px-3 rounded-md border border-gray-300 text-gray-600 hover:bg-cert-red hover:border-cert-red hover:text-white transition-colors min-w-[40px]">
              {pageNumber}
            </div>
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link href={createPageUrl(currentPage + 1)}>
          <div className="inline-flex items-center justify-center h-9 px-3.5 rounded-md border border-gray-300 text-gray-600 hover:bg-cert-red hover:border-cert-red hover:text-white transition-colors">
            <AngleSVG className="rotate-270" width={8} />
          </div>
        </Link>
      ) : (
        <div className="inline-flex items-center justify-center h-9 px-3.5 rounded-md border border-gray-300 text-gray-400 opacity-50 cursor-not-allowed">
          <AngleSVG className="rotate-270" width={8} />
        </div>
      )}
    </div>
  );
}
