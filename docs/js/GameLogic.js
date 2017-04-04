var scene;
var game = (function() {


    'use strict';
    /*Loading two libaries ammo.js and physijs_worker.js*/
    Physijs.scripts.worker = 'libaries/physijs_worker.js';
    Physijs.scripts.ammo = '../libaries/ammo.js';









    var position, x, z,meta;
    var car1_player1 = localStorage.getItem("car1_player1");
    console.log(car1_player1);

    var directionX, directionZ;
    var count =0;
    var counterForRotation = 1;
    var input;
    var initScene, render,
        ground_material, box_material,
        renderer = new THREE.WebGLRenderer({
            antialias: true
        }),
        render_stats, physics_stats, scene = new Physijs.Scene(),
        ground, light, camera,
        vehicle_body, vehicle, loader;


    initScene = function() {


        renderer.setSize(window.innerWidth, window.innerHeight);
        //renderer.shadowMapSoft = true;
        document.getElementById('viewport').appendChild(renderer.domElement);

        //-----------------------------------------------------------
        render_stats = new Stats();
        render_stats.domElement.style.position = 'absolute';
        render_stats.domElement.style.top = '1px';
        render_stats.domElement.style.zIndex = 100;
        // document.getElementById('viewport').appendChild(render_stats.domElement);
        //--------------------------------------------------------------
        physics_stats = new Stats();
        physics_stats.domElement.style.position = 'absolute';
        physics_stats.domElement.style.top = '50px';
        physics_stats.domElement.style.zIndex = 100;
        // document.getElementById('viewport').appendChild(physics_stats.domElement);
        //-------------------------------------------------------------------
        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        scene.add(camera);

        //-----------------------------------------------------------------------
        light = new THREE.DirectionalLight(0xFFFFFF);
        light.position.set(20, 20, -15);
        light.target.position.copy(scene.position);
        light.castShadow = true;
        light.shadowCameraLeft = -150;
        light.shadowCameraTop = -150;
        light.shadowCameraRight = 150;
        light.shadowCameraBottom = 150;
        light.shadowCameraNear = 20;
        light.shadowCameraFar = 400;
        light.shadowBias = -0.0001;
        light.shadowMapWidth = light.shadowMapHeight = 2048;
        light.shadowDarkness = 0.7;
        scene.add(light);
        //----------------------------------------------------

        map_1.map_one();

        scene.setGravity(new THREE.Vector3(0, -20, 0));

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
                        vehicle.applyEngineForce(800);

                    } else if (input.power === false) {
                                                    
                            vehicle.applyEngineForce(-650);
                    } else {
                        vehicle.applyEngineForce(0);
                    }
                }

                scene.simulate(undefined, 2);
                physics_stats.update();
            }
        );
        var firstplayerCar = car1_player1;
        var json_loader = new THREE.JSONLoader();


        json_loader.load(firstplayerCar, function(car, car_materials) {
            json_loader.load("js/models/mustang_wheel.js", function(wheel, wheel_materials) {
                var mesh = new Physijs.BoxMesh(
                    car,
                    new THREE.MeshFaceMaterial(car_materials)
                );
                mesh.position.y = 2;
                mesh.position.x = 119.90;
                mesh.position.z = 25.07;
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
                var wheel_material = new THREE.MeshFaceMaterial(wheel_materials);

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
                document.addEventListener('keydown', function(ev) {
                    switch (ev.keyCode) {
                        case 37: // left
                            console.log("keydown left");
                            input.direction = 1;
                            break;

                        case 38: // forward
                            console.log("keydown forward");

                            input.power = true;
                            break;

                        case 39: // right
                            console.log("keydown right");
                            input.direction = -1;
                            break;

                        case 40: // back
                            console.log("keydown back");
                            input.power = false;

                            break;
                    }
                });
                document.addEventListener('keyup', function(ev) {
                    switch (ev.keyCode) {
                        case 37: // left
                            console.log("keyup left");
                            input.direction = null;
                            input.steering = 0;
                            break;

                        case 38: // forward
                            console.log("keyup forward");
                            input.power = null;
                            break;

                        case 39: // right
                            console.log("keyup right");
                            input.direction = null;
                            input.steering = 0;
                            break;

                        case 40: // back
                            console.log("keyup back");
                            input.power = null;
                            
                            break;
                    }
                });
            });
        });

        computer_player();
        //==============================================================
        //==============================================================
        //==============================================================
        //==============================================================
        function computer_player() {
            var vehicle_body1, vehicle2, input2;

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
                            vehicle2.applyEngineForce(200);

                        } else if (input2.power === false) {
                            count++;
                            
                                vehicle2.applyEngineForce(-650);

                            
                        } else {
                            vehicle2.applyEngineForce(0);
                        }
                    }

                    scene.simulate(undefined, 2);
                    physics_stats.update();
                }
            );
            var json_loader = new THREE.JSONLoader();

            json_loader.load(Vehicle2.firstPlayer(), function(car, car_materials) {
                json_loader.load("js/models/mustang_wheel.js", function(wheel, wheel_materials) {
                    var mesh = new Physijs.BoxMesh(
                        car,
                        new THREE.MeshFaceMaterial(car_materials)
                    );
                    mesh.position.y = 2;
                    mesh.position.x = 128.90;
                    mesh.position.z = 33.07;
                    mesh.rotation.y = -Math.PI;
                    mesh.castShadow = mesh.receiveShadow = true;



                    vehicle2 = new Physijs.Vehicle(mesh, new Physijs.VehicleTuning(

                        5.88,
                        0.83,
                        0.88,
                        500,
                        10.5,
                        10000
                    ));
                    scene.add(vehicle2);
                    var wheel_material = new THREE.MeshFaceMaterial(wheel_materials);

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

                    function forward() {
                        input2.power = true;
                    }

                    function backwards() {
                        input2.power = false;
                    }

                    function left() {
                        input2.direction = 1;
                    }

                    function right() {
                        input2.direction = -1;
                    }

                    function forwardnull() {
                        input2.power = null;
                    }

                    function backwardsnull() {
                        input2.power = null;
                    }

                    function leftnull() {
                        input2.direction = null;
                        input2.steering = 0;
                    }

                    function rightnull() {
                        input2.direction = null;
                        input2.steering = 0;
                    }


                    var setTimer0 = setInterval(function() {
                        forward();
                        console.log("ivantimer0");
                        clearInterval(setTimer0);
                    }, 1000);

                    var setTimer1 = setInterval(function() {
                        left();
                        console.log("ivantimer1");
                        clearInterval(setTimer1);
                    }, 5400);

                    var setTimer2 = setInterval(function() {
                        leftnull();
                        forward();
                        console.log("ivantimer2");
                        clearInterval(setTimer2);
                    }, 6190);
                    //========================================================================================
                    var setTimer3 = setInterval(function() {
                        forwardnull();
                        console.log("ivantimer3");
                        clearInterval(setTimer3);
                    }, 11500);

                    var setTimer4 = setInterval(function() {
                        left();
                        console.log("ivantimer4");
                        clearInterval(setTimer4);
                    }, 12500);
                    var setTimer5 = setInterval(function() {
                        leftnull();
                        forward();
                        console.log("ivantimer5");
                        clearInterval(setTimer5);
                    }, 12900);
                    var setTimer6 = setInterval(function() {
                        left();
                        console.log("ivantimer6");
                        clearInterval(setTimer6);
                    }, 13400);
                    var setTimer7 = setInterval(function() {
                        leftnull();
                        forward();
                        console.log("ivantimer7");
                        clearInterval(setTimer7);
                    }, 14000);
                    var setTimer8 = setInterval(function() {
                        left();
                        console.log("ivantimer8");
                        clearInterval(setTimer8);
                    }, 14500);
                    var setTimer9 = setInterval(function() {
                        leftnull();
                        forward();
                        console.log("ivantimer9");
                        clearInterval(setTimer9);
                    }, 14800);
                    var setTimer10 = setInterval(function() {
                        left();
                        console.log("ivantimer10");
                        clearInterval(setTimer10);
                    }, 18000);
                    var setTimer11 = setInterval(function() {
                        leftnull();
                        forward();
                        console.log("ivantimer11");
                        clearInterval(setTimer11);
                    }, 18800);

                    var setTimer12 = setInterval(function() {
                        left();
                        console.log("ivantimer12");
                        clearInterval(setTimer12);
                    }, 19500);
                    var setTimer13 = setInterval(function() {
                        leftnull();
                        forward();
                        console.log("ivantimer13");
                        clearInterval(setTimer13);
                    }, 19900);

                    var setTimer14 = setInterval(function() {
                        right();
                        forwardnull();
                        console.log("ivantimer14");
                        clearInterval(setTimer14);
                    }, 21900);
                    var setTimer15 = setInterval(function() {
                        rightnull();
                        forward();
                        console.log("ivantimer15");
                        clearInterval(setTimer15);
                    }, 22500);
                    var setTimer16 = setInterval(function() {
                        right();
                        console.log("ivantimer16");
                        clearInterval(setTimer16);
                    }, 22700);
                    var setTimer17 = setInterval(function() {
                        rightnull();
                        forward();
                        console.log("ivantimer17");
                        clearInterval(setTimer17);
                    }, 23100);
                    var setTimer18 = setInterval(function() {
                        left();
                        forwardnull();
                        console.log("ivantimer18");
                        clearInterval(setTimer18);
                    }, 26000);
                    var setTimer19 = setInterval(function() {
                        leftnull();
                        forward();
                        console.log("ivantimer19");
                        clearInterval(setTimer19);
                    }, 26700);
                    var setTimer20 = setInterval(function() {
                        left();

                        console.log("ivantimer20");
                        clearInterval(setTimer20);
                    }, 27100);
                    var setTimer21 = setInterval(function() {
                        leftnull();
                        forward();
                        console.log("ivantimer21");
                        clearInterval(setTimer21);
                    }, 27900);




                });
            });
            requestAnimationFrame(render);
            scene.simulate();
        }


        requestAnimationFrame(render);
        scene.simulate();
    };


    //==============================================================
    //==============================================================
    //==============================================================
    //==============================================================
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


    function cameraPosition(rot) {
        // if (input.power===true || input.power===false) {
        directionX = vehicle.mesh.getWorldDirection().x;
        directionZ = vehicle.mesh.getWorldDirection().z;
        // console.log(directionX, directionZ);

        if (0 > directionX > -1 && 0 < directionZ < 1 || 0 < directionX < 1 & 0 < directionZ < 1) {
            directionCamera(rot);

            // directionCamera1(rot);
        } else {
            directionCamera1(rot);

        }

        return position;

    }



meta = true;
    render = function() {

        requestAnimationFrame(render);
        if (vehicle) {
            camera.position.copy(vehicle.mesh.position).add(cameraPosition(vehicle.mesh.rotation));

            camera.lookAt(vehicle.mesh.position);

            var finishline = vehicle.mesh.position.z;



                    if ((0 < directionX && directionX < 1 && 0 > directionZ && directionZ > -1 || 0 > directionX && directionX > -1 && 0 > directionZ && directionZ > -1) && (finishline > 13 && finishline < 16) && (input.power === true || input.power === null)) {
console.log(meta)
                        if (meta === true) {
                            count++;
                            console.log(count)
                            document.getElementById('player1').innerHTML = count + "/2";

                            if ((count === 2)){

                                document.getElementById('winner').style.display = "block";
                                document.getElementById('winners').innerHTML = "Player 1 has won";
                            }




                        }
                        meta = false;
                        var inteval = setInterval(function metas() {
                            meta = true;
                            clearInterval(inteval);
                        }, 3000);
                    }
                







        }
        renderer.render(scene, camera);
        render_stats.update();
    };


    return {
        scene: scene,
        camera: camera,

        initScene: initScene
    };

})();

window.onload = game.initScene;
