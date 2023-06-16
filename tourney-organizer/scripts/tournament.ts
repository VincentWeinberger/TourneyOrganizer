class Tournament {
    private id: string
    private numPlayers: number
    private typeSport: string
    private typeElim: string
    private seeded: boolean
    private participants: Map<string, string>

    constructor(id: string = "", numPlayers: number = 0, typeSport: string = "", typeElim: string = "", seeded: boolean = false) {
        this.id = id
        this.numPlayers = numPlayers
        this.typeSport = typeSport
        this.typeElim = typeElim
        this.seeded = seeded
        this.participants = new Map()
        for(let i=1; i<numPlayers; i++) {
            this.participants.set(`${i}`, `Player ${i}`)
        }
    }

    toString(): string {
        return JSON.stringify(this)
    }

    fromString(stringClassObj: string): void {
        const parsedObj = JSON.parse(stringClassObj)
        this.id = parsedObj.id
        this.numPlayers = parsedObj.numPlayers
        this.typeSport = parsedObj.typeSport
        this.typeElim = parsedObj.typeElim
        this.seeded = parsedObj.seeded
        this.participants = new Map(Object.entries(parsedObj.participants))
    }
}

export default Tournament