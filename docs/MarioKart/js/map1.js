var rightLine, rightLinesmaller, rightLinesmaller1,
    subtopline, subtopline1, topline, leftLine, leftLinesmall,
    leftLinesmall1, subbottomline, subbottomline1, bottomline, line1_1, line1_2, line2_1, line2_2, line3_1, line3_2,
    line4_1, line4_2, line5_1, line5_2;
var map_1 = (function() {
    var loader;
    "use strict";

    var friction = 5;
    document.addEventListener('keydown', function(ev) {
        switch (ev.keyCode) {
            case 37: // left
                friction = 9;
                break;

            case 39: // right
                friction = 9;
                break;


        }
    });
    console.log(friction);

    function map_one() {


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

            game.scene.add(nameit);
        }

        function wall(nameit, boxX, boxY, boxZ, x, z, y, rotation) {
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

            game.scene.add(nameit);
        }



        loader = new THREE.TextureLoader();

        // Materials
        ground_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({
                map: loader.load('media/map_1.png')
            }),
            friction, // high friction
            0.4 // low restitution
        );


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
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        game.scene.add(ground);



        //========================================================================
        //=========================rightbar starts here========================

        wall(line1_1, 0.5, 0.5, 130, 136, 40, 1.6, 0);
        wall(line1_2, 0.5, 0.5, 100, 112, 40, 1.6, 0);
        wall(line5_1, 0.5, 0.5, 150, -139, -15, 1.6, 0);
        wall(line5_2, 0.5, 0.5, 120, -115.4, -20, 1.6, 0);
        wall(line2_1, 0.5, 0.5, 190, 10, -73, 1.6, Math.PI / 2.839);
        wall(line2_2, 0.5, 0.5, 190, 20, -93, 1.6, Math.PI / 2.839);
        wall(line3_1, 0.5, 0.5, 90, 25, 78, 1.6, Math.PI / 6.9);
        wall(line3_2, 0.5, 0.5, 90, 40, 55, 1.6, Math.PI / 6.5);
        wall(line4_1, 0.5, 0.5, 100, -55, 29, 1.6, Math.PI / -2.839);
        wall(line4_2, 0.5, 0.5, 100, -55, 57, 1.6, Math.PI / -2.839);
        //================================================================================

        walls(rightLine, 2, 3, 245, 148, 20, 1.6, 0);
        walls(rightLinesmaller, 3, 3, 44, 66, -126.5, 1.6, 0);
        //=========================rightbar ends here========================
        //=========================top starts here========================
        walls(subtopline, 2, 3, 80, 109.5, -105.4, 1.6, Math.PI / 2);
        walls(topline, 2, 3, 210, -40, -147.4, 1.6, Math.PI / 2);
        //=========================top ends here========================
        //=========================left starts here========================
        walls(leftLine, 2, 3, 249, -147, -23, 1.6, 0);
        walls(leftLinesmall, 2, 3, 44, -9, 127, 1.6, 0);
        //=========================left ends here========================
        //===============bottom start here=======================================
        walls(subbottomline, 2, 3, 137, -81.5, 105.4, 1.6, Math.PI / 2);
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
        //==================================Middle Part scruble FINISH======================================


    }



    return {
        map_one: map_one
    };


})();




/*-----------------------------------------------------
----------------------------------------------------------
--------MAP 1 FINISH--------MAP 1 FINISH------MAP 1 FINISH-
--------------------------------------------------------------------------------*/
