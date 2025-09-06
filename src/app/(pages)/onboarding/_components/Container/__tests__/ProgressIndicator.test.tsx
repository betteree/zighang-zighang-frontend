import React from "react";
import { render, screen } from "@testing-library/react";
import { ProgressIndicator } from "../ProgressIndicator";

describe("ProgressIndicator", () => {
  it("현재 단계만 활성화되어 렌더링됨", () => {
    render(<ProgressIndicator stepNumber={2} totalSteps={5} />);
    
    // 현재 단계만 활성화되어 숫자를 표시
    expect(screen.getByText("2")).toBeInTheDocument();
    
    // 다른 단계들은 숫자를 표시하지 않음
    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.queryByText("3")).not.toBeInTheDocument();
    expect(screen.queryByText("4")).not.toBeInTheDocument();
    expect(screen.queryByText("5")).not.toBeInTheDocument();
  });

  it("단일 단계 처리", () => {
    render(<ProgressIndicator stepNumber={1} totalSteps={1} />);
    
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("0단계 처리", () => {
    const { container } = render(<ProgressIndicator stepNumber={0} totalSteps={0} />);
    
    // 0단계일 때는 빈 컨테이너만 렌더링됨
    expect(container.firstChild).toBeInTheDocument();
    expect(container.querySelector('.gap-\\[6px\\]')).toBeInTheDocument();
  });

  it("대량 단계 처리", () => {
    render(<ProgressIndicator stepNumber={10} totalSteps={20} />);
    
    expect(screen.getByText("10")).toBeInTheDocument();
    
    for (let i = 1; i <= 9; i++) {
      expect(screen.queryByText(i.toString())).not.toBeInTheDocument();
    }
    for (let i = 11; i <= 20; i++) {
      expect(screen.queryByText(i.toString())).not.toBeInTheDocument();
    }
  });

  it("에러 없이 정상 렌더링됨", () => {
    expect(() => {
      render(<ProgressIndicator stepNumber={1} totalSteps={3} />);
    }).not.toThrow();
  });
});
