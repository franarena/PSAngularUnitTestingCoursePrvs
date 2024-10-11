import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";


describe('HeroesComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let HEROES;
    let mockHeroService;
    let lenHEROES: number = 0;

    @Component({
        selector: "app-hero",
        template: "<div></div>",
      })
       class FakeHeroComponent {
        @Input() hero: Hero;      
      }    

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'Superman', strength: 24},
            { id: 2, name: 'Batman', strength: 5},
            { id: 3, name: 'Ironman', strength: 14}
        ];
        lenHEROES = HEROES.length;
        mockHeroService = jasmine.createSpyObj(["addHero", "getHeroes", "deleteHero"]);

        TestBed.configureTestingModule({
            declarations: [ HeroesComponent, FakeHeroComponent ],
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


    it('should set heroes correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(lenHEROES);
    });

    it('should create one li for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(lenHEROES);
    });      
});