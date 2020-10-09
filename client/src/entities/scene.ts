export class Scene
{
    constructor()
    {
        const gltfShape = new GLTFShape("models/FloorBaseConcrete_01/FloorBaseConcrete_01.glb")
        gltfShape.withCollisions = true
        gltfShape.isPointerBlocker = true
        gltfShape.visible = true

        const gltfShape2 = new GLTFShape("models/Sphere_space1.gltf")
        gltfShape2.withCollisions = true
        gltfShape2.isPointerBlocker = true
        gltfShape2.visible = true

        const gltfShape3 = new GLTFShape("models/capsglass.gltf")
        gltfShape3.withCollisions = true
        gltfShape3.isPointerBlocker = true
        gltfShape3.visible = true

        const gltfShape4 = new GLTFShape("models/QUIZZONE.glb")
        gltfShape4.withCollisions = true
        gltfShape4.isPointerBlocker = true
        gltfShape4.visible = true        

        const scene = new Entity('scene')
        engine.addEntity(scene)

        const transform = new Transform({
            position: new Vector3(0, 0, 0),
            rotation: new Quaternion(0, 0, 0, 1),
            scale: new Vector3(1, 1, 1)
        })
        scene.addComponentOrReplace(transform)

        const entity = new Entity('entity')
        engine.addEntity(entity)
        entity.setParent(scene)
        entity.addComponentOrReplace(gltfShape)

        const transform2 = new Transform({
            position: new Vector3(8, 0, 8),
            rotation: new Quaternion(0, 0, 0, 1),
            scale: new Vector3(1, 1, 1)
        })
        entity.addComponentOrReplace(transform2)

        const entity2 = new Entity('entity2')
        // engine.addEntity(entity2)
        entity2.setParent(scene)
        entity2.addComponentOrReplace(gltfShape)

        const transform3 = new Transform({
            position: new Vector3(24, 0, 8),
            rotation: new Quaternion(0, 0, 0, 1),
            scale: new Vector3(1, 1, 1)
        })
        entity2.addComponentOrReplace(transform3)

        const entity3 = new Entity('entity3')
        engine.addEntity(entity3)
        entity3.setParent(scene)
        entity3.addComponentOrReplace(gltfShape)

        const transform4 = new Transform({
            position: new Vector3(8, 0, 24),
            rotation: new Quaternion(0, 0, 0, 1),
            scale: new Vector3(1, 1, 1)
        })
        entity3.addComponentOrReplace(transform4)

        const entity4 = new Entity('entity4')
        engine.addEntity(entity4)
        entity4.setParent(scene)
        entity4.addComponentOrReplace(gltfShape)

        const transform5 = new Transform({
            position: new Vector3(24, 0, 24),
            rotation: new Quaternion(0, 0, 0, 1),
            scale: new Vector3(1, 1, 1)
        })
        entity4.addComponentOrReplace(transform5)

        const sphereSpace2 = new Entity('sphereSpace2')
        engine.addEntity(sphereSpace2)
        sphereSpace2.setParent(scene)
        sphereSpace2.addComponentOrReplace(gltfShape2)

        const transform6 = new Transform({
            position: new Vector3(8.5, 3, 9.5),
            rotation: new Quaternion(0, 0, 0, 1),
            scale: new Vector3(1, 1, 1)
        })
        sphereSpace2.addComponentOrReplace(transform6)

        const capsglass = new Entity('capsglass')
        engine.addEntity(capsglass)
        capsglass.setParent(scene)
        capsglass.addComponentOrReplace(gltfShape3)

        const transform7 = new Transform({
            position: new Vector3(15, 0, 14.5),
            rotation: new Quaternion(0, 0, 0, 1),
            scale: new Vector3(1, 1, 1)
        })
        capsglass.addComponentOrReplace(transform7)

        const quizzone = new Entity('quizzone')
        engine.addEntity(quizzone)
        quizzone.setParent(scene)
        quizzone.addComponentOrReplace(gltfShape4)

        const transform8 = new Transform({
            position: new Vector3(16, 0, 16),
            rotation: new Quaternion(0, 0, 0, 1),
            scale: new Vector3(0.9609941840171814, 0.9609941840171814, 0.9609941840171814)
        })
        quizzone.addComponentOrReplace(transform8)
    }
}