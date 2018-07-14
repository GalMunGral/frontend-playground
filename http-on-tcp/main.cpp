#include <iostream>
#include <unistd.h>
#include "Server.hpp"
#include "Client.hpp"

int main(int argc, char const *argv[])
{
  std::string choice;
  std::cout << "Select `client` or `server`" << std::endl;
  std::cin >> choice;
  if (choice == "client") {
    Client client;
    client.start();
    return 0;
  } else if (choice == "server") {
    Server server;
    server.start();
    return 0;
  } else {
    return -1;
  }
}