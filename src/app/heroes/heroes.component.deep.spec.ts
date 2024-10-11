import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { of } from "rxjs";
import { Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Directive({
    selector: '[routerLink]',
    host: { '(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
    @Input('routerLink') linkParams: any;
    navigateTo: any = null;

    onClick() {
        this.navigateTo = this.linkParams;
    }
}


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
            declarations: [ HeroesComponent, HeroComponent, RouterLinkDirectiveStub ],
            //schemas: [NO_ERRORS_SCHEMA],
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


    it('sholed call heroService.deleteHero when the Hero Component\'s delete button is clicked', () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect(heroComponents.length).toBe(lenHEROES);
        heroComponents[0].query(By.css('button'))
            .triggerEventHandler('click', { stopPropagation: () => {} });

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
        //expect(fixture.componentInstance.delete).toHaveBeenCalled();
    });

    it('sholed call heroService.deleteHero when the Hero Component\'s delete button is clicked 2', () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect(heroComponents.length).toBe(lenHEROES);
        (heroComponents[0].componentInstance as HeroComponent).delete.emit(undefined);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('sholed call heroService.deleteHero when the Hero Component\'s delete button is clicked 3', () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        expect(heroComponents.length).toBe(lenHEROES);
        heroComponents[0].triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('should add a new hero to the hero list when the add button is clicked', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const newHeroName = "Mr. Ice";
        mockHeroService.addHero.and.returnValue(of({id: 5, name: newHeroName, strength: 4}));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = newHeroName;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(newHeroName);
    });

    it('should have the correct route for the first hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();        
        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

        let routerLink = heroComponents[0]
            .query(By.directive(RouterLinkDirectiveStub))
            .injector.get(RouterLinkDirectiveStub);

        heroComponents[0].query(By.css('a')).triggerEventHandler('click', undefined);

        expect(routerLink.navigateTo).toBe('/detail/1');

    });
});