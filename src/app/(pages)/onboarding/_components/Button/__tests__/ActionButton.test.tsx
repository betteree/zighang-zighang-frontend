import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ActionButton } from "../ActionButton";

describe("ActionButton", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("기본적으로 disabled 상태로 렌더링됨", () => {
    render(<ActionButton onClick={mockOnClick}>버튼</ActionButton>);

    const button = screen.getByRole("button", { name: "버튼" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("bg-gray-400", "cursor-not-allowed");
  });

  it("disabled 상태에서 클릭해도 onClick이 호출되지 않음", () => {
    render(<ActionButton onClick={mockOnClick}>버튼</ActionButton>);

    const button = screen.getByRole("button", { name: "버튼" });
    fireEvent.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("abled 상태로 렌더링됨", () => {
    render(
      <ActionButton onClick={mockOnClick} state="abled">
        버튼
      </ActionButton>
    );

    const button = screen.getByRole("button", { name: "버튼" });
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass("bg-[#7951FF]", "cursor-pointer");
  });

  it("abled 상태에서 클릭하면 onClick이 호출됨", () => {
    render(
      <ActionButton onClick={mockOnClick} state="abled">
        버튼
      </ActionButton>
    );

    const button = screen.getByRole("button", { name: "버튼" });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("children 내용이 올바르게 표시됨", () => {
    render(<ActionButton onClick={mockOnClick}>확인 버튼</ActionButton>);

    expect(screen.getByText("확인 버튼")).toBeInTheDocument();
  });

  it("기본 스타일 클래스들이 적용됨", () => {
    render(<ActionButton onClick={mockOnClick}>버튼</ActionButton>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "text-Button2-16sb",
      "w-[156px]",
      "h-[42px]",
      "text-white",
      "rounded-[8px]",
      "transition-all",
      "duration-200"
    );
  });

  it("hover 효과가 abled 상태에만 적용됨", () => {
    render(
      <ActionButton onClick={mockOnClick} state="abled">
        버튼
      </ActionButton>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-[#6B47E6]");
  });

  it("disabled 상태에서는 hover 효과가 없음", () => {
    render(
      <ActionButton onClick={mockOnClick} state="disabled">
        버튼
      </ActionButton>
    );

    const button = screen.getByRole("button");
    expect(button).not.toHaveClass("hover:bg-[#6B47E6]");
  });

  it("state prop이 없으면 disabled로 처리됨", () => {
    render(<ActionButton onClick={mockOnClick}>버튼</ActionButton>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("bg-gray-400");
  });

  it("잘못된 state 값이 전달되면 disabled 스타일이 적용됨", () => {
    render(
      <ActionButton
        onClick={mockOnClick}
        state={"invalid" as unknown as "disabled" | "abled"}
      >
        버튼
      </ActionButton>
    );

    const button = screen.getByRole("button");
    // 잘못된 state 값은 default 케이스로 처리되어 disabled 스타일 적용
    expect(button).toHaveClass("bg-gray-400", "cursor-not-allowed");
    // 하지만 disabled 속성은 state === "disabled"일 때만 true
    expect(button).not.toBeDisabled();
  });
});
