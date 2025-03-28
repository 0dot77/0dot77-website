import * as THREE from 'three';
import { Text } from 'troika-three-text';

class ThreeScene {
    private scene: THREE.Scene;
    private camera: THREE.OrthographicCamera;
    private renderer: THREE.WebGLRenderer;
    private font: any;
    private isMouseDown: boolean = false;
    private currentText: any = null;
    private animationSize: number = 1;

    private windowSize: {
        width: number;
        height: number;
    } = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(this.windowSize.width / -2, this.windowSize.width / 2, this.windowSize.height / 2, -this.windowSize.height / 2, 0.1, 75);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.init();
        this.animate();
    }

    private init() {
        this.scene.background = new THREE.Color(0x000000);
        this.camera.position.z = 5;

        const container = document.getElementById('three-container');

        if (container) {
            this.renderer.setSize(this.windowSize.width, this.windowSize.height);
            container.appendChild(this.renderer.domElement);
        }
    }

    public resize() {
        this.camera.left = this.windowSize.width / -2;
        this.camera.right = this.windowSize.width / 2;
        this.camera.top = this.windowSize.height / 2;
        this.camera.bottom = this.windowSize.height / -2;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.windowSize.width, this.windowSize.height);
    }

    public mouseDown(event:MouseEvent, text:string) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        const x = ((event.clientX - rect.left) - this.windowSize.width / 2);
        const y = (-(event.clientY - rect.top) + this.windowSize.height / 2);
        this.isMouseDown = true;
        this.animationSize = 1;
        
        const myText = new Text();
        myText.material.color = 'white';
        myText.text = text;
        myText.fontSize = this.animationSize;
        myText.anchorX = 'center';
        myText.anchorY = 'middle';
        myText.position.set(x, y, 0);

        myText.sync();

        this.currentText = myText;
        this.scene.add(myText);
    }

    public mouseUp() {
        this.isMouseDown = false;
        this.currentText = null;
    }

    private animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        if (this.isMouseDown && this.currentText) {
            if (this.animationSize < 50) {
                this.animationSize += 1;
                this.currentText.fontSize = this.animationSize;
            }

            const originalX = this.currentText.position.x;
            const originalY = this.currentText.position.y;

            const shakeAmount = 5;
            const offsetX = (Math.random() - 0.5) * shakeAmount;
            const offsetY = (Math.random() - 0.5) * shakeAmount;

            this.currentText.position.set(
                originalX + offsetX,
                originalY + offsetY,
                0
            );

            this.currentText.sync();
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const scene = new ThreeScene();

    window.addEventListener('resize', () => {
        scene.resize();
    });

    window.addEventListener('mousedown', (event:MouseEvent) => {
        scene.mouseDown(event, '뿅');
    });
    
    window.addEventListener('mouseup', () => {
        scene.mouseUp();
    });
});

