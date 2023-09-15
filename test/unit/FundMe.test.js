const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", () => {
          let fundMe;
          let deployer;
          let mockV3Aggregator;
          const sendValue = ethers.parseEther("1"); // 1 ETH
          beforeEach(async () => {
              // deploy our FundMe contract
              // using hardhat-deploy
              deployer = (await getNamedAccounts()).deployer;
              await deployments.fixture(["all"]);
              fundMe = await ethers.getContract("FundMe", deployer);
              mockV3Aggregator = await ethers.getContract(
                  "MockV3Aggregator",
                  deployer
              );
          });

          describe("constructor", async () => {
              it("sets the aggregator addresses correctly", async () => {
                  const response = await fundMe.getPriceFeed();
                  assert.equal(response, mockV3Aggregator.target);
              });
          });

          describe("getOnwer", async () => {
              it("Outputs owner's address", async () => {
                  const response = await fundMe.getOwner();
                  assert.equal(response, deployer);
              });
          });

          describe("fund", async () => {
              it("Fails if you don't send enough ETH", async () => {
                  await expect(fundMe.fund()).to.be.revertedWithCustomError(
                      fundMe,
                      "FundMe__NotEnough"
                  );
              });

              it("Updated the amount funded data structure", async () => {
                  await fundMe.fund({ value: sendValue });
                  const response = await fundMe.getAddressToAmountFunded(
                      deployer
                  );
                  assert.equal(response.toString(), sendValue.toString());
              });

              it("Adds funder to array of getFunder", async () => {
                  await fundMe.fund({ value: sendValue });
                  const funder = await fundMe.getFunder(0);
                  assert.equal(funder, deployer);
              });

              /**
               * @notice receive() and fallback() put funders in the "s_funders" if they sent crypto to an address without using fund()
               * @dev Both functions call fund(), so only receive() was tested.
               */
              it("Invokes the contract's receive function if ETH was sent directly to the smart-contract's address", async () => {
                  const accounts = await ethers.getSigners();
                  const signer = accounts[1];

                  await signer.sendTransaction({
                      to: fundMe.target,
                      value: sendValue, // checking for the minimum send value also works here
                  });

                  const response = await fundMe.getAddressToAmountFunded(
                      signer
                  );
                  assert.equal(response.toString(), sendValue.toString());
              });
          });

          describe("withdraw", async () => {
              beforeEach(async () => {
                  await fundMe.fund({ value: sendValue });
              });

              it("Withdraws from a single founder", async () => {
                  // Arrange
                  const startingFundMeBalance =
                      await ethers.provider.getBalance(fundMe.target);
                  const startingDeployerBalance =
                      await ethers.provider.getBalance(deployer);

                  // Act
                  const transactionResponse = await fundMe.withdraw();
                  const transactionReceipt = await transactionResponse.wait(1);
                  const { gasUsed, gasPrice } = transactionReceipt;
                  const gasCost = gasUsed * gasPrice;
                  const endingFundMeBalance = await ethers.provider.getBalance(
                      fundMe.target
                  );
                  const endingDeployerBalance =
                      await ethers.provider.getBalance(deployer);
                  // gasCost
                  // Assert
                  assert.equal(endingFundMeBalance, 0);
                  assert.equal(
                      startingFundMeBalance + startingDeployerBalance,
                      (endingDeployerBalance + gasCost).toString()
                  );
              });

              it("Allows us to withdraw multiple funders", async () => {
                  const accounts = await ethers.getSigners();

                  // starts with 1 'cause 0 is deployer
                  for (let i = 1; i < 6; i++) {
                      const fundMeConnectedContract = await fundMe.connect(
                          accounts[i]
                      );
                      await fundMeConnectedContract.fund({ value: sendValue });
                  }

                  const startingFundMeBalance =
                      await ethers.provider.getBalance(fundMe.target);
                  const startingDeployerBalance =
                      await ethers.provider.getBalance(deployer);

                  const transactionResponse = await fundMe.withdraw();
                  const transactionReceipt = await transactionResponse.wait(1);
                  const { gasUsed, gasPrice } = transactionReceipt;
                  const gasCost = gasUsed * gasPrice;

                  const endingFundMeBalance = await ethers.provider.getBalance(
                      fundMe.target
                  );
                  const endingDeployerBalance =
                      await ethers.provider.getBalance(deployer);

                  assert.equal(endingFundMeBalance, 0);
                  assert.equal(
                      startingFundMeBalance + startingDeployerBalance,
                      (endingDeployerBalance + gasCost).toString()
                  );

                  // Make sure that the getFunder are reset properly
                  await expect(fundMe.getFunder(0)).to.be.reverted;

                  for (let i = 1; i < 6; i++) {
                      assert.equal(
                          await fundMe.getAddressToAmountFunded(
                              accounts[i].address
                          ),
                          0
                      );
                  }
              });

              it("Only allows the owner to withdraw", async () => {
                  const accounts = await ethers.getSigners();
                  const fundMeConnectedContract = await fundMe.connect(
                      accounts[1]
                  );
                  await expect(
                      fundMeConnectedContract.withdraw()
                  ).to.be.revertedWithCustomError(fundMe, "FundMe__NotOwner");
              });
          });
      });
