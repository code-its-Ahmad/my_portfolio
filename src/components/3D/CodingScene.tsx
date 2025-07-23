import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const CodingScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    desk: THREE.Group;
    laptop: THREE.Group;
    hands: THREE.Group;
    code: THREE.Group;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Blue accent light
    const blueLight = new THREE.PointLight(0x0066ff, 2, 10);
    blueLight.position.set(-3, 2, 2);
    scene.add(blueLight);

    // Purple accent light
    const purpleLight = new THREE.PointLight(0x6600ff, 2, 10);
    purpleLight.position.set(3, 2, 2);
    scene.add(purpleLight);

    // Create desk
    const deskGroup = new THREE.Group();
    const deskGeometry = new THREE.BoxGeometry(4, 0.1, 2);
    const deskMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.position.y = -1;
    desk.castShadow = true;
    desk.receiveShadow = true;
    deskGroup.add(desk);

    // Create laptop
    const laptopGroup = new THREE.Group();
    
    // Laptop base
    const baseGeometry = new THREE.BoxGeometry(1.5, 0.05, 1);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const laptopBase = new THREE.Mesh(baseGeometry, baseMaterial);
    laptopBase.position.y = -0.95;
    laptopBase.castShadow = true;
    laptopGroup.add(laptopBase);

    // Laptop screen
    const screenGeometry = new THREE.BoxGeometry(1.4, 0.05, 0.9);
    const screenMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
    const laptopScreen = new THREE.Mesh(screenGeometry, screenMaterial);
    laptopScreen.position.set(0, -0.45, -0.4);
    laptopScreen.rotation.x = -Math.PI * 0.15;
    laptopScreen.castShadow = true;
    laptopGroup.add(laptopScreen);

    // Screen display (glowing)
    const displayGeometry = new THREE.PlaneGeometry(1.2, 0.8);
    const displayMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x001122,
      transparent: true,
      opacity: 0.8
    });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.set(0, -0.44, -0.35);
    display.rotation.x = -Math.PI * 0.15;
    laptopGroup.add(display);

    // Create hands (simplified)
    const handsGroup = new THREE.Group();
    
    // Left hand
    const leftHandGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const handMaterial = new THREE.MeshLambertMaterial({ color: 0xFFDBB3 });
    const leftHand = new THREE.Mesh(leftHandGeometry, handMaterial);
    leftHand.position.set(-0.4, -0.8, 0.2);
    leftHand.castShadow = true;
    handsGroup.add(leftHand);

    // Right hand
    const rightHand = new THREE.Mesh(leftHandGeometry, handMaterial);
    rightHand.position.set(0.4, -0.8, 0.2);
    rightHand.castShadow = true;
    handsGroup.add(rightHand);

    // Create code particles
    const codeGroup = new THREE.Group();
    const codeChars = ['<', '>', '{', '}', '(', ')', ';', '=', '+', '-'];
    
    for (let i = 0; i < 60; i++) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 64;
      canvas.height = 64;
      
      if (context) {
        context.fillStyle = Math.random() > 0.5 ? '#0066ff' : '#6600ff';
        context.font = '48px monospace';
        context.textAlign = 'center';
        context.fillText(
          codeChars[Math.floor(Math.random() * codeChars.length)],
          32,
          48
        );
      }

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0.6
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      
      sprite.position.set(
        (Math.random() - 0.5) * 10,
        Math.random() * 3 + 1,
        (Math.random() - 0.5) * 5
      );
      sprite.scale.set(0.5, 0.5, 0.5);
      
      codeGroup.add(sprite);
    }

    // Add all groups to scene
    scene.add(deskGroup);
    scene.add(laptopGroup);
    scene.add(handsGroup);
    scene.add(codeGroup);

    // Position camera
    camera.position.set(0, 2, 5);
    camera.lookAt(0, -0.5, 0);

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      desk: deskGroup,
      laptop: laptopGroup,
      hands: handsGroup,
      code: codeGroup
    };

    // Animation variables
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      time += 0.01;

      if (sceneRef.current) {
        // Animate hands (typing motion)
        sceneRef.current.hands.children.forEach((hand, index) => {
          hand.position.y = -0.8 + Math.sin(time * 8 + index) * 0.05;
        });

        // Animate code particles
        sceneRef.current.code.children.forEach((sprite, index) => {
          sprite.position.y += Math.sin(time + index) * 0.002;
          sprite.rotation.z += 0.01;
          
          // Reset position if too high
          if (sprite.position.y > 4) {
            sprite.position.y = -1;
          }
        });

        // Camera movement based on mouse
        sceneRef.current.camera.position.x += (mouseX * 2 - sceneRef.current.camera.position.x) * 0.05;
        sceneRef.current.camera.position.y += (mouseY * 1 + 2 - sceneRef.current.camera.position.y) * 0.05;
        sceneRef.current.camera.lookAt(0, -0.5, 0);

        // Screen flicker effect
        const display = sceneRef.current.laptop.children.find(child => 
          child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial
        ) as THREE.Mesh;
        
        if (display && display.material instanceof THREE.MeshBasicMaterial) {
          display.material.opacity = 0.8 + Math.sin(time * 20) * 0.1;
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (sceneRef.current) {
        sceneRef.current.camera.aspect = window.innerWidth / window.innerHeight;
        sceneRef.current.camera.updateProjectionMatrix();
        sceneRef.current.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
};

export default CodingScene;
