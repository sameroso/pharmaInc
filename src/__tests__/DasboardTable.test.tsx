/* eslint-disable jest/no-mocks-import */
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ErrorModule } from "components";
import { DashBoard } from "pages/dashboard";
import { mock } from "mocks/users";
import * as randomUser from "api/axios/randomUser";

const mocked = jest.spyOn(randomUser, "getRandomUser");

describe("Dashboard table Table", () => {
  mocked.mockReturnValue({ data: { results: mock } } as any);

  render(
    <MemoryRouter initialEntries={["?page=2"]}>
      <ErrorModule.ErrorContainerProvider>
        <DashBoard />
      </ErrorModule.ErrorContainerProvider>
    </MemoryRouter>
  );

  test("Render rows with correct data", async () => {
    const tableRows = await waitFor(() => {
      return screen.getByTestId("tbody");
    });

    const name = tableRows.children[0].children[0].textContent;
    const gender = tableRows.children[0].children[1].textContent;
    const birth = tableRows.children[0].children[2].textContent;

    expect(tableRows.children.length).toBe(3);
    expect(gender).toBe("female");
    expect(birth).toBe("7/27/1970");
    expect(name).toBe("Lotta Hanka");
  });
});
