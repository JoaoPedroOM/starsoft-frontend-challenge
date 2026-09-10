import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/Button";

jest.mock("@/components/Button/styles.module.scss", () => ({
  button: "button",
  fullWidth: "fullWidth",
}));

describe("Button", () => {
  it("renderiza o texto filho", () => {
    render(<Button>COMPRAR</Button>);
    expect(screen.getByRole("button", { name: /COMPRAR/i })).toBeInTheDocument();
  });

  it("chama onClick ao clicar", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>OK</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fica desabilitado quando disabled=true", () => {
    render(<Button disabled>OK</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("não chama onClick quando desabilitado", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled>OK</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
