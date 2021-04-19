import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";

test("Renders react admin", async () => {
  act(() => {
    render(<App />);
  });
  const reactAdmin = screen.getByText(/Welcome to React-admin/i);
  await waitFor(() => expect(reactAdmin).toBeInTheDocument());
});
