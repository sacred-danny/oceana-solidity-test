// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Solution {

    mapping (uint => uint) hashGroup;
    int8 [] public result;
    uint executionCount = 0;
    int8 public constant NULL_VALUE = 127;

    function find(int8 [] memory data, uint position) private view returns (int8[] memory) {
        if (position >= data.length) {
            return new int8[](0);
        }
        if (data[position] == NULL_VALUE) {
            return new int8[](0);
        }
        int8[] memory leftAnswer = find(data, position * 2 + 1);
        int8[] memory rightAnswer = find(data, position * 2 + 2);
        int8[] memory value = new int8[](1 + leftAnswer.length + rightAnswer.length);

        value[0] = data[position];
        for (uint i = 0; i < leftAnswer.length; i++) {
            value[i + 1] = leftAnswer[i];
        }
        for (uint i = 0; i < rightAnswer.length; i++) {
            value[i + leftAnswer.length + 1] = rightAnswer[i];
        }
        return value;
    }

    function getResult() public view returns (int8[] memory) {
        return result;
    }

    function findMultiple(int8 [] memory data) public {
        executionCount++ ;
        while (result.length > 0) {
            result.pop(); // prev result clearing
        }
        uint n = data.length;
        uint m;
        for (m = 2; m - 1 < n; m *= 2) {}
        -- m;
        int8[] memory expandData = new int8[](m);
        for (uint i = 0; i < m; i++) {
            if (i < n) {
                expandData[i] = data[i];
            }
            else {
                expandData[i] = NULL_VALUE;
            }
        }
        uint[] memory hashTree = new uint[](m);

        for (uint i = m - 1; i >= 0; i--) {
            uint id = i + 1;
            uint leftChildId = id * 2;
            uint rightChildId = id * 2 + 1;
            uint leftChildPosition = leftChildId - 1;
            uint rightChildPosition = rightChildId - 1;
            hashTree[i] = uint(int256(expandData[i]));
            if (leftChildPosition < n && data[leftChildPosition] != NULL_VALUE) {
                hashTree[i] = uint(keccak256(abi.encodePacked(hashTree[i], hashTree[leftChildPosition])));
            }
            if (rightChildPosition < n && data[rightChildPosition] != NULL_VALUE) {
                hashTree[i] = uint(keccak256(abi.encodePacked(hashTree[i], hashTree[rightChildPosition])));
            }
            hashTree[i] = uint(keccak256(abi.encodePacked(hashTree[i], executionCount)));
            if (expandData[i] != NULL_VALUE) {
                if (hashGroup[hashTree[i]] == 1) {
                    int8[] memory value;
                    value = find(data, i);
                    for (uint j = 0; j < value.length; j++)
                        result.push(value[j]);
                    result.push(NULL_VALUE);
                }
                ++hashGroup[hashTree[i]];
            }
            if (i == 0) {
                break;
            }
        }
    }
}
