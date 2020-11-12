export abstract class UICallback
{
    public static properties: Entity    
    public static canvas: UICanvas

    abstract showInfo(): void
    abstract showHowToPlay(): void    
    abstract showTopUp(): void
    abstract hideTopUp(): void
    abstract showMember(): void
    abstract hideMember(): void
    abstract showCheckMetamask(): void
    abstract hideCheckMetamask(): void    
    abstract showStartUp(): void
    abstract hideStartUp(): void
    abstract showAutocompleteButton(): void
    abstract showAutocompleteWindow(): void
    abstract hideAutocompleteWindow(): void
    abstract hideAutocomplete(): void
    abstract showAutocutButton(): void
    abstract showAutocutWindow(): void
    abstract hideAutocutWindow(): void
    abstract hideAutocut(): void
    abstract showLeaveButton(): void
    abstract showLeaveWindow(): void
    abstract hideLeaveWindow(): void
    abstract hideLeave(): void
    abstract showControlButtons(): void
    abstract hideControlButtons(): void
    abstract showHourglass(): void
    abstract hideHourglass(): void
    abstract showTick(time: number): void
    abstract setMember(member: boolean): void
    abstract hideAllWindows(): void
    abstract showUniversalError(message: string): void
    abstract showNotEnoughManaFundsError(): void
    abstract showWaitStartError(message: string): void
    abstract showWaitEndError(message: string): void
    abstract hideError(): void
    abstract updateAutocompletePrice(): void
    abstract updateAutocutPrice(): void
    abstract updateAutocompleteLeft(): void
    abstract updateAutocutLeft(): void
    abstract updateLeaveMessage(): void
    abstract updateCanJoinTimer(): void
    abstract buyBoostersIfShould(): void
}