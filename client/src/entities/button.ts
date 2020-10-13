import { ButtonComponent } from "../components/button_component"

export class Button
{
    private tilePurple: Entity
    private textPurple: Entity

    private tileYellow: Entity
    private textYellow: Entity

    private tileBlue: Entity
    private textBlue: Entity

    constructor(index: number, position: Vector3, rotation: Quaternion, scale: Vector3)
    {
        let transform = new Transform(
            {
                position: position,
                rotation: rotation,
                scale: scale
        })

        let gltfShapePurple = new GLTFShape("models/tiles/tile_purple.glb")
        gltfShapePurple.withCollisions = true
        gltfShapePurple.isPointerBlocker = true
        gltfShapePurple.visible = true

        let gltfShapeYellow = new GLTFShape("models/tiles/tile_yellow.glb")
        gltfShapeYellow.withCollisions = true
        gltfShapeYellow.isPointerBlocker = true
        gltfShapeYellow.visible = false

        let gltfShapeBlue = new GLTFShape("models/tiles/tile_blue.glb")
        gltfShapeBlue.withCollisions = true
        gltfShapeBlue.isPointerBlocker = true
        gltfShapeBlue.visible = false

        this.tilePurple = new Entity()
        this.tilePurple.addComponent(transform);        
        this.tilePurple.addComponent(new ButtonComponent(index))
        this.tilePurple.addComponentOrReplace(gltfShapePurple)
        
        this.tileYellow = new Entity()
        this.tileYellow.addComponent(transform);        
        this.tileYellow.addComponentOrReplace(gltfShapeYellow)

        this.tileBlue = new Entity()
        this.tileBlue.addComponent(transform);         
        this.tileBlue.addComponentOrReplace(gltfShapeBlue)

        this.configText(index, position)
    }

    private configText(index: number, position: Vector3): void
    {
        let transform = new Transform(
            {
                position: new Vector3(position.x, position.y + 0.05, position.z),
                rotation: Quaternion.Euler(0, 0, 0),
                scale: new Vector3(1, 1, 1)
            })
        
        let gltfShapePurple = new GLTFShape("models/numbs/numb_" + (index + 1) + "_purple.glb")
        gltfShapePurple.withCollisions = true
        gltfShapePurple.isPointerBlocker = true
        gltfShapePurple.visible = true

        let gltfShapeYellow = new GLTFShape("models/numbs/numb_" + (index + 1) + "_yellow.glb")
        gltfShapeYellow.withCollisions = true
        gltfShapeYellow.isPointerBlocker = true
        gltfShapeYellow.visible = false

        let gltfShapeBlue = new GLTFShape("models/numbs/numb_" + (index + 1) + "_blue.glb")
        gltfShapeBlue.withCollisions = true
        gltfShapeBlue.isPointerBlocker = true
        gltfShapeBlue.visible = false

        this.textPurple = new Entity()         
        this.textPurple.addComponent(gltfShapePurple)        
        this.textPurple.addComponent(transform)        

        this.textYellow = new Entity()
        this.textYellow.addComponent(transform)
        this.textYellow.addComponentOrReplace(gltfShapeYellow)

        this.textBlue = new Entity()
        this.textBlue.addComponent(transform)
        this.textBlue.addComponentOrReplace(gltfShapeBlue)
    }

    getIndex(): number
    {
        return this.tilePurple.getComponent(ButtonComponent).index
    }

    getEntity(): Entity
    {
        return this.tilePurple
    }

    showPurple(): void
    {
        this.textPurple.getComponent(GLTFShape).visible = true
        this.tilePurple.getComponent(GLTFShape).visible = true

        this.textYellow.getComponent(GLTFShape).visible = false
        this.tileYellow.getComponent(GLTFShape).visible = false

        this.textBlue.getComponent(GLTFShape).visible = false
        this.tileBlue.getComponent(GLTFShape).visible = false
    }

    showYellow(): void
    {
        this.textPurple.getComponent(GLTFShape).visible = false
        this.tilePurple.getComponent(GLTFShape).visible = false

        this.textYellow.getComponent(GLTFShape).visible = true
        this.tileYellow.getComponent(GLTFShape).visible = true

        this.textBlue.getComponent(GLTFShape).visible = false
        this.tileBlue.getComponent(GLTFShape).visible = false
    }

    showBlue(): void
    {
        this.textPurple.getComponent(GLTFShape).visible = false
        this.tilePurple.getComponent(GLTFShape).visible = false

        this.textYellow.getComponent(GLTFShape).visible = false
        this.tileYellow.getComponent(GLTFShape).visible = false

        this.textBlue.getComponent(GLTFShape).visible = true
        this.tileBlue.getComponent(GLTFShape).visible = true
    }

    addToEngine(): void
    {
        engine.addEntity(this.tilePurple)
        engine.addEntity(this.textPurple)

        engine.addEntity(this.tileYellow)
        engine.addEntity(this.textYellow)

        engine.addEntity(this.tileBlue)
        engine.addEntity(this.textBlue)
    }
}