var position, x, z;

var directionX, directionZ;
var count = 0;
var counterForRotation = 1;
var arrayRotation = [30, 45, 60, 90, 123, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];
var input;

var game = (function() {
    // wehn it start to start a ahead tires up two players
    //more feature
    //two maps
    //box.addEventListener( 'ready', spawnBox );


    'use strict';
    /*Loading two libaries ammo.js and physijs_worker.js*/
    Physijs.scripts.worker = 'libaries/physijs_worker.js';
    Physijs.scripts.ammo = '../libaries/ammo.js';




    /*declaring every single variable*/
    var initScene, render,
        ground_material, box_material,
        renderer, render_stats, physics_stats, scene, ground, light, camera,
        vehicle_body, vehicle, loader;
    //=========================Map1==================================//
    function walls(nameit, boxX, boxY, boxZ, x, z, y, rotation) {
        nameit = new Physijs.BoxMesh(
            new THREE.BoxGeometry(boxX, boxY, boxZ),
            new THREE.MeshPhongMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0
            }), 0
        );

        nameit.castShadow = nameit.receiveShadow = true;
        nameit.position.setX(x);
        nameit.position.setZ(z);
        nameit.position.setY(y);
        nameit.rotation.y = rotation;

        scene.add(nameit);
    }
    //=========================Map1==================================//

    initScene = function() {

        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        //renderer.shadowMapSoft = true;
        document.getElementById('viewport').appendChild(renderer.domElement);

        //-----------------------------------------------------------
        render_stats = new Stats();
        render_stats.domElement.style.position = 'absolute';
        render_stats.domElement.style.top = '1px';
        render_stats.domElement.style.zIndex = 100;
        document.getElementById('viewport').appendChild(render_stats.domElement);
        //--------------------------------------------------------------
        physics_stats = new Stats();
        physics_stats.domElement.style.position = 'absolute';
        physics_stats.domElement.style.top = '50px';
        physics_stats.domElement.style.zIndex = 100;
        document.getElementById('viewport').appendChild(physics_stats.domElement);
        //-------------------------------------------------------------------

        scene = new Physijs.Scene();
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
                        vehicle.applyEngineForce(200);

                    } else if (input.power === false) {
                        if (count < 10) {
                            vehicle.setBrake(20, 2);
                            vehicle.setBrake(20, 3);
                        } else {
                            vehicle.applyEngineForce(-150);

                        }
                    } else {
                        vehicle.applyEngineForce(0);
                    }
                }

                scene.simulate(undefined, 2);
                physics_stats.update();
            }
        );

        // scene.add(game.behavior('edge-collision-detection',{
        //   aabb: (0, 0, 100, 100)
        // }));
        // scene.add( game.behavior('body-impulse-response') );
        //---------------------------------------------------------------------
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

        //map_1
        {
            /*-----------------------------------------------------
                     ----------------------------------------------------------
                     --------MAP 1-----------------------MAP 1-----------------
                     --------------------------------------------------------------
                     --------------------------------------------------------------------------------*/
            // Loader
            loader = new THREE.TextureLoader();

            // Materials
            ground_material = Physijs.createMaterial(
                new THREE.MeshLambertMaterial({
                    map: loader.load('media/map_1.png')
                }),
                0.8, // high friction
                0.4 // low restitution
            );


            // box_material = Physijs.createMaterial(
            // 	new THREE.MeshLambertMaterial({ map: loader.load( 'images/plywood.jpg' ) }),
            // 	.4, // low friction
            // 	.6 // high restitution
            // );
            // box_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
            // box_material.map.repeat.set( .25, .25 );

            // Ground
            // var NoiseGen = new SimplexNoise();

            var ground_geometry = new THREE.PlaneGeometry(300, 300, 100, 100);
            for (var i = 0; i < ground_geometry.vertices.length; i++) {
                var vertex = ground_geometry.vertices[i];
                //vertex.y = NoiseGen.noise( vertex.x / 30, vertex.z / 30 ) * 1;
            }
            ground_geometry.computeFaceNormals();
            ground_geometry.computeVertexNormals();

            // If your plane is not square as far as face count then the HeightfieldMesh
            // takes two more arguments at the end: # of x faces and # of z faces that were passed to THREE.PlaneMaterial
            ground = new Physijs.HeightfieldMesh(
                ground_geometry,
                ground_material,
                0 // mass
            );
            ground.rotation.x = -Math.PI / 2;
            ground.receiveShadow = true;
            scene.add(ground);



            //========================================================================
            //=========================rightbar starts here========================
            var rightLine, rightLinesmaller, rightLinesmaller1,
                subtopline, subtopline1, topline, leftLine, leftLinesmall,
                leftLinesmall1, subbottomline, subbottomline1, bottomline;

            walls(rightLine, 2, 3, 245, 148, 20, 1.6, 0);
            walls(rightLinesmaller, 3, 3, 44, 66, -126.5, 1.6, 0);
            walls(rightLinesmaller1, 2, 3, 44, 68.4, -126.5, 1.6, 0);
            //=========================rightbar ends here========================
            //=========================top starts here========================
            walls(subtopline, 2, 3, 80, 109.5, -105.4, 1.6, Math.PI / 2);
            walls(subtopline1, 2, 3, 80, 109.5, -107.4, 1.6, Math.PI / 2);
            walls(topline, 2, 3, 210, -40, -147.4, 1.6, Math.PI / 2);
            //=========================top ends here========================
            //=========================left starts here========================
            walls(leftLine, 2, 3, 249, -147, -23, 1.6, 0);
            walls(leftLinesmall, 2, 3, 44, -9, 127, 1.6, 0);
            walls(leftLinesmall1, 2, 3, 44, -11.1, 127, 1.6, 0);
            //=========================left ends here========================
            //===============bottom start here=======================================
            walls(subbottomline, 2, 3, 137, -81.5, 105.4, 1.6, Math.PI / 2);
            walls(subbottomline1, 2, 3, 135, -81.5, 107.4, 1.6, Math.PI / 2);
            walls(bottomline, 2, 3, 155, 73, 147.6, 1.6, Math.PI / 2);
            //==================================bottom ends here=======================================

            //==================================Middle Part scruble=======================================
            //==================================Middle Part scruble=======================================
            var middlepart, middlepartlayingdownbottom, middlepartlayingdowntop,
                middlepartacross, middlepartacrossbottom, middlepartacrossbottomlil;

            walls(middlepart, 19, 19, 110, 77, 32, 9.6, 0);
            walls(middlepartlayingdownbottom, 18, 19, 160, -15, -16, 9.6, -Math.PI / 2);
            walls(middlepartlayingdowntop, 13, 19, 145, -23, -35, 9.6, -Math.PI / 2);
            walls(middlepartacross, 20, 19, 57, -83, -71, 9.6, 0);
            walls(middlepartacrossbottom, 20, 19, 25, -85, 8, 9.6, 0);
            walls(middlepartacrossbottomlil, 7, 30, 25, -103, 28, 17.6, 0);
            //==================================Middle Part scruble FINISH=======================================
            //==================================Middle Part scruble FINISH=======================================




            /*-----------------------------------------------------
            ----------------------------------------------------------
            --------MAP 1 FINISH--------MAP 1 FINISH------MAP 1 FINISH-
            --------------------------------------------------------------------------------*/
        }
        //map_1 finsih

        var json_loader = new THREE.JSONLoader();

        json_loader.load("models/mustang.js", function(car, car_materials) {
            json_loader.load("models/mustang_wheel.js", function(wheel, wheel_materials) {
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
                    10.88,
                    1.83,
                    0.28,
                    500,
                    10.5,
                    6000
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
                            count++;
                            break;
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
                            count = 0;
                            break;
                    }
                });
            });
        });

        requestAnimationFrame(render);
        scene.simulate();
    };

    function directionCamera(rot) {
        var rotationY = rot.y;

        x = 55 * Math.sin(-rotationY);
        z = 55 * Math.cos(rotationY);

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
            console.log("this works 2 true");
            directionCamera(rot);

            // directionCamera1(rot);
        }else {
          console.log("didnt work");
          directionCamera1(rot);

        }
        // if ((0 < directionX < 1 && 0 > directionZ > -1) || (0 > directionX > -1 && 0 > directionZ > -1)) {
        //     directionCamera(rot);
        //     // console.log("this works 1 1 true");
        // } else if ((0 > directionX > -1) && (0 < directionZ < 1) || (0 < directionX < 1) && (0 < directionZ < 1)) {
        //     // console.log("this works 2 true");
        //     // directionCamera1(rot);
        // }
        // if (0 > directionX > -1 && 0 > directionZ > -1) {
        //       directionCamera(rot);
        //       console.log("this works 2 1");
        //
        //   }
        //  if ((0 > directionX > -1) && (0 < directionZ < 1)) {
        //     directionCamera1(rot);
        //     console.log("this works 2 2");
        //
        // }else {
        //     return;
        // }
        // if ((0 < directionX < 1) && (0 < directionZ < 1)) {
        //     directionCamera1(rot);
        //     console.log("this works 1 2");
        //
        // }
        // else {
        //     return;
        // }




        // console.log({
        //     x: Math.round(-(x * 100) / 100),
        //     z: Math.round((z * 100) / 100),
        //     angle: Math.round(rot.y * 180 / Math.PI),
        //     rotation: rot.y
        //
        // });

        return position;

    }




    render = function() {

        requestAnimationFrame(render);
        if (vehicle) {

            //gottta fix so the camera fallos the car
            camera.position.copy(vehicle.mesh.position).add(cameraPosition(vehicle.mesh.rotation));
            //            console.log(vehicle.mesh.rotation.y);
            // if (vehicle.mesh.rotation.y === - Math.PI/2) {
            //
            // }

            camera.lookAt(vehicle.mesh.position);


            // if ((0 < directionX < 1 && 0 > directionZ > -1) || (0 > directionX > -1 && 0 > directionZ > -1)) {
            //     // directionCamera(rot);
            //     console.log("this works 1 1 true");
            // }



            // camera.rotation.y = Math.PI/3;
            // /projectionMatrix.elements
        }
        renderer.render(scene, camera);
        render_stats.update();
    };



    window.onload = initScene;
})();
