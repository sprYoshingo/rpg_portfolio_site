let player = null;
let cursors = null;
let target = null;

export function setGlobals(newValues) {
    if ('player' in newValues) player = newValues.player;
    if ('cursors' in newValues) cursors = newValues.cursors;
    if ('target' in newValues) target = newValues.target;
}

export { player, cursors, target };
