/**
 * Конструктор объекта javascript. Создает новый объект.
 * По умолчанию для объекта определен атрибут HasProperty и методы
 * AddProperty , SetProperty , GetProperty , GetOptProperty .
 */
interface Object {
  [key: string]: unknown;

  /**
   * Выдает true, если атрибут с заданным наименованием существует,
   * и false - если не существует. Смотри также GetOptProperty,
   * GetOptProperty и SetProperty.
   * @param key - Наименование атрибута объекта.
   */
  HasProperty(key: string | number): boolean;

  /**
   * Добавляет в объект (javascript object) новый атрибут, и присваивает ему значение.
   * @param {string} key - Наименование атрибута.
   * @param name - Значение атрибута (variant).
   */
  AddProperty(key: string | number, name: unknown): void;

  /**
   * Возвращает значение атрибута объекта. Если атрибут отсутствует, выдает undefined.
   * @param {string} key - Наименование атрибута объекта.
   * @param defaultValue - Значение по умолчанию, возвращаемое в случае
   * отсутствия атрибута (Any). Необязательный аргумент. По умолчанию равен undefined.
   */
  GetOptProperty<T, K extends keyof T>(this: T, key: K): T[K];
  GetOptProperty<T, K extends string>(this: T, key: K): K extends keyof T ? T[K] : undefined;
  GetOptProperty<T, K extends keyof T, P>(this: T, key: K, defaultValue?: P): T[K] | P;

  /**
   * Выдает значение атрибута объекта. Если атрибут отсутствует, выдает ошибку.
   * Смотри также {@link GetOptProperty}() и SetProperty.
   * @param key - Наименование атрибута объекта.
   * @example AppConfig.GetProperty( 'alt-app-name' );
   * @throws {Error}
   */
  GetProperty(key: string | number): unknown | never;

  /**
   * Устанавливает значение атрибута объекта. Если атрибут отсутствует,
   * добавляет его. Смотри также {@link GetOptProperty}() и GetProperty.
   * @param key - Наименование атрибута объекта.
   * @param value - Значение атрибута объекта.
   */
  SetProperty(key: string | number, value: unknown): void;
}

interface ObjectConstructor {
  new(value?: unknown): Object;
  (value?: unknown): Object;
  (): Object;
}

declare const Object: ObjectConstructor;
