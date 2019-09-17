import { Component, OnInit } from '@angular/core';
// import { CardListComponent } from '../card-list/card-list.component';
import { CardService } from '../services/card.service';
import { CreditCard } from '../interfaces/CreditCard';

@Component({
  selector: 'app-recommended-cards',
  templateUrl: './recommended-cards.component.html',
  styleUrls: ['./recommended-cards.component.scss']
})
export class RecommendedCardsComponent implements OnInit {
  cards: CreditCard[] = [];
  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.getRecommendedCards();
  }

  getRecommendedCards(): void {
    this.cardService.recommendCards().subscribe((cards) => {
      this.cards = cards;
    });
  }

}
