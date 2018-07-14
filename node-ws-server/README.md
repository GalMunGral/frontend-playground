Handshaking, encoding and decoding are implemented according to
<a href="https://tools.ietf.org/html/rfc6455">RFC-6455</a>

The server echos every message and sends a `Yo` every second. To test, open any URL in browser and run the following:
```javascript
var s = new WebSocket('ws://localhost:8080');
s.send('Any Message');
```
 
