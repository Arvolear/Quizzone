export abstract class SceneCallback
{
    abstract startGame(): void
    abstract setMember(member: boolean): void
    abstract setColliderAndTeleport(): void
    abstract dropCollider(): void
    abstract turnOnButtonCollisions(): void    
    abstract turnOffButtonCollisions(): void    
    abstract turnOnSpecialCaseCollision(): void
    abstract buyBoostersIfShould(): void
}