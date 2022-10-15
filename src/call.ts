import { WebSocketBehavior } from "uWebSockets.js";
import { RequestBehavior } from "./router";

export const receive: WebSocketBehavior = {
  /* There are many common helper features */
  idleTimeout: 32,
  maxBackpressure: 1024,
  maxPayloadLength: 512,
  // compression: DEDICATED_COMPRESSOR_3KB,

  upgrade: (res, req, context) => {
    console.log('An Http connection wants to become WebSocket, URL: ' + req.getUrl() + '!');

    /* This immediately calls open handler, you must not use res after this call */
    res.upgrade({
      url: req.getUrl()
    },
    /* Spell these correctly */
    req.getHeader('sec-websocket-key'),
    req.getHeader('sec-websocket-protocol'),
    req.getHeader('sec-websocket-extensions'),
    context);

  },

  open: (ws) => {
    console.log('A WebSocket connected!');
  },
  message: (ws, message, isBinary) => {
    /* Ok is false if backpressure was built up, wait for drain */
    let ok = ws.send(message, isBinary);
  },
  drain: (ws) => {
    console.log('WebSocket backpressure: ' + ws.getBufferedAmount());
  },
  close: (ws, code, message) => {
    console.log('WebSocket closed');
  }
}

export const event: RequestBehavior = (res, req) => {
  
};

export const answer: RequestBehavior = (res, req) => {

};