import { SceneCallback } from '../app/scene_callback'
import { UI } from '../ui/ui'
import { Beam } from "./beam"
import { Button } from "./button"
import { CentralScreen } from "./central_screen"
import { LeftScreen } from "./left_screen"
import { LifetimeBestScreen } from "./lifetime_best_screen"
import { RightScreen } from "./right_screen"
import { Screen } from "./screen"
import { StartButton } from "./start_button"
import { TimedQuizScreen } from "./timed_quiz_screen"
import { TopPartyScreen } from "./top_party_screen"

export class Scene extends SceneCallback
{
    private ui: UI;

    private scene: Entity

    private becomeAMember: Entity
    private alreadyAMember: Entity
    private memberButton: Entity

    private buttons: Array<Button> = []
    private beams: Array<Beam> = []

    private centralScreen: Screen
    private leftScreen: Screen
    private rightScreen: Screen
    private topPartyScreen: Screen
    private lifetimeBestScreen: Screen
    private timedQuizScreen: Screen

    private startButton: StartButton

    private static INITIAL_X = 15.35
    private static INITIAL_Y = 0.25
    private static INITIAL_Z = -19.79
    private static SCALE_FACTOR = 7.42
    private static SCALE_OFFSET = 0.1

    constructor()
    {
        super()

        this.configScene()
        this.configBecomeAMember()
        this.configAlreadyAMember()
        this.configGrass()

        this.configureUI()
        this.configureButtons()
        this.configureBeams()
        this.configureScreens()
        this.configureStartButton()
    }

    private configureUI(): void
    {
        this.ui = UI.getInstance()
    }

    private configScene(): void
    {
        const gltfShape2 = new GLTFShape("models/QUIZZONE.glb")
        gltfShape2.withCollisions = true
        gltfShape2.isPointerBlocker = true
        gltfShape2.visible = true

        const scene = new Entity('scene')
        engine.addEntity(scene)
        const transform = new Transform(
            {
                position: new Vector3(0, 0, 0),
                rotation: new Quaternion(0, 0, 0, 1),
                scale: new Vector3(1, 1, 1)
            })
        scene.addComponentOrReplace(transform)

        const quizzone = new Entity('quizzone')
        engine.addEntity(quizzone)
        quizzone.setParent(scene)
        quizzone.addComponentOrReplace(gltfShape2)
        const transform6 = new Transform(
            {
                position: new Vector3(16.5, -0.1, 15.75),
                rotation: new Quaternion(0, 0, 0, 1),
                scale: new Vector3(0.99, 1.0, 1.0)
            })

        quizzone.addComponentOrReplace(transform6)
    }

    private configBecomeAMember(): void
    {
        const becomeAMemberShape = new GLTFShape("models/become_a_member.glb")
        becomeAMemberShape.withCollisions = true
        becomeAMemberShape.isPointerBlocker = true
        becomeAMemberShape.visible = true

        this.becomeAMember = new Entity('become_a_member')
        engine.addEntity(this.becomeAMember)
        this.becomeAMember.setParent(this.scene)
        this.becomeAMember.addComponentOrReplace(becomeAMemberShape)

        const transform = new Transform(
            {
                position: new Vector3(16, -0.5, 15.2),
                rotation: new Quaternion(0, 0, 0, 1),
                scale: new Vector3(1, 1, 1)
            })
        this.becomeAMember.addComponentOrReplace(transform)

        this.memberButton = new Entity()
        engine.addEntity(this.memberButton)
        this.memberButton.setParent(this.becomeAMember)
        this.memberButton.addComponent(new Transform(
            {
                position: new Vector3(14.5, 3.6, 5.65),
                rotation: Quaternion.Euler(0, 0, 0),
                scale: new Vector3(0.1, 1, 5)
            }
        ))
        this.memberButton.addComponent(new BoxShape())

        let material = new Material()
        material.albedoColor = Color4.FromHexString("#00000000")

        this.memberButton.addComponent(material)
        this.memberButton.addComponent(new OnPointerDown(
            () =>
            {
                this.ui.showMember()
            }))        
    }

    private configAlreadyAMember(): void
    {
        const alreadyAMemberShape = new GLTFShape("models/already_a_member.glb")
        alreadyAMemberShape.withCollisions = true
        alreadyAMemberShape.isPointerBlocker = true
        alreadyAMemberShape.visible = false

        this.alreadyAMember = new Entity('already_a_member')
        engine.addEntity(this.alreadyAMember)
        this.alreadyAMember.setParent(this.scene)
        this.alreadyAMember.addComponentOrReplace(alreadyAMemberShape)

        const transform = new Transform(
            {
                position: new Vector3(15, -0.5, 15.2),
                rotation: new Quaternion(0, 0, 0, 1),
                scale: new Vector3(1, 1, 1)
            })
        this.alreadyAMember.addComponentOrReplace(transform)
    }

    private configGrass(): void
    {
        const gltfShape = new GLTFShape("models/FloorBaseGrass_01/FloorBaseGrass_01.glb")
        gltfShape.withCollisions = true
        gltfShape.isPointerBlocker = true
        gltfShape.visible = true

        for (var i = 0; i < 2; i++)
        {
            for (var j = 0; j < 2; j++)
            {
                const entity = new Entity('entity' + (i * 2 + j))
                engine.addEntity(entity)
                entity.setParent(this.scene)
                entity.addComponentOrReplace(gltfShape)
                const transform = new Transform(
                    {
                        position: new Vector3(8 + (16 * i), 0, 8 + (j * 16)),
                        rotation: new Quaternion(0, 0, 0, 1),
                        scale: new Vector3(1, 1, 1)
                    })
                entity.addComponentOrReplace(transform)
            }
        }
    }

    private configureButtons(): void
    {
        for (var i = 0; i < 2; i++)
        {
            for (var j = 0; j < 2; j++)
            {
                let button = new Button(i * 2 + j,
                    new Vector3(-(Scene.INITIAL_Z + j * Scene.SCALE_FACTOR), Scene.INITIAL_Y, Scene.INITIAL_X + i * Scene.SCALE_FACTOR),
                    Quaternion.Euler(0, -90, 0),
                    new Vector3(1, 1, 1))

                button.addToEngine()
                this.buttons.push(button)
            }
        }
    }

    private configureBeams(): void
    {
        let beam1 = new Beam(
            new Vector3(-(Scene.INITIAL_Z + Scene.SCALE_FACTOR / 2), Scene.INITIAL_Y, Scene.INITIAL_X + Scene.SCALE_FACTOR / 2),
            Quaternion.Euler(0, -90, 0),
            new Vector3(Scene.SCALE_FACTOR * 2 - Scene.SCALE_OFFSET, 0.11, 0.1));

        let beam2 = new Beam(
            new Vector3(-(Scene.INITIAL_Z + Scene.SCALE_FACTOR / 2), Scene.INITIAL_Y, Scene.INITIAL_X + Scene.SCALE_FACTOR / 2),
            Quaternion.Euler(0, 0, 0),
            new Vector3(Scene.SCALE_FACTOR * 2 - Scene.SCALE_OFFSET, 0.11, 0.1));

        beam1.addToEngine()
        beam2.addToEngine()

        this.beams.push(beam1)
        this.beams.push(beam2)
    }

    private configureScreens(): void
    {
        this.centralScreen = new CentralScreen()
        this.leftScreen = new LeftScreen()
        this.rightScreen = new RightScreen()
        this.topPartyScreen = new TopPartyScreen()
        this.lifetimeBestScreen = new LifetimeBestScreen()
        this.timedQuizScreen = new TimedQuizScreen()

        this.centralScreen.configMain(new Vector3(16, 3.5, 30.9), Quaternion.Euler(0, 0, 0), new Vector3(5.5, 5.5, 5.5))
        this.leftScreen.configMain(new Vector3(16, 6.2, 30.5), Quaternion.Euler(0, 0, 0), new Vector3(4.8, 4.8, 4.8))
        this.rightScreen.configMain(new Vector3(9.9, 9.9, 30.8), Quaternion.Euler(0, 0, 0), new Vector3(8, 8, 8))
        this.topPartyScreen.configMain(new Vector3(16, 3.5, 30.8), Quaternion.Euler(0, 0, 0), new Vector3(6, 6, 6))
        this.lifetimeBestScreen.configMain(new Vector3(0.9, 5.7, 20.1), Quaternion.Euler(0, -90, 0), new Vector3(5.5, 5.5, 5.5))
        this.timedQuizScreen.configMain(new Vector3(22.1, 9.9, 30.8), Quaternion.Euler(0, 0, 0), new Vector3(6, 6, 6))

        this.centralScreen.addToEngine()
        this.leftScreen.addToEngine()
        this.rightScreen.addToEngine()
        this.topPartyScreen.addToEngine()
        this.lifetimeBestScreen.addToEngine()
        this.timedQuizScreen.addToEngine()
    }

    private configureStartButton(): void
    {
        this.startButton = new StartButton(this)
        this.startButton.configMain(new Vector3(29.03, 0.76, 29.95), Quaternion.Euler(0, 0, 0), new Vector3(1.1, 1.2, 0.9))
        this.startButton.addToEngine()
    }

    public startGame(): void
    {
        this.ui.showStartUp()
    }

    public setMember(member: boolean): void
    {
        if (member)
        {
            this.alreadyAMember.getComponent(GLTFShape).visible = true
            this.becomeAMember.getComponent(GLTFShape).visible = false
            
            if (this.memberButton.isAddedToEngine())
            {
                engine.removeEntity(this.memberButton)
            }
        }
        else
        {
            this.alreadyAMember.getComponent(GLTFShape).visible = false
            this.becomeAMember.getComponent(GLTFShape).visible = true

            if (!this.memberButton.isAddedToEngine())
            {
                engine.addEntity(this.memberButton)
            }
        }
    }

    public getButtons(): Array<Button>
    {
        return this.buttons
    }
}