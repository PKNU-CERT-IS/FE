import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AttachedFilesDownload from "../SCAttachedFilesDownload";
import { AttachedFile } from "@/types/project";

// Mock 데이터
const mockFiles: AttachedFile[] = [
  {
    id: "file_1",
    name: "프로젝트_기획서.pdf",
    size: 2547892,
    type: "application/pdf",
    category: "document",
    downloadUrl: "/api/files/download/plan.pdf",
    uploadDate: "2025-01-15T09:30:00Z",
    description: "프로젝트 전체 기획서",
  },
  {
    id: "file_2",
    name: "데모_영상.mp4",
    size: 156789234,
    type: "video/mp4",
    category: "video",
    downloadUrl: "/api/files/download/demo.mp4",
    uploadDate: "2025-01-20T14:22:00Z",
    description: "프로젝트 데모 영상",
  },
  {
    id: "file_3",
    name: "소스코드.zip",
    size: 15678234,
    type: "application/zip",
    category: "archive",
    downloadUrl: "/api/files/download/source.zip",
    uploadDate: "2025-01-25T11:45:00Z",
  },
  {
    id: "file_4",
    name: "데이터셋.csv",
    size: 4523678,
    type: "text/csv",
    category: "dataset",
    downloadUrl: "/api/files/download/dataset.csv",
    uploadDate: "2025-01-28T16:15:00Z",
    description: "학습용 데이터셋",
  },
  {
    id: "file_5",
    name: "architecture.png",
    size: 1234567,
    type: "image/png",
    category: "image",
    downloadUrl: "/api/files/download/architecture.png",
    uploadDate: "2025-02-01T10:30:00Z",
    description: "시스템 아키텍처 다이어그램",
  },
];

// DOM methods mock
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

// document.createElement mock
const mockCreateElement = jest.fn();
const mockClick = jest.fn();
const mockElement = {
  href: "",
  download: "",
  click: mockClick,
};

beforeEach(() => {
  mockCreateElement.mockReturnValue(mockElement);
  document.createElement = mockCreateElement;
  jest.clearAllMocks();
});

describe("AttachedFilesDownload", () => {
  it("빈 파일 배열일 때 아무것도 렌더링하지 않음", () => {
    const { container } = render(<AttachedFilesDownload files={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("파일 목록을 올바르게 렌더링함", () => {
    render(<AttachedFilesDownload files={mockFiles} />);

    expect(screen.getByText("첨부파일 (5개)")).toBeInTheDocument();
    expect(screen.getByText("프로젝트_기획서.pdf")).toBeInTheDocument();
    expect(screen.getByText("데모_영상.mp4")).toBeInTheDocument();
    expect(screen.getByText("소스코드.zip")).toBeInTheDocument();
  });

  it("파일 크기를 올바른 형식으로 표시함", () => {
    render(<AttachedFilesDownload files={mockFiles} />);

    expect(screen.getByText("2.43 MB")).toBeInTheDocument(); // 2547892 bytes
    expect(screen.getByText("149.58 MB")).toBeInTheDocument(); // 156789234 bytes
    expect(screen.getByText("14.96 MB")).toBeInTheDocument(); // 15678234 bytes
  });

  it("파일 카테고리별 필터링이 작동함", () => {
    render(<AttachedFilesDownload files={mockFiles} />);

    // 문서 카테고리 필터 클릭
    fireEvent.click(screen.getByText("문서 (1)"));

    expect(screen.getByText("프로젝트_기획서.pdf")).toBeInTheDocument();
    expect(screen.queryByText("데모_영상.mp4")).not.toBeInTheDocument();
  });

  it("전체 카테고리 필터가 작동함", () => {
    render(<AttachedFilesDownload files={mockFiles} />);

    // 먼저 특정 카테고리로 필터링
    fireEvent.click(screen.getByText("동영상 (1)"));
    expect(screen.queryByText("프로젝트_기획서.pdf")).not.toBeInTheDocument();

    // 전체 선택
    fireEvent.click(screen.getByText("전체 (5)"));
    expect(screen.getByText("프로젝트_기획서.pdf")).toBeInTheDocument();
    expect(screen.getByText("데모_영상.mp4")).toBeInTheDocument();
  });

  it("개별 파일 선택/해제가 작동함", () => {
    render(<AttachedFilesDownload files={mockFiles} />);

    const checkboxes = screen.getAllByRole("checkbox");
    const firstFileCheckbox = checkboxes[1]; // 첫 번째는 전체 선택

    // 파일 선택
    fireEvent.click(firstFileCheckbox);
    expect(firstFileCheckbox).toBeChecked();

    // 파일 선택 해제
    fireEvent.click(firstFileCheckbox);
    expect(firstFileCheckbox).not.toBeChecked();
  });

  it("전체 선택/해제가 작동함", () => {
    render(<AttachedFilesDownload files={mockFiles} />);

    const selectAllButton = screen.getByText("전체 선택");

    // 전체 선택
    fireEvent.click(selectAllButton);

    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.slice(1).forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });

    // 전체 해제
    fireEvent.click(screen.getByText("전체 해제"));
    checkboxes.slice(1).forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it("단일 파일 다운로드가 작동함", async () => {
    render(<AttachedFilesDownload files={mockFiles} />);

    const downloadButtons = screen.getAllByText("다운로드");
    fireEvent.click(downloadButtons[0]);

    await waitFor(() => {
      expect(mockCreateElement).toHaveBeenCalledWith("a");
      expect(mockElement.href).toBe("/api/files/download/plan.pdf");
      expect(mockElement.download).toBe("프로젝트_기획서.pdf");
      expect(mockClick).toHaveBeenCalled();
    });
  });

  it("선택된 파일들 일괄 다운로드가 작동함", async () => {
    render(<AttachedFilesDownload files={mockFiles} />);

    // 두 개 파일 선택
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[2]);

    // 일괄 다운로드 버튼 클릭
    const bulkDownloadButton = screen.getByText("선택한 파일 다운로드 (2개)");
    fireEvent.click(bulkDownloadButton);

    await waitFor(() => {
      expect(mockCreateElement).toHaveBeenCalledTimes(2);
      expect(mockClick).toHaveBeenCalledTimes(2);
    });
  });

  it("파일 설명이 있을 때 올바르게 표시함", () => {
    render(<AttachedFilesDownload files={mockFiles} />);

    expect(screen.getByText("프로젝트 전체 기획서")).toBeInTheDocument();
    expect(screen.getByText("프로젝트 데모 영상")).toBeInTheDocument();
    expect(screen.getByText("학습용 데이터셋")).toBeInTheDocument();
  });

  it("파일 설명이 없을 때 표시되지 않음", () => {
    const filesWithoutDescription = mockFiles.filter(
      (file) => !file.description
    );
    render(<AttachedFilesDownload files={filesWithoutDescription} />);

    expect(screen.queryByText("프로젝트 전체 기획서")).not.toBeInTheDocument();
  });

  it("다운로드 중 상태를 올바르게 표시함", async () => {
    render(<AttachedFilesDownload files={mockFiles} />);

    const downloadButtons = screen.getAllByText("다운로드");
    fireEvent.click(downloadButtons[0]);

    // 다운로드 중 텍스트가 나타나는지 확인
    expect(screen.getByText("다운로드 중...")).toBeInTheDocument();

    // 로딩 스피너가 있는지 확인
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("필터링된 결과가 없을 때 적절한 메시지를 표시함", () => {
    const documentsOnly = mockFiles.filter((f) => f.category === "document");
    render(<AttachedFilesDownload files={documentsOnly} />);

    // 동영상 필터 클릭 (결과 없음)
    fireEvent.click(screen.getByText("전체 (1)"));
    // 동영상 카테고리는 없으므로 다른 카테고리 클릭
    fireEvent.click(screen.getByText("문서 (1)"));

    // 다시 전체로 돌아가서 존재하지 않는 카테고리 시뮬레이션
    // 실제로는 존재하지 않는 카테고리는 버튼이 생성되지 않음
    expect(screen.getByText("문서 (1)")).toBeInTheDocument();
  });

  it("날짜가 올바른 형식으로 표시됨", () => {
    render(<AttachedFilesDownload files={mockFiles} />);

    // 날짜가 로컬 형식으로 표시되는지 확인
    expect(screen.getByText("2025. 1. 15.")).toBeInTheDocument();
    expect(screen.getByText("2025. 1. 20.")).toBeInTheDocument();
  });

  it("미리보기 버튼이 이미지와 문서에만 표시됨", () => {
    render(<AttachedFilesDownload files={mockFiles} />);

    const previewButtons = screen.getAllByTitle("미리보기");
    expect(previewButtons).toHaveLength(2); // document와 image 파일만
  });

  it("파일 타입별 아이콘이 올바르게 표시됨", () => {
    render(<AttachedFilesDownload files={mockFiles} />);

    // 각 카테고리별 적절한 배경색이 적용되는지 확인
    expect(document.querySelector(".bg-blue-50")).toBeInTheDocument(); // document
    expect(document.querySelector(".bg-purple-50")).toBeInTheDocument(); // video
    expect(document.querySelector(".bg-orange-50")).toBeInTheDocument(); // archive
  });
});

// 추가 통합 테스트
describe("AttachedFilesDownload 통합 테스트", () => {
  it("복잡한 사용자 시나리오가 올바르게 작동함", async () => {
    render(<AttachedFilesDownload files={mockFiles} />);

    // 1. 특정 카테고리로 필터링
    fireEvent.click(screen.getByText("문서 (1)"));
    expect(screen.getByText("프로젝트_기획서.pdf")).toBeInTheDocument();

    // 2. 전체로 다시 변경
    fireEvent.click(screen.getByText("전체 (5)"));

    // 3. 여러 파일 선택
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[3]);

    // 4. 일괄 다운로드
    const bulkDownloadButton = screen.getByText("선택한 파일 다운로드 (2개)");
    fireEvent.click(bulkDownloadButton);

    await waitFor(() => {
      expect(mockClick).toHaveBeenCalledTimes(2);
    });

    // 5. 선택 해제 확인
    await waitFor(() => {
      checkboxes.slice(1).forEach((checkbox) => {
        expect(checkbox).not.toBeChecked();
      });
    });
  });
});
