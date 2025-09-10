import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "@/app/(pages)/onboarding/_components/Dropdown/Dropdown";

describe("Dropdown", () => {
  const setup = async (props?: Partial<React.ComponentProps<typeof Dropdown>>) => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <Dropdown
        placeholder="선택하세요"
        options={[
          { value: "a", label: "옵션 A" },
          { value: "b", label: "옵션 B" },
          { value: "c", label: "옵션 C" },
        ]}
        value={null}
        onChange={onChange}
        {...props}
      />
    );
    return { user, onChange };
  };

  it("토글 클릭 시 목록이 열리고 닫힌다", async () => {
    const { user } = await setup();

    const button = screen.getByRole("button", { name: /선택하세요/i });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    await user.click(button);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    // 바깥 클릭으로 닫힘 확인: document.body 클릭
    await user.click(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("옵션 선택 시 onChange가 호출되고 닫힌다", async () => {
    const { user, onChange } = await setup();

    const button = screen.getByRole("button", { name: /선택하세요/i });
    await user.click(button);

    const option = screen.getByRole("option", { name: "옵션 B" });
    await user.click(option);

    expect(onChange).toHaveBeenCalledWith("b");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("disabled일 때 클릭해도 열리지 않는다", async () => {
    const { user } = await setup({ disabled: true });
    const button = screen.getByRole("button", { name: /비활성화됨|선택하세요/i });
    await user.click(button);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("value가 있으면 label이 버튼에 표시된다", async () => {
    await setup({ value: "c" });
    expect(screen.getByRole("button", { name: "옵션 C" })).toBeInTheDocument();
  });
});


