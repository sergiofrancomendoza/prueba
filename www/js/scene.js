(function() {



    //vertex shader calcular posiciones y vertices de los primitivos
    //y el frament shader calcula el color y la posicion de los primitivos

    let scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / window.innerHeight;
    let camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    camera.position.z = 80;
    camera.position.y = 30;

    //plataforma de todas nuestras figuras donde se dibuja la sombra
    let planeGeometry = new THREE.PlaneGeometry(200, 900);
    planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    let groundMaterial = new THREE.MeshPhongMaterial({
        color: 0x778899
    });

    let plane = new THREE.Mesh(planeGeometry, groundMaterial);
    plane.receiveShadow = true;

    let mesh;


    let loader = new THREE.TextureLoader();
    //Especificacion de textura actualizable
    //dentro de esta funcion estaremos cargandoles texturas a cada una de las figuras
    loader.load('img/texture.jpg', function(texture) {
        //esfera 

        let geometry = new THREE.SphereGeometry(10, 50, 50)
        let material = new THREE.MeshBasicMaterial({ map: texture }) //Colores aleatorios
        material.color.setHex(0xffffff * Math.random());
        //Cambio de color al dar click a la instruccion de cambio de color.
        var cambioColor = document.getElementById('esferaId');
        cambioColor.onclick = function colorcambio() {
            if (material) {
                material.color.setHex(0xffffff * Math.random());
            }
        }
        mesh = new THREE.Mesh(geometry, material);
        mesh.material.map.needsUpdate = true;
        mesh.position.set(0, 20, 5);
        //en cada una de las figuras agregamos su propia sombra 
        mesh.castShadow = true;
        scene.add(mesh);
        //Cono
        let conegeometry = new THREE.CylinderGeometry(0, 5, 10, 50, false);
        let conematerial = new THREE.MeshLambertMaterial({ map: texture })
        conematerial.color.setHex(0xffffff * Math.random());
        //Cambio de color al dar click a la instruccion de cambio de color.
        var cambioColor = document.getElementById('conoId');
        cambioColor.onclick = function colorcambio() {
            if (conematerial) {
                conematerial.color.setHex(0xffffff * Math.random());
            }
        }
        cone = new THREE.Mesh(conegeometry, conematerial);
        cone.position.set(20, 10, 50);
        cone.castShadow = true;
        scene.add(cone);
        //Piramide
        let pyramidgeometry = new THREE.CylinderGeometry(0, 5, 10, 4, false);
        let pyramidmaterial = new THREE.MeshBasicMaterial({ map: texture });
        pyramidmaterial.color.setHex(0xffffff * Math.random());
        //Cambio de color al dar click a la instruccion de cambio de color.
        var cambioColor = document.getElementById('piraId');
        cambioColor.onclick = function colorcambio() {
            if (pyramidmaterial) {
                pyramidmaterial.color.setHex(0xffffff * Math.random());
            }
        }
        pyramid = new THREE.Mesh(pyramidgeometry, pyramidmaterial);
        pyramid.position.set(45, 10, 35, 20);
        pyramid.castShadow = true;
        scene.add(pyramid);
        //Toroide
        let donaGeometry = new THREE.TorusGeometry(6, 3, 50, 50);
        let donamaterial = new THREE.MeshBasicMaterial({ map: texture });
        donamaterial.color.setHex(0xffffff * Math.random());
        var cambioColor = document.getElementById('donaId');
        cambioColor.onclick = function colorcambio() {
            if (donamaterial) {
                donamaterial.color.setHex(0xffffff * Math.random());
            }
        }
        dona = new THREE.Mesh(donaGeometry, donamaterial);
        dona.position.set(50, 10, 10);
        dona.castShadow = true;
        scene.add(dona);
        //Cubo
        let cubegeometry = new THREE.BoxGeometry(5, 5, 5, 20);
        let cubeMaterial = new THREE.MeshPhongMaterial({ map: texture });
        cubeMaterial.color.setHex(0xffffff * Math.random());
        var cambioColor = document.getElementById('cuboId');
        cambioColor.onclick = function colorcambio() {
            if (cubeMaterial) {
                cubeMaterial.color.setHex(0xffffff * Math.random());
            }
        }
        cube = new THREE.Mesh(cubegeometry, cubeMaterial);
        cube.position.set(-10, 10, 50);
        cube.castShadow = true;
        scene.add(cube);
        //Cilindro
        let cylindergeometry = new THREE.CylinderGeometry(1.8, 1.8, 8, 80, false);
        let cylindermaterial = new THREE.MeshLambertMaterial({ map: texture });
        cylindermaterial.color.setHex(0xffffff * Math.random());
        var cambioColor = document.getElementById('cilId');
        cambioColor.onclick = function colorcambio() {
            if (cylindermaterial) {
                cylindermaterial.color.setHex(0xffffff * Math.random());
            }
        }
        cylinder = new THREE.Mesh(cylindergeometry, cylindermaterial);
        cylinder.position.set(-35, 10, 40);
        cylinder.castShadow = true;
        scene.add(cylinder);
    });



    let pointLight = new THREE.PointLight(0x606060);

    pointLight.position.y = 60;
    pointLight.position.z = 20;

    pointLight.castShadow = true;

    //fondo de la escena y se agrega a la escena
    scene.background = new THREE.Color(0xeeeeee);
    scene.add(new THREE.AmbientLight(0x404040));
    scene.add(plane);
    scene.add(pointLight);
    //controles de camara 
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    //funcion con las que podemos rotar las figuras y ejecutarlas
    function loop() {
        requestAnimationFrame(loop);
        mesh.rotation.x += 0.01;
        dona.rotation.z += 0.01;
        pyramid.rotation.y += 0.01;
        cylinder.rotation.x += 0.01;
        cone.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    loop();
})();