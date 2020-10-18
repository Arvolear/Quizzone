import { SceneCallback } from '../app/scene_callback'
import { UI } from '../ui/ui'
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
    private memberButtonShape: BoxShape
    
    private infoBecomeButton: Entity
    private infoBecomeButtonShape: BoxShape
    private infoAlreadyButton: Entity
    private infoAlreadyButtonShape: BoxShape

    private outCollider: Entity
    private inCollider: Entity
    private inColliderShape: GLTFShape

    private buttons: Array<Button> = []

    private centralScreen: Screen
    private leftScreen: Screen
    private rightScreen: Screen
    private topPartyScreen: Screen
    private lifetimeBestScreen: Screen
    private timedQuizScreen: Screen

    private startButton: StartButton

    private static INITIAL_X = 15.35
    private static INITIAL_Y = 0.05
    private static INITIAL_Z = -19.79
    private static SCALE_FACTOR = 7.42

    constructor()
    {
        super()

        this.configScene()
        this.configBecomeAMember()
        this.configAlreadyAMember()        
        this.configGrass()
        this.configLogo()
        this.configColliders()        

        this.configureUI()
        this.configureButtons()
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

        this.scene = new Entity('scene')
        engine.addEntity(this.scene)
        const transform = new Transform(
            {
                position: new Vector3(0, 0, 0),
                rotation: new Quaternion(0, 0, 0, 1),
                scale: new Vector3(1, 1, 1)
            })
        this.scene.addComponentOrReplace(transform)

        const quizzone = new Entity('quizzone')
        engine.addEntity(quizzone)
        quizzone.setParent(this.scene)
        quizzone.addComponentOrReplace(gltfShape2)
        const transform6 = new Transform(
            {
                position: new Vector3(16.5, -0.25, 15.75),
                rotation: new Quaternion(0, 0, 0, 1),
                scale: new Vector3(0.99, 1.0, 1.0)
            })

        quizzone.addComponentOrReplace(transform6)
    }

    private configBecomeAMember(): void
    {
        const becomeAMemberShape = new GLTFShape("models/member/become_a_member.glb")
        becomeAMemberShape.withCollisions = true
        becomeAMemberShape.isPointerBlocker = true
        becomeAMemberShape.visible = true

        this.becomeAMember = new Entity('become_a_member')
        engine.addEntity(this.becomeAMember)
        this.becomeAMember.setParent(this.scene)
        this.becomeAMember.addComponentOrReplace(becomeAMemberShape)

        const transform = new Transform(
            {
                position: new Vector3(16.5, -0.5, 15.2),
                rotation: new Quaternion(0, 0, 0, 1),
                scale: new Vector3(1, 1, 1)
            })
        this.becomeAMember.addComponentOrReplace(transform)

        this.memberButton = new Entity()
        engine.addEntity(this.memberButton)
        this.memberButton.setParent(this.becomeAMember)
        this.memberButton.addComponent(new Transform(
            {
                position: new Vector3(14.48, 3.6, 5.65),
                rotation: Quaternion.Euler(0, 0, 0),
                scale: new Vector3(0.1, 1.2, 5.4)
            }
        ))
        this.memberButtonShape = new BoxShape()
        this.memberButton.addComponentOrReplace(this.memberButtonShape)

        let material = new Material()
        material.albedoColor = Color4.FromHexString("#00000000")

        this.memberButton.addComponent(material)
        this.memberButton.addComponent(new OnPointerDown(
            () =>
            {
                this.ui.showMember()
            }))

        this.infoBecomeButton = new Entity()
        engine.addEntity(this.infoBecomeButton)
        this.infoBecomeButton.setParent(this.becomeAMember)
        this.infoBecomeButton.addComponent(new Transform(
            {
                position: new Vector3(14.48, 3.6, 0.3),
                rotation: Quaternion.Euler(0, 0, 0),
                scale: new Vector3(0.1, 1.2, 2.9)
            }
        ))
        this.infoBecomeButtonShape = new BoxShape()
        this.infoBecomeButton.addComponentOrReplace(this.infoBecomeButtonShape)

        this.infoBecomeButton.addComponent(material)
        this.infoBecomeButton.addComponent(new OnPointerDown(
            () =>
            {
                this.ui.showInfo()
            }))     
    }

    private configAlreadyAMember(): void
    {
        const alreadyAMemberShape = new GLTFShape("models/member/already_a_member.glb")
        alreadyAMemberShape.withCollisions = true
        alreadyAMemberShape.isPointerBlocker = true
        alreadyAMemberShape.visible = false

        this.alreadyAMember = new Entity('already_a_member')
        engine.addEntity(this.alreadyAMember)
        this.alreadyAMember.setParent(this.scene)
        this.alreadyAMember.addComponentOrReplace(alreadyAMemberShape)

        const transform = new Transform(
            {
                position: new Vector3(15.5, -0.5, 15.2),
                rotation: new Quaternion(0, 0, 0, 1),
                scale: new Vector3(1, 1, 1)
            })
        this.alreadyAMember.addComponentOrReplace(transform)

        this.infoAlreadyButton = new Entity()
        engine.addEntity(this.infoAlreadyButton)
        this.infoAlreadyButton.setParent(this.becomeAMember)
        this.infoAlreadyButton.addComponent(new Transform(
            {
                position: new Vector3(14.48, 3.6, 3.3),
                rotation: Quaternion.Euler(0, 0, 0),
                scale: new Vector3(0.1, 1.2, 2.9)
            }
        ))
        this.infoAlreadyButtonShape = new BoxShape()
        this.infoAlreadyButton.addComponentOrReplace(this.infoAlreadyButtonShape)

        let material = new Material()
        material.albedoColor = Color4.FromHexString("#00000000")

        this.infoAlreadyButton.addComponent(material)
        this.infoAlreadyButton.addComponent(new OnPointerDown(
            () =>
            {
                this.ui.showInfo()
            }))
    }

    private configGrass(): void
    {
        const gltfShape = new GLTFShape("models/grass/FloorBaseGrass_01.glb")
        gltfShape.withCollisions = true
        gltfShape.isPointerBlocker = true
        gltfShape.visible = true

        for (var i = 0; i < 2; i++)
        {
            for (var j = 0; j < 2; j++)
            {
                let entity = new Entity()
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

    private configLogo(): void
    {
        const logoShape = new GLTFShape("models/logo/logo_animation.glb")        
        logoShape.visible = true

        let logo = new Entity('logo')
        engine.addEntity(logo)
        logo.setParent(this.scene)
        logo.addComponentOrReplace(logoShape)

        const transform = new Transform(
            {
                position: new Vector3(16, 17, 16),
                rotation: new Quaternion(0, 0, 0, 1),
                scale: new Vector3(1, 1, 1)
            })
        logo.addComponentOrReplace(transform)

        let logoAnimator = new Animator()
        logo.addComponentOrReplace(logoAnimator)

        const rotateClip = new AnimationState('EmptyAction')
        rotateClip.looping = true
        logoAnimator.addClip(rotateClip)

        rotateClip.play()
    }

    private configColliders(): void
    {        
        const transform = new Transform(
            {
                position: new Vector3(16.5, -0.5, 14.6),
                rotation: new Quaternion(0, 0, 0, 1),
                scale: new Vector3(1, 1, 1)
            })

        const outColliderShape = new GLTFShape("models/colliders/out_collider.glb")
        outColliderShape.withCollisions = true
        outColliderShape.isPointerBlocker = false
        outColliderShape.visible = true

        this.outCollider = new Entity('out_collider')
        engine.addEntity(this.outCollider)
        this.outCollider.setParent(this.scene)
        this.outCollider.addComponentOrReplace(outColliderShape)
        this.outCollider.addComponentOrReplace(transform)

        this.inColliderShape = new GLTFShape("models/colliders/in_collider.glb")
        this.inColliderShape.withCollisions = true
        this.inColliderShape.isPointerBlocker = false
        this.inColliderShape.visible = true

        this.inCollider = new Entity('in_collider')
        engine.addEntity(this.inCollider)
        this.inCollider.setParent(this.scene)        
        this.inCollider.addComponentOrReplace(transform)
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

    private configureScreens(): void
    {
        this.centralScreen = new CentralScreen()
        this.leftScreen = new LeftScreen()
        this.rightScreen = new RightScreen()
        this.topPartyScreen = new TopPartyScreen()
        this.lifetimeBestScreen = new LifetimeBestScreen()
        this.timedQuizScreen = new TimedQuizScreen()

        this.centralScreen.configMain(new Vector3(16, 3.5, 30.9), Quaternion.Euler(0, 0, 0), new Vector3(5.5, 5.5, 5.5))
        this.leftScreen.configMain(new Vector3(16, 6.2, 30.4), Quaternion.Euler(0, 0, 0), new Vector3(4.9, 4.9, 4.9))
        this.rightScreen.configMain(new Vector3(9.9, 9.9, 30.8), Quaternion.Euler(0, 0, 0), new Vector3(8, 8, 8))
        this.topPartyScreen.configMain(new Vector3(16, 3.5, 30.8), Quaternion.Euler(0, 0, 0), new Vector3(6, 6, 6))
        this.lifetimeBestScreen.configMain(new Vector3(0.9, 6.3, 20.1), Quaternion.Euler(0, -90, 0), new Vector3(5.5, 5.5, 5.5))
        this.timedQuizScreen.configMain(new Vector3(22.1, 9.9, 30.8), Quaternion.Euler(0, 0, 0), new Vector3(7, 7, 7))

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
        this.startButton.configMain(new Vector3(29.05, 0.48, 29.95), Quaternion.Euler(0, 0, 0), new Vector3(1.15, 1.1, 0.8))
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

            if (!this.infoAlreadyButton.hasComponent(this.infoAlreadyButtonShape))
            {
                this.infoAlreadyButton.addComponentOrReplace(this.infoAlreadyButtonShape)
            }

            if (this.memberButton.hasComponent(this.memberButtonShape))
            {
                this.memberButton.removeComponent(this.memberButtonShape)
            }

            if (this.infoBecomeButton.hasComponent(this.infoBecomeButtonShape))
            {
                this.infoBecomeButton.removeComponent(this.infoBecomeButtonShape)
            }
        }
        else
        {
            this.alreadyAMember.getComponent(GLTFShape).visible = false
            this.becomeAMember.getComponent(GLTFShape).visible = true

            if (!this.memberButton.hasComponent(this.memberButtonShape))
            {
                this.memberButton.addComponentOrReplace(this.memberButtonShape)
            }

            if (!this.infoBecomeButton.hasComponent(this.infoBecomeButtonShape))
            {
                this.infoBecomeButton.addComponentOrReplace(this.infoBecomeButtonShape)
            }

            if (this.infoAlreadyButton.hasComponent(this.infoAlreadyButtonShape))
            {
                this.infoAlreadyButton.removeComponent(this.infoAlreadyButtonShape)
            }
        }
    }

    public setCollider(): void
    {
        this.inCollider.addComponentOrReplace(this.inColliderShape)
        movePlayerTo({ x: 16, y: 0, z: 16 })
    }

    public dropCollider(): void
    {
        this.inCollider.removeComponent(this.inColliderShape)
    }

    public getButtons(): Array<Button>
    {
        return this.buttons
    }

    public getUI(): UI
    {
        return this.ui
    }
}