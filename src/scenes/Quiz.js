import { globals } from '../main.js';
import InteractiveTextBox from '../prefabs/InteractiveTextBox.js';
import assignments from '../../resources/assignments.js';

export class Quiz extends Phaser.Scene {
    constructor() {
        super('Quiz');
    }

    create() {
        // Get the correct strings from the assignment object
        this.assignment_key = Object.values(assignments);
        this.assignment_idx = 0;

        this.create_assets();
        
    }

    create_assets() {

    }



}
