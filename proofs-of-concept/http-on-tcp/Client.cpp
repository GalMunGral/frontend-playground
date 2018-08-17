#include "Client.hpp"

Client::Client() {
  addr.sin_family = AF_INET;
  addr.sin_port = htons(SERVER_PORT);
  inet_pton(AF_INET, IP_ADDR, &addr.sin_addr); 
  addr_size = sizeof(addr);
  sock = socket(AF_INET, SOCK_STREAM, 0);
};

void Client::start() {
  connect(sock, (struct sockaddr *) &addr, addr_size);
  std::cout << "Connected!" << std::endl;  

  char buffer[] = "GET / HTTP/1.1\n\n";
  char recv_buffer[4096];
  send(sock, buffer, strlen(buffer), 0);
  while(recv(sock, recv_buffer, 4096, 0) != 0) {
    std::cout << recv_buffer << std::endl;
    memset(recv_buffer, 0, 4096);
  }
};