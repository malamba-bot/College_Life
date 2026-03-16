export function create_pointer_listeners (scene) {
    // Change pointer is hovering over interactive object
    scene.input.on('pointerover', (pointer, targets) => {
        scene.game.events.emit('valid_hover');
    });
    
    // Change back if not hovering over interactive object
    scene.input.on('pointerout', (pointer, targets) => { 
        scene.game.events.emit('no_hover') 
    });

    // Play sound on click
    scene.input.on('pointerdown', () => {
        scene.sound.play('click_sfx');
    });
}
