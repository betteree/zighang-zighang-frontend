import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SecondaryButton } from "../SecondaryButton";

describe("SecondaryButton", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("기본적으로 enabled 상태로 렌더링됨", () => {
    render(<SecondaryButton onClick={mockOnClick}>버튼</SecondaryButton>);

    const button = screen.getByRole("button", { name: "버튼" });
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass("bg-white", "text-gray-700", "cursor-pointer");
  });

  it("disabled=true이면 비활성화되어 렌더링됨", () => {
    render(
      <SecondaryButton onClick={mockOnClick} disabled>
        버튼
      </SecondaryButton>
    );

    const button = screen.getByRole("button", { name: "버튼" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "bg-gray-100",
      "text-gray-400",
      "cursor-not-allowed"
    );
  });

  it("enabled 상태에서 클릭하면 onClick이 호출됨", () => {
    render(<SecondaryButton onClick={mockOnClick}>버튼</SecondaryButton>);

    const button = screen.getByRole("button", { name: "버튼" });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("disabled 상태에서 클릭해도 onClick이 호출되지 않음", () => {
    render(
      <SecondaryButton onClick={mockOnClick} disabled>
        버튼
      </SecondaryButton>
    );

    const button = screen.getByRole("button", { name: "버튼" });
    fireEvent.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("children 내용이 올바르게 표시됨", () => {
    render(<SecondaryButton onClick={mockOnClick}>확인 버튼</SecondaryButton>);

    expect(screen.getByText("확인 버튼")).toBeInTheDocument();
  });

  it("기본 스타일 클래스들이 적용됨", () => {
    render(<SecondaryButton onClick={mockOnClick}>버튼</SecondaryButton>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "text-Button2-16sb",
      "w-[156px]",
      "h-[42px]",
      "rounded-[8px]",
      "transition-all",
      "duration-200",
      "border",
      "border-[#C5C5C8]"
    );
  });

  it("hover 관련 유틸 클래스가 명시적으로 정의되어 있지 않음(현재 구현 확인)", () => {
    render(<SecondaryButton onClick={mockOnClick}>버튼</SecondaryButton>);

    const button = screen.getByRole("button");
    // 구현 코드에는 hover 클래스가 없으므로 없는지 확인
    expect(button).not.toHaveClass("hover:bg-[#6B47E6]");
  });
});
