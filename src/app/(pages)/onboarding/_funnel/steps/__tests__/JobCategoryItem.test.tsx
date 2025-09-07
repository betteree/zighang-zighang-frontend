import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { JobCategoryItem } from "../JobCategoryItem";

describe("JobCategoryItem", () => {
  const mockOnClick = jest.fn();
  const label = "프론트엔드";

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("텍스트가 올바르게 표시됨", () => {
    render(
      <JobCategoryItem name={label} isSelected={false} onClick={mockOnClick} />
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("기본 스타일 클래스들이 적용됨", () => {
    render(
      <JobCategoryItem name={label} isSelected={false} onClick={mockOnClick} />
    );

    const button = screen.getByRole("button", { name: label });
    expect(button).toHaveClass(
      "py-[9px]",
      "px-[18px]",
      "rounded-lg",
      "border-[1px]",
      "text-Badge1-14m",
      "transition-all",
      "tracking-tight"
    );
  });

  it("isSelected=false 일 때 비선택 스타일 적용", () => {
    render(
      <JobCategoryItem name={label} isSelected={false} onClick={mockOnClick} />
    );

    const button = screen.getByRole("button", { name: label });
    expect(button).toHaveClass("border-[#EDEDED]", "bg-white", "text-gray-700");
    expect(button).not.toHaveClass(
      "border-purple-500",
      "bg-purple-50",
      "text-[#7951FF]"
    );
  });

  it("isSelected=true 일 때 선택 스타일 적용", () => {
    render(
      <JobCategoryItem name={label} isSelected={true} onClick={mockOnClick} />
    );

    const button = screen.getByRole("button", { name: label });
    expect(button).toHaveClass(
      "border-purple-500",
      "bg-purple-50",
      "text-[#7951FF]"
    );
    expect(button).not.toHaveClass(
      "border-[#EDEDED]",
      "bg-white",
      "text-gray-700"
    );
  });

  it("클릭 시 onClick 호출됨", () => {
    render(
      <JobCategoryItem name={label} isSelected={false} onClick={mockOnClick} />
    );

    const button = screen.getByRole("button", { name: label });
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("isSelected 값이 변경되면 스타일도 변경됨", () => {
    const { rerender } = render(
      <JobCategoryItem name={label} isSelected={false} onClick={mockOnClick} />
    );

    const button = screen.getByRole("button", { name: label });
    expect(button).toHaveClass("border-[#EDEDED]", "bg-white", "text-gray-700");

    rerender(
      <JobCategoryItem name={label} isSelected={true} onClick={mockOnClick} />
    );
    expect(button).toHaveClass(
      "border-purple-500",
      "bg-purple-50",
      "text-[#7951FF]"
    );
  });
});
