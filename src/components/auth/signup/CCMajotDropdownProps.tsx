"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, GraduationCap } from "lucide-react";
import {
  COLLEGE_DATA,
  getMajorUtils,
  SelectedMajorInfo,
  MajorDropdownState,
} from "@/types/major";

interface MajorDropdownProps {
  selectedMajor: SelectedMajorInfo;
  onMajorChange: (selection: SelectedMajorInfo) => void;
  errors?: {
    college?: string;
    department?: string;
    major?: string;
  };
}

export default function MajorDropdown({
  selectedMajor,
  onMajorChange,
  errors,
}: MajorDropdownProps) {
  const [dropdownState, setDropdownState] = useState<MajorDropdownState>({
    collegeOpen: false,
    departmentOpen: false,
    majorOpen: false,
  });

  // 각 드롭다운의 ref
  const collegeDropdownRef = useRef<HTMLDivElement>(null);
  const departmentDropdownRef = useRef<HTMLDivElement>(null);
  const majorDropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        collegeDropdownRef.current &&
        !collegeDropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownState((prev) => ({ ...prev, collegeOpen: false }));
      }
      if (
        departmentDropdownRef.current &&
        !departmentDropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownState((prev) => ({ ...prev, departmentOpen: false }));
      }
      if (
        majorDropdownRef.current &&
        !majorDropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownState((prev) => ({ ...prev, majorOpen: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 드롭다운 토글 함수
  const toggleDropdown = (type: keyof MajorDropdownState) => {
    setDropdownState((prev) => ({
      ...prev,
      [type]: !prev[type],
      // 다른 드롭다운들은 닫기
      ...(type !== "collegeOpen" && { collegeOpen: false }),
      ...(type !== "departmentOpen" && { departmentOpen: false }),
      ...(type !== "majorOpen" && { majorOpen: false }),
    }));
  };

  // 대학 선택
  const selectCollege = (collegeId: string) => {
    const newSelection = { college: collegeId };
    onMajorChange(newSelection);
    setDropdownState((prev) => ({ ...prev, collegeOpen: false }));
  };

  // 학부 선택
  const selectDepartment = (departmentId: string) => {
    const newSelection = {
      ...selectedMajor,
      department: departmentId,
      major: undefined, // 학부가 바뀌면 전공 초기화
    };
    onMajorChange(newSelection);
    setDropdownState((prev) => ({ ...prev, departmentOpen: false }));
  };

  // 전공 선택
  const selectMajor = (majorId: string) => {
    const newSelection = {
      ...selectedMajor,
      major: majorId,
    };
    onMajorChange(newSelection);
    setDropdownState((prev) => ({ ...prev, majorOpen: false }));
  };

  // 현재 선택된 값들로부터 표시할 텍스트 가져오기
  const getDisplayText = (type: "college" | "department" | "major") => {
    switch (type) {
      case "college":
        return selectedMajor.college
          ? getMajorUtils.getCollegeName(selectedMajor.college)
          : "대학을 선택해주세요";
      case "department":
        return selectedMajor.department
          ? getMajorUtils.getDepartmentName(selectedMajor.department)
          : "학부를 선택해주세요";
      case "major":
        return selectedMajor.major
          ? getMajorUtils.getMajorName(selectedMajor.major)
          : "전공을 선택해주세요";
      default:
        return "";
    }
  };

  // 선택 가능한 데이터 가져오기
  const availableDepartments = selectedMajor.college
    ? getMajorUtils.getDepartmentsByCollege(selectedMajor.college)
    : [];

  const availableMajors = selectedMajor.department
    ? getMajorUtils.getMajorsByDepartment(selectedMajor.department)
    : [];

  return (
    <div className="space-y-4">
      {/* 대학 선택 */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-200">
          대학
        </label>
        <div className="relative" ref={collegeDropdownRef}>
          <button
            type="button"
            onClick={() => toggleDropdown("collegeOpen")}
            className={`input-default px-3 py-2 text-sm text-left flex items-center justify-between cursor-pointer w-full ${
              errors?.college ? "border-red-500" : "dark:border-gray-600"
            }`}
          >
            <div className="flex items-center">
              <GraduationCap className="h-4 w-4 text-gray-400 dark:stroke-cert-red mr-2" />
              <span
                className={
                  selectedMajor.college
                    ? "text-gray-900 dark:text-gray-200"
                    : "text-gray-400"
                }
              >
                {getDisplayText("college")}
              </span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transform transition-transform ${
                dropdownState.collegeOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownState.collegeOpen && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600 max-h-60 overflow-y-auto">
              {COLLEGE_DATA.map((college) => (
                <button
                  key={college.id}
                  type="button"
                  onClick={() => selectCollege(college.id)}
                  className="w-full px-3 py-2 text-sm text-left text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-cert-red first:rounded-t-md last:rounded-b-md cursor-pointer transition-colors"
                >
                  {college.name}
                </button>
              ))}
            </div>
          )}
        </div>
        {errors?.college && (
          <p className="text-sm text-red-500">{errors.college}</p>
        )}
      </div>

      {/* 학부(과) 선택 */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-200">
          학부(과)
        </label>
        <div className="relative" ref={departmentDropdownRef}>
          <button
            type="button"
            onClick={() => toggleDropdown("departmentOpen")}
            disabled={!selectedMajor.college}
            className={`input-default px-3 py-2 text-sm text-left flex items-center justify-between cursor-pointer w-full ${
              errors?.department ? "border-red-500" : "dark:border-gray-600"
            } ${
              !selectedMajor.college
                ? "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900"
                : ""
            }`}
          >
            <div className="flex items-center">
              <GraduationCap className="h-4 w-4 text-gray-400 dark:stroke-cert-red mr-2" />
              <span
                className={
                  selectedMajor.department
                    ? "text-gray-900 dark:text-gray-200"
                    : "text-gray-400"
                }
              >
                {getDisplayText("department")}
              </span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transform transition-transform ${
                dropdownState.departmentOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownState.departmentOpen && selectedMajor.college && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600 max-h-60 overflow-y-auto">
              {availableDepartments.map((department) => (
                <button
                  key={department.id}
                  type="button"
                  onClick={() => selectDepartment(department.id)}
                  className="w-full px-3 py-2 text-sm text-left text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-cert-red first:rounded-t-md last:rounded-b-md cursor-pointer transition-colors"
                >
                  {department.name}
                </button>
              ))}
            </div>
          )}
        </div>
        {errors?.department && (
          <p className="text-sm text-red-500">{errors.department}</p>
        )}
      </div>

      {/* 전공 선택 */}
      <div className="space-y-2">
        <label className="font-medium text-gray-700 dark:text-gray-200">
          전공
        </label>
        <div className="relative" ref={majorDropdownRef}>
          <button
            type="button"
            onClick={() => toggleDropdown("majorOpen")}
            disabled={!selectedMajor.department}
            className={`input-default px-3 py-2 text-sm text-left flex items-center justify-between cursor-pointer w-full ${
              errors?.major ? "border-red-500" : "dark:border-gray-600"
            } ${
              !selectedMajor.department
                ? "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900"
                : ""
            }`}
          >
            <div className="flex items-center">
              <GraduationCap className="h-4 w-4 text-gray-400 dark:stroke-cert-red mr-2" />
              <span
                className={
                  selectedMajor.major
                    ? "text-gray-900 dark:text-gray-200"
                    : "text-gray-400"
                }
              >
                {getDisplayText("major")}
              </span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transform transition-transform ${
                dropdownState.majorOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownState.majorOpen && selectedMajor.department && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600 max-h-60 overflow-y-auto">
              {availableMajors.map((major) => (
                <button
                  key={major.id}
                  type="button"
                  onClick={() => selectMajor(major.id)}
                  className="w-full px-3 py-2 text-sm text-left text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-cert-red first:rounded-t-md last:rounded-b-md cursor-pointer transition-colors"
                >
                  {major.name}
                </button>
              ))}
            </div>
          )}
        </div>
        {errors?.major && (
          <p className="text-sm text-red-500">{errors.major}</p>
        )}
      </div>
    </div>
  );
}
