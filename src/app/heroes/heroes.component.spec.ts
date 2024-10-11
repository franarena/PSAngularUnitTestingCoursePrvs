import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";

describe("HeroesComponent", () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(()=> {
        HEROES = [
            { id: 1, name: 'Superman', strength: 8},
            { id: 2, name: 'Batman', strength: 5},
            { id: 3, name: 'Ironman', strength: 24}
        ];

        mockHeroService = jasmine.createSpyObj(["addHero", "getHeroes", "deleteHero"]);

        component = new HeroesComponent(mockHeroService);
    });

    describe('delete', () => {
        it('should remove the indicated hero from heroes list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            let heroToDelete = HEROES[2];

            component.delete(heroToDelete);

            expect(component.heroes.length).toBe(2);
        });
    });
});