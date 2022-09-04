import { assert, expect, test } from "vitest";
import contractAbi from "../../src/assets/contract_ABI.json";

test("Test if contractAbi exist", () => {
expect(contractAbi).toBeDefined()
});
