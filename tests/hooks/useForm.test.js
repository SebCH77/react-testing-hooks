import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useForm } from "../../src/hooks/useForm";

describe("Pruebas en el useForm", () => {
  const initialForm = {
    name: "Sebastian Carrillo",
    email: "scarrillo@gmail.com",
  };

  test("Debe de retornar los valores iniciales ", () => {
    const { result } = renderHook(() => useForm());
    const { formState } = result.current;
    expect(formState).toEqual({});
  });

  test("Debe de retornar los valores iniciales especificos", () => {
    const { result } = renderHook(() => useForm(initialForm));
    expect(result.current).toEqual({
      name: initialForm.name,
      email: initialForm.email,
      formState: initialForm,
      onInputChange: expect.any(Function),
      onResetForm: expect.any(Function),
    });
  });

  test("Debe de cambiar el nombre del formulario", () => {
    const newName = "Juano";
    const { result } = renderHook(() => useForm(initialForm));
    const { onInputChange } = result.current;

    act(() => {
      onInputChange({ target: { name: "name", value: newName } });
    });

    expect(result.current.name).toBe("Juano");
    expect(result.current.formState.name).toBe("Juano");
  });

  test("Debe de resetear el formulario", () => {
    const newName = "Juano";
    const { result } = renderHook(() => useForm(initialForm));
    const { onInputChange, onResetForm } = result.current;

    act(() => {
      onInputChange({ target: { name: "name", value: newName } });
      onResetForm();
    });

    expect(result.current.name).toBe(initialForm.name);
    expect(result.current.formState.name).toBe(initialForm.name);
  });
});
