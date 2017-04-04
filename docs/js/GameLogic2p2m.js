var meta = null,
    player1, meta1 = null,
    vehicle, vehicle2, mesh, mesh1, ground_material;


var scene, camera;
var game2p = (function() {


    'use strict';
    /*Loading two libaries ammo.js and physijs_worker.js*/
    Physijs.scripts.worker = 'libaries/physijs_worker.js';
    Physijs.scripts.ammo = '../libaries/ammo.js';


    var position, x, z;
    var car1_player1_1p = localStorage.getItem("car1_player1_1p");
    console.log(car1_player1_1p);
    var car2_player2_2p = localStorage.getItem("car2_player2_2p");
    console.log(car2_player2_2p);



    document.addEventListener('keydown', function(ev) {
        switch (ev.keyCode) {
            case 66:
                window.location.href = "Scene4-2p.html";
                break;
        }
    });


    var view, renderer, initScene, loader;
    var vehicle_body1, input2;

    var ground, input, light, light1, road, directionX, directionZ;

    var mouseX = 0,
        mouseY = 0;

    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    var count = 0,
        count1 = 0;
    // function removecar (vehicle,json_loader,input) {
    //         scene.remove(vehicle)
    // json_loader = null;
    //  scene.simulate();


    meta = true;
    meta1 = true;


    var views = [{
            left: 0,
            bottom: 0,
            width: 0.5,
            height: 1.0,
            background: new THREE.Color().setRGB(0.5, 0.5, 0.7),
            eye: [0, 600, 200],
            up: [0, 1, 0],
            fov: 35,
            updateCamera: function(camera, scene, mouseX, mouseY) {

                if (vehicle) {
                    var finishline = vehicle.mesh.position.z;






                    camera.position.copy(vehicle.mesh.position).add(cameraPosition(vehicle.mesh.rotation, mesh, vehicle));
                    // cameraPosition(vehicle.mesh.rotation,mesh,vehicle)
                    camera.lookAt(vehicle.mesh.position);

                    if ((0 < directionX && directionX < 1 && 0 > directionZ && directionZ > -1 || 0 > directionX && directionX > -1 && 0 > directionZ && directionZ > -1) && (finishline > 0 && finishline < 2) && (input.power === true || input.power === null)) {


                        if (meta === true) {
                            count++;

                            if (count === 2) {


                                document.getElementById('player1').innerHTML = "1" + "/2";



                            } else if (count === 3) {

                                document.getElementById('player1').innerHTML = count + "/2";



                                document.getElementById('winner').style.display = "block";
                                document.getElementById('winners').innerHTML = "Player 1 has won";
                            }
                            if (count === 1) {


                                document.getElementById('player1').innerHTML = count + "/2";
                            }
                        }
                        meta = false;
                        var inteval = setInterval(function metas() {
                            meta = true;
                            clearInterval(inteval);
                        }, 6000);
                    }
                }
            }
        },
        {
            left: 0.5,
            bottom: 0,
            width: 0.5,
            height: 1.0,
            background: new THREE.Color().setRGB(0.5, 0.7, 0.5),
            eye: [0, 600, 200],
            up: [0, 1, 0],
            fov: 35,
            updateCamera: function(camera, scene, mouseX, mouseY) {

                if (vehicle2) {
                    camera.position.copy(vehicle2.mesh.position).add(cameraPosition(vehicle2.mesh.rotation, mesh1, vehicle2));
                    // cameraPosition(vehicle2.mesh.rotation,mesh1,vehicle2)
                    camera.lookAt(vehicle2.mesh.position);
                    // console.log(vehicle2.mesh)
                    var finishline = vehicle2.mesh.position.z;


                    if ((0 < directionX && directionX < 1 && 0 > directionZ && directionZ > -1 || 0 > directionX && directionX > -1 && 0 > directionZ && directionZ > -1) && (finishline > 0 && finishline < 2) && (input.power === true || input.power === null)) {

                         if (meta1 === true) {
                            count1++;

                            if (count1 === 2) {


                                document.getElementById('player2').innerHTML = "1" + "/2";



                            } else if (count1 === 3) {

                                document.getElementById('player2').innerHTML = count1 + "/2";



                                document.getElementById('winner').style.display = "block";
                                document.getElementById('winners').innerHTML = "Player 2 has won";
                            }
                            if (count1 === 1) {


                                document.getElementById('player2').innerHTML = count1 + "/2";
                            }
                        }
                        meta1= false;

                        var inteval = setInterval(function metas() {
                            meta1 = true;
                            clearInterval(inteval);
                        }, 6000);
                    }
                }
            }
        }

    ];

    function directionCamera(rot) {
        var rotationY = rot.y;

        x = 55 * Math.sin(-rotationY);
        z = 55 * Math.cos(-rotationY);

        position = new THREE.Vector3(x, 30, z);
        return position, x, z;
    }

    function directionCamera1(rot) {
        var rotationY = rot.y;

        x = 55 * Math.sin(-rotationY);
        z = -55 * Math.cos(rotationY);
        position = new THREE.Vector3(x, 30, z);
        return position, x, z;
    }


    function cameraPosition(rot, mesh, vehicle, positions) {
        // if (input.power===true || input.power===false) {
        directionX = vehicle.mesh.getWorldDirection().x;
        directionZ = vehicle.mesh.getWorldDirection().z;
        // console.log("x:",directionX,"           Z:",directionZ);

        if (0 > directionX > -1 && 0 < directionZ < 1 || 0 < directionX < 1 && 0 < directionZ < 1) {
            directionCamera(rot);

            // directionCamera1(rot);
        } else {
            directionCamera1(rot);

        }
        return position;

    }

    initScene = function() {
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('container').appendChild(renderer.domElement);
        scene = new Physijs.Scene();

        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(20, 20, -15);
        scene.add(light);




        loader = new THREE.TextureLoader();

        // Materials
        ground_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture('Media/map_2.png')
            }),
            5, // high friction
            0.4 // low restitution
        );

        //=========================================================================

        var ground_geometry = new THREE.PlaneGeometry(300, 300);
        for (var i = 0; i < ground_geometry.vertices.length; i++) {
            var vertex = ground_geometry.vertices[i];
            //vertex.y = NoiseGen.noise( vertex.x / 30, vertex.z / 30 ) * 1;
        }
        ground_geometry.computeFaceNormals();
        ground_geometry.computeVertexNormals();

        ground = new Physijs.HeightfieldMesh(
            ground_geometry,
            ground_material,
            0 // mass
        );
        ground.receiveShadow = true;
        ground.rotation.x = 4.712;

        scene.add(ground);

        light1 = new THREE.DirectionalLight(0xffffff);
        light1.position.set(20, 20, -15);
        ground.add(light1);


        function walls(nameit, boxX, boxY, boxZ, x, z, y, rotation) {
            nameit = new Physijs.BoxMesh(
                new THREE.BoxGeometry(boxX, boxY, boxZ),
                new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.9
                }), 0
            );

            nameit.castShadow = nameit.receiveShadow = true;
            nameit.position.setX(x);
            nameit.position.setZ(z);
            nameit.position.setY(y);
            nameit.rotation.y = rotation;

            scene.add(nameit);
        }
        var rightLine, rightLinesmaller, rightLinesmaller1,
            subtopline, subtopline1, topline, leftLine, leftLinesmall,
            leftLinesmall1, subbottomline, subbottomline1, bottomline, line1_1, line1_2, line2_1, line2_2, line3_1, line3_2,
            line4_1, line4_2, line5_1, line5_2, line5_3, line5_4, line5_5;
        //================================================================================

        walls(rightLine, 2, 3, 300, 149, 0, 1.6, 0);
        walls(rightLinesmaller, 2, 3, 120, 59, -38, 1.6, 0);
        walls(rightLinesmaller1, 2, 3, 117, 57, -39, 1.6, 0);
        walls(subtopline, 4, 3, 130, 16, 83, 1.6, 0);
        walls(leftLine, 2, 3, 300, -149, 0, 1.6, 0);
        walls(bottomline, 2, 3, 300, 0, -149, 1.6, 1.57);
        walls(topline, 2, 3, 300, 0, 149, 1.6, 1.57);
        walls(subtopline1, 4, 3, 20, 138, -5, 1.6, 1.57);
        walls(leftLinesmall, 4, 3, 20, 99, -5, 1.6, 1.57);
        walls(leftLinesmall1, 4, 3, 30, 41, -96, 1.6, 1.57);
        walls(subbottomline, 2, 3, 55, 0, -109, 1.6, 1.57);
        walls(subbottomline1, 2, 3, 55, 0, -130, 1.6, 1.57);
        walls(line1_1, 2, 3, 18, 27, -138, 1.6, 0);
        walls(line1_2, 4, 3, 12, -33, -141, 1.6, 0);
        walls(line2_1, 2, 3, 7, -30, -133, 1.6, 0.7);
        walls(line2_2, 2, 3, 10, -30, -105, 1.6, -0.7);
        walls(line3_1, 2, 3, 10, 27, -103, 1.6, 0);
        walls(line3_2, 4, 3, 130, -77.8, -13, 1.6, 0);
        walls(line4_1, 4, 3, 54, -57.8, 68, 1.6, 0.8);
        walls(line4_2, 4, 3, 56, -3, 0, 1.6, 0.8);
        walls(line5_1, 4, 3, 15, 63, 30, 1.6, 0);
        walls(line5_2, 4, 3, 10, 95, 74, 1.6, 0);
        walls(line5_3, 4, 3, 48, 80, 55, 1.6, 0.8);
        walls(line5_4, 4, 3, 28, -69, -88, 1.6, -0.8);
        walls(line5_5, 4, 3, 24, -45, -98, 1.6, 1.57);
        // walls(line5_5, 4, 3, 24, -110, 0, 1.6,1.57);







        //=========================================================================================
        scene.setGravity(new THREE.Vector3(0, -30, 0));




        var player_1 = 0;
        var json_loader = new THREE.JSONLoader();

        player1 = (function() {
            json_loader = new THREE.JSONLoader();
            scene.addEventListener(
                'update',
                function() {

                    if (input && vehicle) {
                        if (input.direction !== null) {
                            input.steering += input.direction / 50;
                            if (input.steering < -0.6) input.steering = -0.6;
                            if (input.steering > 0.6) input.steering = 0.6;
                        }
                        vehicle.setSteering(input.steering, 0);
                        vehicle.setSteering(input.steering, 1);

                        if (input.power === true) {
                            vehicle.applyEngineForce(1000);
                        } else if (input.power === false) {


                            vehicle.applyEngineForce(-900);


                        } else {
                            vehicle.applyEngineForce(0);
                        }
                    }

                    scene.simulate(undefined, 2);
                    // physics_stats.update();
                }
            );


            json_loader.load(car1_player1_1p, function(car, car_materials) {
                json_loader.load("js/models/mustang_wheel.js", function(wheel, wheel_materials) {



                    mesh = new Physijs.BoxMesh(
                        car,
                        new THREE.MultiMaterial(car_materials)
                    );
                    mesh.position.y = 2;
                    mesh.position.x = -117.90;
                    mesh.position.z = 20.07;
                    mesh.rotation.y = Math.PI;
                    mesh.castShadow = mesh.receiveShadow = true;

                    vehicle = new Physijs.Vehicle(mesh, new Physijs.VehicleTuning(
                        5.88,
                        0.83,
                        0.88,
                        500,
                        10.5,
                        10000
                    ));
                    scene.add(vehicle);
                    var wheel_material = new THREE.MultiMaterial(wheel_materials);

                    for (var i = 0; i < 4; i++) {
                        vehicle.addWheel(
                            wheel,
                            wheel_material,
                            new THREE.Vector3(
                                i % 2 === 0 ? -1.6 : 1.6, -1,
                                i < 2 ? 3.3 : -3.2
                            ),
                            new THREE.Vector3(0, -1, 0),
                            new THREE.Vector3(-1, 0, 0),
                            0.5,
                            0.7,
                            i < 2 ? false : true
                        );
                    }

                    input = {
                        power: null,
                        direction: null,
                        steering: 0
                    };


                    // make it smoother

                    return mesh;
                });
                return mesh;
            });
            return mesh;
        })();


        document.addEventListener('keydown', function(ev) {
            switch (ev.keyCode) {
                case 37: // left
                    input.direction = 1;

                    break;

                case 38: // forward

                    input.power = true;
                    break;

                case 39: // right
                    input.direction = -1;
                    break;

                case 40: // back
                    input.power = false;

                    break;
                    // case 191: // back
                    // removecar(vehicle,json_loader,input);


                    // scene.simulate();
                    // break;
            }
        });

        document.addEventListener('keyup', function(ev) {
            switch (ev.keyCode) {
                case 37: // left
                    input.direction = null;
                    input.steering = 0;
                    break;

                case 38: // forward
                    input.power = null;
                    break;

                case 39: // right
                    input.direction = null;
                    input.steering = 0;
                    break;

                case 40: // back
                    input.power = null;

                    break;
                    // case 191: // back


                    //       player1();
                    //        break;


            }
        });
        //==========================================================================
        //==========================================================================


        scene.addEventListener(
            'update',
            function() {

                if (input2 && vehicle2) {
                    if (input2.direction !== null) {
                        input2.steering += input2.direction / 50;
                        if (input2.steering < -0.6) input2.steering = -0.6;
                        if (input2.steering > 0.6) input2.steering = 0.6;
                    }
                    vehicle2.setSteering(input2.steering, 0);
                    vehicle2.setSteering(input2.steering, 1);

                    if (input2.power === true) {
                        vehicle2.applyEngineForce(1000);

                    } else if (input2.power === false) {

                        vehicle2.applyEngineForce(-900);
                    } else {
                        vehicle2.applyEngineForce(0);
                    }
                }

                scene.simulate(undefined, 2);
                // physics_stats.update();
            }
        );
        var json_loader1 = new THREE.JSONLoader();
        player2();

        function player2() {
            json_loader.load(car2_player2_2p, function(car, car_materials) {
                json_loader.load("js/models/mustang_wheel.js", function(wheel, wheel_materials) {
                    mesh1 = new Physijs.BoxMesh(
                        car,
                        new THREE.MultiMaterial(car_materials)
                    );
                    mesh1.position.y = 2;
                    mesh1.position.x = -107.90;
                    mesh1.position.z = 13.07;
                    mesh1.rotation.y = -Math.PI;

                    mesh1.castShadow = mesh1.receiveShadow = true;



                    vehicle2 = new Physijs.Vehicle(mesh1, new Physijs.VehicleTuning(

                        5.88,
                        0.83,
                        0.88,
                        500,
                        10.5,
                        10000
                    ));
                    scene.add(vehicle2);
                    var wheel_material = new THREE.MultiMaterial(wheel_materials);

                    for (var i = 0; i < 4; i++) {
                        vehicle2.addWheel(
                            wheel,
                            wheel_material,
                            new THREE.Vector3(
                                i % 2 === 0 ? -1.6 : 1.6, -1,
                                i < 2 ? 3.3 : -3.2
                            ),
                            new THREE.Vector3(0, -1, 0),
                            new THREE.Vector3(-1, 0, 0),
                            0.5,
                            0.7,
                            i < 2 ? false : true
                        );
                    }

                    input2 = {
                        power: null,
                        direction: null,
                        steering: 0
                    };


                });
            });
        }
        document.addEventListener('keydown', function(ev) {
            switch (ev.keyCode) {
                case 65: // left
                    input2.direction = 1;
                    break;

                case 87: // forward

                    input2.power = true;
                    break;

                case 68: // right
                    input2.direction = -1;
                    break;

                case 83: // back
                    input2.power = false;

                    break;



            }
        });
        document.addEventListener('keyup', function(ev) {
            switch (ev.keyCode) {
                case 65: // left
                    input2.direction = null;
                    input2.steering = 0;
                    break;

                case 87: // forward
                    input2.power = null;
                    break;

                case 68: // right
                    input2.direction = null;
                    input2.steering = 0;
                    break;

                case 83: // back
                    input2.power = null;

                    break;
                case 82: // back
                    break;
            }
        });

        // ]===================================================================================

        // winlines.addEventListener('collision', function(vehicle, linearVelocity, angularVelocity ) { console.log("ivanssssssssssssssssssssssssssssssssssssssssssssssssssssss");})









        for (var ii = 0; ii < views.length; ++ii) {

            view = views[ii];
            camera = new THREE.PerspectiveCamera(view.fov, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.x = view.eye[0];
            camera.position.y = view.eye[1];
            camera.position.z = view.eye[2];
            camera.up.x = view.up[0];
            camera.up.y = view.up[1];
            camera.up.z = view.up[2];
            view.camera = camera;
        }


        // shadow









        animate();
        scene.simulate();
    };




    function animate() {

        render();


        requestAnimationFrame(animate);
    }

    function render() {

        for (var ii = 0; ii < views.length; ++ii) {

            view = views[ii];
            camera = view.camera;
            view.updateCamera(camera, scene, mouseX, mouseY);

            var left = Math.floor(windowWidth * view.left);
            var bottom = Math.floor(windowHeight * view.bottom);
            var width = Math.floor(windowWidth * view.width);
            var height = Math.floor(windowHeight * view.height);
            renderer.setViewport(left, bottom, width, height);
            renderer.setScissor(left, bottom, width, height);
            renderer.setScissorTest(true);
            renderer.setClearColor(view.background);

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.render(scene, camera);
        }

    }

    return {
        scene: scene,
        camera: camera,
        initScene: initScene
    };
})();

window.onload = game2p.initScene;
