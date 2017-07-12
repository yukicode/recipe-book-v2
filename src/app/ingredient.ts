export class Ingredient {
    _amount: number;
    _name: string;
    _unit: string;
    amountString: string;

    constructor(
        name: string, 
        amount? : number,
        unit? : string
        ) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }

    public get amount(): number{
        return this._amount;
    }

    public set amount(n: number){
        this._amount = n;
        this.amountString = n ? n.toString(): '';
    }

    public get name(): string {
        return this._name;
    }

    public set name(s: string) {
        this._name = s;
    }

    public get unit(): string {
        return this._unit;
    }

    public set unit(s: string){
        this._unit = s;
    }
}

/*******************************************************
 * Examples
 * 
 * Subtitle
 * new Ingredient("Spice mix");
 * 
 * To taste
 * new Ingredient("salt", 0, "to taste");
 * 
 * Portions (1/4) cup
 * new Ingredient("water", 0.25, "cup");
 *******************************************************/
