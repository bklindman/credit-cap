import { Component, OnInit, Input } from '@angular/core';
import { CardService } from '../services/card.service';
import { CreditCard } from '../interfaces/CreditCard';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input() cards: CreditCard[];
  constructor(private cardService: CardService, private numberPipe: DecimalPipe ) { }

  ngOnInit() {
    if(!this.cards){
      this.getAllCards();
    }
  }

  getAllCards(): void {
    this.cardService.getAllCreditCards().subscribe((cards) => {
      this.cards = cards;
    });
  }

  getFullName(card: CreditCard): String{
    return `${card.institution} ${card.name}`;
  }

  getRewardsSummary(card: CreditCard): String[] {
    let rewards: String[] = [];
    for(let reward of card.point_system.rewards){
      rewards.push(`${reward.rate}${card.point_system.ratio_type} ${card.point_system.unit} on ${reward.name}`);
    }
    if(card.point_system.base_rate){
      rewards.push(`${card.point_system.base_rate}${card.point_system.ratio_type} ${card.point_system.unit} on everything`);
    }
    return rewards;
  }

  getBonusDescription(card: CreditCard): String {
    let formattedBonus = this.numberPipe.transform(card.point_system.bonus);
    if(card.point_system.unit === 'Cashback'){
      return `$${formattedBonus}`;
    }
    let dollarValue = this.numberPipe.transform(card.point_system.bonus/100);
    return `${formattedBonus} ${card.point_system.unit} ($${dollarValue} value)`;
  }

  getFeeDescription(card: CreditCard): String {
    if(!card.fee.amount) return `$0`;
    let res: String = `$${card.fee.amount}`;
    if(card.fee.is_waived_1st_yr) res = [res, '(waived for the 1st year)'].join(' ');
    return res;
  }
}
