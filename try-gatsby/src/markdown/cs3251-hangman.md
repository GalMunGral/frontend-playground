---
path: /github/cs3251-hangman
---
# Hangman: A Text-based Game over TCP
*Second programming project for CS 3251 - Computer Networks I*

```bash
make
```
```bash
./server [port]
./client [ip] [port] # Start a single client instance (Need two to start a game)
```

## Protocol Specification
#### Client Message
```
+---------------------+---------------+
| Msg length (1 byte) | Data (1 byte) | 
+---------------------+---------------+
```
#### Server Message
```
+-------------------+----------------------+------------------------+------+
| Msg flag (1 byte) | Word length (1 byte) | Num Incorrect (1 byte) | Data | 
+-------------------+----------------------+------------------------+------+
```
If the message flag is unset, the data section is the word chosen (with the letters yet to be guessed replaced by underscores) concatenated with a list of incorrectedly guessed letters. If the message flag is set to a positive number, then the rest of the message is a message string that the client should print out.


## Implementation Idea

The core of both client and server is a main loop (one for each thread) that listens to incoming messages and reacts or responds to them. The server uses one routine for single-player and one for multiplayer mode, whereas the client does not differentiate between two modes. For each game, the server uses a "game control block" structure to manage game states. The same structure is used in both game modes, because the rules for updating game states are effectively the same, even though the number of players differs. 
```c
typedef struct game_ctl_b {
  char *word; // The word to be guessed
  char *masked; // The word with each unguessed letter replaced by '_'
  char ic_guesses[6]; // Incorrect guesses
  uint8_t word_len;
  uint8_t num_ic; // # Incorrect guesses
  uint8_t count; // # Revealed letters. Player wins when count == 6.
} game_ctl_b;
```

The server handles incoming traffic using threads: Not only are game instances run on individual threads, the game mode selection stage for each player is also handled by a separate thread so that **servicing a client does not block the server from responding to other clients**. A counter is used to make sure the number of active game instances does not exceed 3.
```c
while(1) {
  client_sock = accept(server_sock, NULL, NULL)
  if (-1 == client_sock) {
    // Handle error
  }
  
  // Spawn a thread to handle each client, passing the file descriptor as argument
  int *cur_clnt_sock = malloc(sizeof(int));
  *cur_clnt_sock = client_sock;
  pthread_t client_thread;
  pthread_create(&client_thread, NULL, handler, cur_clnt_sock);
  pthread_detach(client_thread);  
}
```
