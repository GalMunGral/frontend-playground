#include <netinet/in.h>
#include <arpa/inet.h>
#include <iostream>
#include <unistd.h>
#include <cstring>
#define SERVER_PORT 80
#define IP_ADDR "172.217.0.78"

class Client {
  private:
    struct sockaddr_in addr;
    int addr_size;
    int sock;

  public:
    Client();
    void start();
};