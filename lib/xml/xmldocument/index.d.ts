interface XmlDocument<T> {
  /**
   * Если атрибут имеет значение true, это означает,
   * что при выходе из системы или при остановке сервера документы,
   * которые были изменены, будут сохраняться автоматически.
   * Обычно установлен у документов, содержащих настройки пользователя.
   */
  AutoSave: boolean;

  /**
   * Возвращает id документа (только для объектных документов).
   * Id вычисляется на основании url документа.
   * Если это не объектный документ, атрибут возвращает ошибку.
   */
  DocID: number;

  /**
   * Указатель на форму, по которой был открыт документ.
   * Если документ не имеет формы, возвращается ошибка.
   */
  Form: XmlForm;

  /**
   * Возвращает url формы, по которой был открыт документ.
   * Если документ не имеет формы, возвращается пустая строка.
   */
  FormUrl: string;

  /**
   * Флаг, обозначающий что документ был изменен.
   * Как правило, этот флаг автоматически устанавливается
   * при изменении пользователем данных в пользовательском интерфейсе,
   * но так же его можно читать и изменять программно.
   * В данный момент атрибут доступен только на чтение.
   */
  IsChanged: boolean;

  /**
   * По умолчанию имеет значение false.
   * Может иметь значение true, если документ был открыт с опцией {@link Separated},
   * в таком случае документ открывается как независимый документ,
   * не привязанный к базе данных. При его сохранении не вызывается OnSave и т.д.
   */
  IsSeparated: boolean;

  /**
   * Если для формы документа установлен параметр USE-LAST-SAVED-DATA="1",
   * то данный атрибут доступен в методе {@link OnSave}() документа.
   * Он устанавливается в соответствии с предыдущей сохраненной копией
   * корневого элемента документа.
   * Атрибут используется, если нужно сравнить предыдущее значение
   * с текущим, и определить, что значение было изменено.
   * Для документа, который еще не был ни разу сохранен,
   * атрибут вернет пустой корневой элемент, созданный по той же форме,
   * что и текущий документ.
   */
  LastSavedData: XmlDocument<T>;

  /**
   * Флаг, обозначающий, что документ был только что создан, и еще ни разу не сохранялся.
   */
  NeverSaved: boolean;

  /**
   * Возвращает id объектного документа.
   * Это новая версия атрибута DocID, разработанная для новой объектной модели.
   * В отличиие от DocID доступна на чтение и запись и поддерживает как целочисленные,
   * так и строковые Id.
   * Для документа, не являющегося объектным, выдается ошибка.
   */
  ObjectID: number;

  /**
   * В случае если документ открыт в экране,
   * возвращает ссылку на экран, иначе - undefined.
   */
  OptScreen: ScriptQueueElemDocument;

  /**
   * По умолчанию имеет значение true, означающие,
   * что при сохранении документа следует исполнить описанный
   * в форме документа метод {@link OnSave}.
   * Может быть переведен в значение false,
   * например для оптимизации массовой обработки документов.
   */
  RunActionOnSave: boolean;

  /**
   * В случае если документ открыт в экране,
   * возвращает ссылку на экран, иначе - выдает ошибку.
   * Смотри также атрибут {@link OptScreen}.
   */
  Screen: typeof Screen;

  /**
   * Свойство TempData содержит объект, в котором можно хранить произвольные данные.
   * Данные хранятся только на время, пока открыт документ.
   * Может быть использовано, в частности, для передачи данных между OnBeforeSave() и {@link OnSave}().
   * TempData представляет из себя стандартный объект в режиме совместимости.
   */
  TempData: Object;

  /**
   * Возвращает корневой элемент в документе.
   * Так же к можно обратиться к корневому элементу,
   * используя его имя, но TopElem - более универсальный способ.
   */
  TopElem: T;

  /**
   * Возвращает url документа.
   * Документ может не иметь url, в таком случае возвращается пустая строка.
   * Атрибут доступен на запись.
   */
  Url: string;

  /**
   * Если свойство имеет значение false (по умолчанию),
   * то при сохранении документов будет использована сокращенная форма записи,
   * т.е. Поля документа, не содержащие значений, экспортироваться не будут.
   * Это необходимо для сокращения размера документа.
   * Однако, при выгрузке (экспорте) документов обычно требуется сохранять документы в полном формате,
   * для чего данному атрибуту следует присвоить значение true.
   * В этом случае будут сохраняться все поля документа.
   */
  WriteAllNodes: boolean;

  /**
   * @deprecated
   * Экспериментальный атрибут. Не поддерживается.
   */
  WriteAsync: unknown;

  /**
   * По умолчанию имеет значение true, что означает,
   * что при сохранении документа будет записываться структура doc_info,
   * содержащее дату создания (из поля creation_date документа),
   * дату изменения (из поля last_mod_date документа),
   * логин пользователя, создавшего документ,
   * логин пользователя, изменившего документ.
   * В отдельных случаях целесообразно присваивать значение false,
   * если происходит массовая обработка документов программным способом,
   * например, при помощи агента.
   */
  WriteDocInfo: boolean;

  /**
   * По умолчанию имеет значение true, которое означает,
   * что документ будет занесен в полнотекстовый индекс при сохранении.
   * Может быть приведен в состояение false, полнотекстовое индексирование
   * по данному документу при этом будет отключено.
   * Это может быть использовано для оптимизации массовой обработки документов,
   * например, в конвертерах.
   */
  WriteFt: boolean;

  /**
   * По умолчанию имеет значение true, что означает,
   * что сохраняющиеся в XML-документах переносы строк маскируются
   * последовательностью символов '&#10&#13'. Выставлять этот атрибут
   * в значение false имеет смысл, если производится выгрузка (экспорт) документов.
   * В этом случае переносы строк будут выгружаться как есть, без маскировки.
   */
  WriteMaskLineBreaks: boolean;

  /**
   * @deprecated
   * Преобразует документ (как правило, вновь созданный) в объектный
   * с присвоением нового id (и соответственно url).
   * Устаревший метод.
   * В новой объектной модели используется метод DefaultDb.OpenNewObjectDoc(),
   * который сразу и создает новый объектный документ, и присваивает ему id и url.
   * Также в новой объектной модели используется метод {@link BindToDbObjectType}().
   * @param {string} [databaseName] - Имя базы.
   */
  BindToDb(databaseName?: string): undefined;

  /**
   * Преобразует документ (как правило, вновь созданный) в объектный
   * с присвоением нового id (и соответственно url).
   * @param {string} dbName - Имя базы.
   * @param {string} objectType - Тип объекта.
   * @example
   * ```
   * doc = OpenNewDoc("x-app://rcr/rcr_candidate.xmd");
   * doc.BindToDbObjectType("data", "candidate");
   * ```
   */
  BindToDbObjectType(dbName: string, objectType: string): void;

  /**
   * Запускает выполнение отдельного потока относительно данного документа.
   * В отличие от обычного объекта Thread,
   * этот метод позволяет более удобно работать с потоками.
   * Созданный поток получает документ в качестве базового указателя This.
   * Т.е. Можно создать документ с набором полей, содержащих какие-либо методы.
   * На основании этого документа можно запустить поток,
   * который будет видеть по умолчанию все поля этого документа.
   * По завершении потока этот документ автоматически освободится.
   * @param {string} code - Строка, содержащая код.
   * @example
   * ```
   * doc = OpenNewDoc("rcr_publich_vacancy.xmd");
   * doc.EvalThread("run()");
   * ```
   * Содержимое документа не является thread-safe, поэтому код,
   * вызывающий данную функцию, не должен обращаться к содержимому
   * документа после запуска потока в том случае, если поток изменяет содержимое документа.
   */
  EvalThread(code: string): void;

  /**
   * Находит в документе элемент внешнего хранения с заданным внешним Id.
   * Если элемент не найден, возвращается undefined.
   * @param {number} extID - Внешний Id элемента.
   */
  FindExtDataElemByFieldID(): XmlElem<number>;

  // KillActiveThread(): unknown;
  // LoadFromLds(): unknown;
  // MakeReport(): unknown;
  // PrepareLastSavedData(): unknown;

  /**
   * Сохраняет документ.
   * Если аргумент не указан, то сохраняет документ под существующим url.
   * Если аргумент указан, устаналиват url документа и сохраняет его.
   * @param {string} documentUrl - Url, под которым должен быть сохранен документ.
   */
  Save(documentUrl?: string): undefined;
  // SaveToLds(): unknown;
  // SaveToStream(): unknown;
  // SaveToUrl(): unknown;
  // SetCached(): unknown;
  // SetChanged(): unknown;
  // SetShared(): unknown;
  // SubElem(): unknown;
  // TopOrChildElem(): unknown;
  // UpdateValues(): unknown;
}

interface XmlTopElem<T> {
  name: XmlElem<string>;
  Name: string;
  Doc: T;
  /**
   * Возвращает дочерний элемент. Находит дочерний элемент по имени.
   * Если элемента с заданным именем нет, выдает `undefined`.
   * Смотри также метод {@link Child}.
   * @param {string} name - Имя дочернего элемента.
   */
  OptChild<T, K extends keyof T>(this: T, name: K): T[K] | undefined;
  AssignElem<T extends XmlTopElem<unknown>>(TopElem: T): void;
  EvalPath(pathName: string): unknown;
  role_id: XmlMultiElem<number>;
}
