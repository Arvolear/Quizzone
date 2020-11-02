import { Sounds } from "../app/sounds"

export class SoundsTrackerSystem
{
    private sounds: Sounds

    constructor()
    {
        this.sounds = Sounds.getInstance()
    }

    update(dt: number)
    {
        let cameraPosition = Camera.instance.position

        let transform = new Transform(
            {
                position: new Vector3(cameraPosition.x, cameraPosition.y + 1, cameraPosition.z)
            })

        this.sounds.getPassiveSoundsEntity().addComponentOrReplace(transform)
        this.sounds.getActiveSoundsEntity().addComponentOrReplace(transform)
        this.sounds.getNeutralSoundsEntity().addComponentOrReplace(transform)     
    }
}