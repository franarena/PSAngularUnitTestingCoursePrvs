import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { of } from "rxjs";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";


describe('HeroesComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let HEROES;
    let mockHeroService;
    let lenHEROES: number = 0;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'Superman', strength: 24},
            { id: 2, name: 'Batman', strength: 5},
            { id: 3, name: 'Ironman', strength: 14}
        ];
        lenHEROES = HEROES.length;
        mockHeroService = jasmine.createSpyObj(["addHero", "getHeroes", "deleteHero"]);

        TestBed.configureTestingModule({
            declarations: [ HeroesComponent, HeroComponent ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: HeroService,
                    useValue: mockHeroService
                }
            ]
        });


        fixture = TestBed.createComponent(HeroesComponent);
    });
    

    it('should render each Hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //run ngOnInit
        fixture.detectChanges();

        const herComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(herComponentDEs.length).toEqual(lenHEROES);

        for (let i=0; i < herComponentDEs.length; i++){
            expect(herComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
        
    });
});