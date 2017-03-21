

//   $.getScript('js/sceneSetup.js', function() {
// console.log(game.julian);  
// })
            /*-----------------------------------------------------
                     ----------------------------------------------------------
                     --------MAP 1-----------------------MAP 1-----------------
                     --------------------------------------------------------------
                     --------------------------------------------------------------------------------*/
            // Loader
             
            function map_1() {
            	// body...
            	 Physijs.scripts.worker = 'libaries/physijs_worker.js';
    Physijs.scripts.ammo = '../libaries/ammo.js';
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
            initScene.scene.add(ground);



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
}




            /*-----------------------------------------------------
            ----------------------------------------------------------
            --------MAP 1 FINISH--------MAP 1 FINISH------MAP 1 FINISH-
            --------------------------------------------------------------------------------*/
        
