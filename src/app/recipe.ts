import { Ingredient } from './ingredient';
import { JsonProperty, Utils } from './services/utils.service';

export class Recipe {
    id: string;
    title: string;
    description: string;
    prepTime: string;
    cookTime: string;
    serving: string;
    tags: string[];
    @JsonProperty({clazz: Ingredient})
    ingredients: Ingredient[];
    steps: string[];
    imagePaths: string[];
    author: string;
    authorId: string;
    key: string;
    initDate: number;
    updateDate: number;


    constructor(
        title?: string,
        description?: string,
        prepTime?: string,
        cookTime?: string,
        serving?: string,
        tags?: string[],
        ingredients?: Ingredient[],
        steps?: string[],
        imagePaths?: string[]
    ) {
        // this.id = this.generateGUID();
        this.title = title || "";
        this.description = description || "";
        this.prepTime = prepTime || "";
        this.cookTime = cookTime || "";
        this.serving = serving || "";
        this.tags = tags || [];
        this.ingredients = ingredients || [];
        this.steps = steps || [];
        this.imagePaths = imagePaths || [];
        this.author = "";
        this.authorId = "";
        this.key = "";
    }

    generateGUID() {
        function _p8(s? :boolean): string {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return (_p8() + _p8(true) + _p8(true) + _p8()).toString();
    }
}