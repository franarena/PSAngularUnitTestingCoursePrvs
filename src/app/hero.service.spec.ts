import { TestBed } from "@angular/core/testing";
import { MessageService } from "./message.service";
import { HeroService } from "./hero.service";
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"

describe('HeroService', () => {

    let mockMessageService;
    let http: HttpTestingController;
    let service: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                HeroService,
                {
                    provide: MessageService,
                    useValue: mockMessageService
                }
            ]
        });

        http = TestBed.inject(HttpTestingController);
        service = TestBed.inject(HeroService);
    });

    describe('getHero', () => {
        it('should call get with the correct URL', () => {
            //call getHeto()
            service.getHero(4).subscribe(hero => {
                expect(hero.id).toBe(4);
            });
            //service.getHero(3).subscribe();

            //test that the URL was correct
            const req = http.expectOne('api/heroes/4');

            req.flush({ id: 4, name: 'SuperDude', strength: 100});
            expect(req.request.method).toBe('GET');
            http.verify();
        });
    });
});