// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import './ERC721Mintable.sol';
import "./@openzeppelin/console.sol";

contract SolnSquareVerifier is ERC721Mintable{
    VerifierI private verifierC;

    struct Solution{
        uint256 solIndex;
        address solAddress;
        bool minted;
    }

    // Solution[] solutionsArray;

    // - chose to use a counter instead of length of array for gas optimisation
    uint256 solutionsCounter = 0; 

    mapping(bytes32 => Solution) private solutions;


    constructor(address verifierContractAdd, 
                string memory name, 
                string memory symbol, 
                string memory baseURI
                ) 
    ERC721Mintable(name, symbol, baseURI)
    { verifierC = VerifierI(verifierContractAdd); }

    
    event SolutionAdded(uint256 index, address from);
    event MintedSolution(uint256 index, address from);


    function addSolution(uint256[2] memory a, 
                         uint256[2][2] memory b, 
                         uint256[2] memory c, 
                         uint[2] memory input) external whenNotPaused{

        bytes32 solHash = keccak256(
            abi.encodePacked(input[0], input[1])
        );
        require(solutions[solHash].solAddress == address(0),"This solution already exists");

        bool verified = verifierC.verifyTx(a, b, c, input);
        require(verified, "Transaction could not be verified with given arguments");

        Solution memory sol = Solution(solutionsCounter, msg.sender, false);

        solutions[solHash] = sol;

        // solutionsArray.push(sol);
        emit SolutionAdded(solutionsCounter, sol.solAddress);
        solutionsCounter++;
    }


    function uniqueSolutionChecker(bytes32 _solHash, address _to, address minter) internal view returns(bool res){
        require(_to != address(0), "param 'to' Must be a valid address");
        require(solutions[_solHash].solAddress == minter, "Only the solution address can initialise a mint");
        require(solutions[_solHash].solAddress != address(0), "param 'minter' must be a valid address");
        require(solutions[_solHash].minted == false, "Token has already been minted with this solution");
        return true;
    }


    function mintNewNFT(uint256[2] calldata inputs, address to) external whenNotPaused{
        bytes32 solHash = keccak256(abi.encodePacked(inputs[0], inputs[1]));
        (bool isUnique) = uniqueSolutionChecker(solHash, to, msg.sender);
        require(isUnique, "This solution is not unique");

        uint _index = solutions[solHash].solIndex;
        super._mint(to, _index);
        setTokenURI(_index);

        solutions[solHash].minted == true;
        emit MintedSolution(_index, solutions[solHash].solAddress);
    }
}





interface VerifierI{
    function verifyTx(uint256[2] memory a, 
                      uint256[2][2] memory b, 
                      uint256[2] memory c, 
                      uint[2] memory input
                      ) external returns(bool r);
}

























