#include <netinet/in.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <iostream>
#include <unistd.h>
#include <cstring>
#define CONN_MAX 10
#define PORT 3000

class Server {
  private:
    struct sockaddr_in addr;
    int addr_size;
    int server_fd;
  
  public:
    Server();
    void start();
};