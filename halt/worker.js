import init, { create_game, make_move, set_skill } from "./halt.js";
await init().catch((error) => {
    console.error("Error initializing wasm:", error);
});

onmessage = (e) => {
    // console.log("Worker received: " + JSON.stringify(e.data));
    if ("reset" in e.data) {
        self.game = create_game(e.data.reset);
    } else if ("move" in e.data) {
        postMessage({move: make_move(self.game, e.data.move)});
    } else if ("skill" in e.data) {
        set_skill(self.game, e.data.skill);
    }
}

self.postMessage({ready: true});

