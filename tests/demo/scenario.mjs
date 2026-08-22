export default async function bingoBlitzScenario(a, b) {
  await a.getByRole("button", { name: /Says hello/ }).waitFor({ timeout: 10_000 });
  await a.getByRole("button", { name: /Says hello/ }).click();
  await b.getByRole("button", { name: /Says hello.*1 claim/ }).waitFor({ timeout: 10_000 });
  await b.getByRole("button", { name: /Shares a win/ }).click();
  await a.getByRole("button", { name: /Shares a win.*1 claim/ }).waitFor({ timeout: 10_000 });
  await a.waitForTimeout(1_000);
}
