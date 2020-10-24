export abstract class SceneCallback
{
    abstract startGame(): void
    abstract setMember(member: boolean): void
    abstract setCollider(): void
    abstract dropCollider(): void
}