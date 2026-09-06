import { WithUuid } from 'src/common/mixins/with-uuid.mixin/with-uuid.mixin';

export class Coffee {
  constructor(public name: string) {}
}

const CofeeWithUuid = WithUuid(Coffee);
const coffee = new CofeeWithUuid('Cappuccino');
console.log(coffee.uuid, coffee.name);
