#include "Server.hpp"

Server::Server() {
  addr.sin_family = AF_INET;
  addr.sin_addr.s_addr = INADDR_ANY;
  addr.sin_port = htons(PORT);
  addr_size = sizeof(addr);
  server_fd = socket(AF_INET, SOCK_STREAM, 0);
  bind(server_fd, (struct sockaddr *) &addr, addr_size);
};

void Server::start() {
  listen(server_fd, CONN_MAX);
  std::cout << "Listening on 3000!" << std::endl;
  char buffer[] = "HTTP/1.1 200 OK\n\n<h1>Hello</h1><p>world</p>";
  char recv_buffer[1024];
  while(1) {
    int sock = accept(server_fd, (struct sockaddr *) &addr, (socklen_t *) &addr_size);
    std::cout << "New connection!" << std::endl;
    recv(sock, recv_buffer, 1024, 0);
    send(sock, buffer, strlen(buffer), 0);
    close(sock);
  }
};