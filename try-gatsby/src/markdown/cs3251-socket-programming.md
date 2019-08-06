---
path: /github/cs3251-socket-programming
---
# TCP Socket Programming: Banking
*First programming project for CS 3251 - Computer Networks I*
```bash
sudo apt install libssl-dev # If -lcrypto not found
make
```
```bash
./server [port]
./client [ip] [port] [command]
```

## Protocol Specifications
#### Request Types
- `BAL <account-name>` 
  - Server should respond with a non-negative decimal number
- `WITHDRAW <account-name> <amount>` 
  - Server should respond with `0` if transaction successful
- `TRANSFER <from-account> <to-account> <amount>`
  - Server should respond with `0` if successful

#### Error Codes
- `-1`: Account does not exist
- `-2`: Insufficient fund
- `-3`: Too many withdrawals in a minute
