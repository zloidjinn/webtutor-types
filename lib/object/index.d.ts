/**
 * Конструктор объекта javascript. Создает новый объект.
 * По умолчанию для объекта определен атрибут HasProperty и методы
 * AddProperty , SetProperty , GetProperty , GetOptProperty .
 */
interface Object {
  [key: string]: any;

  /**
   * Выдает true, если атрибут с заданным наименованием существует,
   * и false - если не существует. Смотри также GetOptProperty,
   * GetOptProperty и SetProperty.
   * @param key наименование атрибута объекта
   */
  HasProperty(key: string | number): boolean;

  /**
   * Добавляет в объект (javascript object) новый атрибут, и присваивает ему значение.
   * @param key наименование атрибута (string)
   * @param name значение атрибута (variant)
   */
  AddProperty(key: string | number, name: unknown): void;

  /**
   * Возвращает значение атрибута объекта. Если атрибут отсутствует, выдает undefined.
   * @param {string} key - наименование атрибута объекта.
   * @param defaultValue - значение по умолчанию, возвращаемое в случае
   * отсутствия атрибута (Any). Необязательный аргумент. По умолчанию равен undefined.
   */
  GetOptProperty<T, K extends keyof T>(this: T, key: K): T[K] | undefined;
  GetOptProperty<T, K extends keyof T, P>(this: T, key: K, defaultValue?: P): T[K] | P;

  /**
   * Выдает значение атрибута объекта. Если атрибут отсутствует, выдает ошибку.
   * Смотри также GetOptProperty() и SetProperty.
   * @param key наименование атрибута объекта
   * @example AppConfig.GetProperty( 'alt-app-name' );
   * @throws {Error}
   */
  GetProperty(key: string | number): any | never;

  /**
   * Устанавливает значение атрибута объекта. Если атрибут отсутствует,
   * добавляет его. Смотри также GetOptProperty() и GetProperty.
   * @param key наименование атрибута объекта.
   * @param value значение атрибута объекта.
   */
  SetProperty(key: string | number, value: any): void;
}

interface ObjectConstructor {
  new(value?: any): Object;
  (value?: any): Object;
  (): Object;
}

declare const Object: ObjectConstructor;
