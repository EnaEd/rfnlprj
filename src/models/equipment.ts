// ООП: конкретные классы техники, наследующиеся от RentalItem.
// Каждый класс переопределяет абстрактные методы (полиморфизм).

import { RentalItem } from './RentalItem';
import type { RentalItemData } from './RentalItem';
import type { Language } from '../i18n/types';

export const CATEGORY_LABELS_UK: Record<RentalItemData['category'], string> = {
  motoblock: 'Мотоблоки',
  minitractor: 'Міні-трактори',
  powertool: 'Електроінструмент',
  ladder: 'Драбини',
  stepladder: 'Стрем’янки',
};

export const CATEGORY_LABELS_RU: Record<RentalItemData['category'], string> = {
  motoblock: 'Мотоблоки',
  minitractor: 'Мини-трактора',
  powertool: 'Электроинструмент',
  ladder: 'Лестницы',
  stepladder: 'Стремянки',
};

export function getCategoryLabels(lang: Language = 'uk'): Record<RentalItemData['category'], string> {
  return lang === 'ru' ? CATEGORY_LABELS_RU : CATEGORY_LABELS_UK;
}

export const CATEGORY_LABELS = CATEGORY_LABELS_UK;

/** Мотоблок */
export class Motoblock extends RentalItem {
  public enginePower: number; // к.с. / л.с.
  public weight: number; // кг

  constructor(data: RentalItemData & { enginePower?: number; weight?: number }) {
    super({ ...data, category: 'motoblock' });
    this.enginePower = data.enginePower ?? Number(data.specs?.enginePower ?? data.specs?.['Потужність двигуна, к.с.'] ?? data.specs?.['Мощность двигателя, л.с.'] ?? 0);
    this.weight = data.weight ?? Number(data.specs?.weight ?? data.specs?.['Вага, кг'] ?? data.specs?.['Вес, кг'] ?? 0);
  }

  public get categoryLabel(): string {
    return this.getCategoryLabel('uk');
  }

  public getCategoryLabel(lang: Language = 'uk'): string {
    return lang === 'ru' ? CATEGORY_LABELS_RU.motoblock : CATEGORY_LABELS_UK.motoblock;
  }

  public getSpecs(lang: Language = 'uk'): Record<string, string | number | boolean> {
    if (lang === 'ru') {
      return {
        'Мощность двигателя, л.с.': this.enginePower,
        'Вес, кг': this.weight,
      };
    }
    return {
      'Потужність двигуна, к.с.': this.enginePower,
      'Вага, кг': this.weight,
    };
  }
}

/** Міні-трактор */
export class MiniTractor extends RentalItem {
  public horsePower: number; // к.с. / л.с.
  public hasCabin: boolean;

  constructor(data: RentalItemData & { horsePower?: number; hasCabin?: boolean }) {
    super({ ...data, category: 'minitractor' });
    this.horsePower = data.horsePower ?? Number(data.specs?.horsePower ?? data.specs?.['Потужність, к.с.'] ?? data.specs?.['Мощность, л.с.'] ?? 0);
    this.hasCabin = data.hasCabin ?? Boolean(data.specs?.hasCabin ?? (data.specs?.['Кабіна'] === 'Є' || data.specs?.['Кабина'] === 'Есть'));
  }

  public get categoryLabel(): string {
    return this.getCategoryLabel('uk');
  }

  public getCategoryLabel(lang: Language = 'uk'): string {
    return lang === 'ru' ? CATEGORY_LABELS_RU.minitractor : CATEGORY_LABELS_UK.minitractor;
  }

  public getSpecs(lang: Language = 'uk'): Record<string, string | number | boolean> {
    if (lang === 'ru') {
      return {
        'Мощность, л.с.': this.horsePower,
        Кабина: this.hasCabin ? 'Есть' : 'Нет',
      };
    }
    return {
      'Потужність, к.с.': this.horsePower,
      Кабіна: this.hasCabin ? 'Є' : 'Немає',
    };
  }
}

/** Електроінструмент */
export class PowerTool extends RentalItem {
  public voltage: number; // В
  public corded: boolean; // мережевий / акумуляторний

  constructor(data: RentalItemData & { voltage?: number; corded?: boolean }) {
    super({ ...data, category: 'powertool' });
    this.voltage = data.voltage ?? Number(data.specs?.voltage ?? data.specs?.['Напруга, В'] ?? data.specs?.['Напряжение, В'] ?? 0);
    this.corded = data.corded ?? Boolean(data.specs?.corded ?? (data.specs?.['Живлення'] === 'Від мережі' || data.specs?.['Питание'] === 'От сети' || true));
  }

  public get categoryLabel(): string {
    return this.getCategoryLabel('uk');
  }

  public getCategoryLabel(lang: Language = 'uk'): string {
    return lang === 'ru' ? CATEGORY_LABELS_RU.powertool : CATEGORY_LABELS_UK.powertool;
  }

  public getSpecs(lang: Language = 'uk'): Record<string, string | number | boolean> {
    if (lang === 'ru') {
      return {
        'Напряжение, В': this.voltage,
        Питание: this.corded ? 'От сети' : 'Аккумулятор',
      };
    }
    return {
      'Напруга, В': this.voltage,
      Живлення: this.corded ? 'Від мережі' : 'Акумулятор',
    };
  }
}

/** Драбина */
export class Ladder extends RentalItem {
  public height: number; // м
  public material: string;

  constructor(data: RentalItemData & { height?: number; material?: string }) {
    super({ ...data, category: 'ladder' });
    this.height = data.height ?? Number(data.specs?.height ?? data.specs?.['Висота, м'] ?? data.specs?.['Высота, м'] ?? 0);
    this.material = data.material ?? String(data.specs?.material ?? data.specs?.['Матеріал'] ?? data.specs?.['Материал'] ?? 'Алюміній');
  }

  public get categoryLabel(): string {
    return this.getCategoryLabel('uk');
  }

  public getCategoryLabel(lang: Language = 'uk'): string {
    return lang === 'ru' ? CATEGORY_LABELS_RU.ladder : CATEGORY_LABELS_UK.ladder;
  }

  public getSpecs(lang: Language = 'uk'): Record<string, string | number | boolean> {
    const isAlum = this.material === 'Алюминий' || this.material === 'Алюміній';
    const matDisplay = isAlum ? (lang === 'ru' ? 'Алюминий' : 'Алюміній') : this.material;
    if (lang === 'ru') {
      return {
        'Высота, м': this.height,
        Материал: matDisplay,
      };
    }
    return {
      'Висота, м': this.height,
      Матеріал: matDisplay,
    };
  }
}

/** Стрем’янка */
export class Stepladder extends RentalItem {
  public steps: number;
  public maxLoad: number; // кг

  constructor(data: RentalItemData & { steps?: number; maxLoad?: number }) {
    super({ ...data, category: 'stepladder' });
    this.steps = data.steps ?? Number(data.specs?.steps ?? data.specs?.['Кількість сходинок'] ?? data.specs?.['Кол-во ступеней'] ?? 0);
    this.maxLoad = data.maxLoad ?? Number(data.specs?.maxLoad ?? data.specs?.['Макс. навантаження, кг'] ?? data.specs?.['Макс. нагрузка, кг'] ?? 0);
  }

  public get categoryLabel(): string {
    return this.getCategoryLabel('uk');
  }

  public getCategoryLabel(lang: Language = 'uk'): string {
    return lang === 'ru' ? CATEGORY_LABELS_RU.stepladder : CATEGORY_LABELS_UK.stepladder;
  }

  public getSpecs(lang: Language = 'uk'): Record<string, string | number | boolean> {
    if (lang === 'ru') {
      return {
        'Кол-во ступеней': this.steps,
        'Макс. нагрузка, кг': this.maxLoad,
      };
    }
    return {
      'Кількість сходинок': this.steps,
      'Макс. навантаження, кг': this.maxLoad,
    };
  }
}

/** Фабрика: восстановление нужного класса из простых данных (из localStorage). */
export function createRentalItem(data: RentalItemData): RentalItem {
  switch (data.category) {
    case 'motoblock':
      return new Motoblock(data);
    case 'minitractor':
      return new MiniTractor(data);
    case 'powertool':
      return new PowerTool(data);
    case 'ladder':
      return new Ladder(data);
    case 'stepladder':
      return new Stepladder(data);
    default:
      throw new Error(`Неизвестная категория: ${data.category}`);
  }
}
