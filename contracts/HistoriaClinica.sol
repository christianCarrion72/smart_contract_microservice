// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HistoriaClinica {
    event HistoriaRegistrada(address indexed autor, string fecha, string sintomas, string diagnostico, string tratamiento);

    function registrarHistoria(string memory fecha, string memory sintomas, string memory diagnostico, string memory tratamiento) public returns (bytes32) {
        emit HistoriaRegistrada(msg.sender, fecha, sintomas, diagnostico, tratamiento);
        return keccak256(abi.encodePacked(fecha, sintomas, diagnostico, tratamiento, block.timestamp));
    }
}
