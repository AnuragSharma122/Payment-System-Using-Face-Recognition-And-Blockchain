// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserAPI {
    struct User {
        uint256 id;string firstname;string lastname;string facedata;string phone;string email;string gender;string cardnumber;string expiration; string cvv;
    }
    mapping(uint256 => User) private users;
    uint256 private nextUserId;
    function createUser(string memory _firstname,string memory _lastname,string memory _facedata,string memory _phone,string memory _email,string memory _gender,string memory _cardnumber,string memory _expiration, string memory _cvv
    ) public {
        users[nextUserId] = User(nextUserId,_firstname,_lastname,_facedata,_phone,_email,_gender,_cardnumber,_expiration,_cvv);
        nextUserId++;
    }

    function getUser(uint256 _userId)
        public
        view
        returns (uint256,string memory,string memory,string memory,string memory,string memory,string memory,string memory,string memory,string memory)
    {
        User memory user = users[_userId];
        return (user.id,user.firstname,user.lastname,user.facedata,user.phone,user.email,user.gender,user.cardnumber,user.expiration,user.cvv);
    }

    function getAllUsers()
        public
        view
        returns (User[] memory)
    {
        User[] memory allUsers = new User[](nextUserId);
        for (uint256 i = 0; i < nextUserId; i++) {
            allUsers[i] = users[i];
        }
        return allUsers;
    }
}
