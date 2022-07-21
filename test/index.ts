import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from 'ethers';

describe("Solution", function () {
  let solutionContract: Contract;

  async function getAnswer(inputValueString: string): Promise<string> {
    const inputValue = inputValueString.split(',').map(item => {
      return item === 'null' ? "127" : item
    });
    const tx = await solutionContract.findMultiple(inputValue);
    await tx.wait();
    const answer = await solutionContract.getResult();
    const result = answer.join(',').replace(/127/g, ';').replace(/,;/g, ';').replace(/;,/g, ';');
    return result.slice(0, -1);
  }

  describe("Deploy", () => {
    it("Should deploy the contracts", async () => {
      const Solution = await ethers.getContractFactory("Solution");
      solutionContract = await Solution.deploy();
    });
  });

  describe("TestCase 1", () => {
    it("Should check testcase 1", async () => {
      const inputValueString = '1,2,3,4,null,2,4,null,null,4';
      const outputValueString = '2,4;4';
      console.log('answer: ', await getAnswer(inputValueString));
      expect(await getAnswer(inputValueString)).to.equal(outputValueString);
    });
  });

  describe("TestCase 2", () => {
    it("Should check testcase 2", async () => {
      const inputValueString = '2,1,1';
      const outputValueString = '1';
      expect(await getAnswer(inputValueString)).to.equal(outputValueString);
    });
  });

  describe("TestCase 3", () => {
    it("Should check testcase 3", async () => {
      const inputValueString = '2,2,2,3,null,3,null';
      const outputValueString = '3;2,3';
      expect(await getAnswer(inputValueString)).to.equal(outputValueString);
    });
  });
});
