
/**
 * Объект TagReader предназначен для последовательного чтения содержимого в формате HTML (реже - XML).
 * В каждый определенный момент `TagReader` указывает на некотрый текщий тэг, до которого дошло чтение.
 * Текст, находящий между тэгами, считается безымянным тэгом (атрибут `TagName` вернет пустую строку).
 */
interface TagReader {
  /**
   * Возвращает массив, состоящий из наименований всех атрибутов текущего тега.
   */
  readonly AttrNames: string[];

  /**
   * Для комментариев возвращает текст комментария, для именных тегов возвращает `undefined`, для безымянных тегов,
   * не являющихся комментариями - возвращает пустую строку.
   */
  readonly Comment: string | undefined;

  /**
   * Номер строки (начиная с нуля), в которой находится текущий указатель.
   */
  readonly CurLineIndex: number;

  /**
   * Возвращает `true`, если `TagReader` дошел до конца текста (находится в конце последнего тега), и `false`, если нет.
   */
  readonly EOF: boolean;

  /**
   * Атрибут доступен на запись. `True` означает, что все тэги, при считывании, будут приведены к нижнему регистру.
   * `False` означает, что теги будут читаться без приведения к нижнему регистру. По умолчанию имеет значение `true`.
   */
  ForceLowerCase: boolean;

  /**
   * Возвращает `true`, если текущий тег является групповым (т.е. Открывающим), и `false`, если не является.
   */
  readonly IsGroupTag: boolean;

  /**
   * Для именных тегов возвращает `undefined`. Для безымянных тегов, содержащих прочий текст (<?...?>), возвращает текст
   * без дополнительных символов. Для простого текста возвращает обычную строку.
   */
  readonly MiscText: string | undefined;

  /**
   * Для безымянных тегов возвращает текст тега, конвертированный в простой текст без дополнительных символов.
   * Для именованных тегов возвращает `undefined`, для комментариев возвращается пустая строка.
   */
  readonly PlainText: string | undefined;

  /**
   * Если указатель стоит на тексте между тегами, то возвращает этот текст в исходном виде, иначе - `undefined`.
   */
  readonly RawText: string | undefined;

  /**
   * Имя текущего тега (без скобок). Если указатель стоит на тексте или комментарий, возвращается пустая строка.
   */
  readonly TagName: string;

  /**
   * Возвращает текущую позицию указателя внутри документа (в символах), относительно начала читаемых данных.
   */
  readonly TagPos: number;

  /**
   * Возвращает строку с текущим тегом в каноническом виде (скобки, атрибуты). Если текущая позиция указывает не на именной тег, возвращает `undefined`.
   */
  readonly TagStr: string | undefined;

  /**
   * Удаляет из текущего тега атрибут с заданным именем, если такой существует.
   * Если атрибута с заданным именем у текущего тега нет, функция не производит никаких действий.
   * @param attrName - Имя атрибута, подлежащего удалению.
   */
  DeleteOptAttr(attrName: string): TagReader;

  /**
   * Экспортирует в заданный поток все зарегистрированные при помощи `RegisterCompoundAttc` хранимые вложенные файлы.
   * @param destStream - Поток, в который следует экспортировать вложенные файлы.
   */
  ExportCompoundAttc(destStream: Stream): TagReader;

  /**
   * Экспортирует текущий тег (любой - именной или безымянный) в заданный поток. Тег экспортируется в каноническом виде.
   * @param destStream - Поток, в который следует передать текущий тег.
   */
  ExportTag(destStream: Stream): TagReader;

  /**
   * Возвращает значение атрибута в текущем теге, если атрибута нет - возвращает пустую строку.
   * @param attrName - Имя атрибута.
   */
  GetAttr(attrName: string): string;

  /**
   * Возвращает `true`, если атрибут с заданным именем присутствует в теге и его значение не равно `0`, иначе - `false`.
   * @param attrName - Имя атрибута.
   */
  GetBoolAttr(attrName: string): boolean;

  /**
   * Возвращает фрагмент исходных данных, начиная с заданной позиции и заканчивая конечной.
   * @param startPos - Начальная позиция.
   * @param endPos - Конечная позиция.
   */
  GetRangePos(startPos: number, endPos: number): string;

  /**
   * Возвращает строку, содержащую текущий тег в каноническом виде (со всеми атрибутами, с правильно расставленными знаками кавычек и скобок).
   */
  GetTagStr(): string;

  /**
   * Сбрасывает `TagRader` в начальное состояние для чтения новых данных.
   * @param data - Содержимое в формате `HTML` или `XML`.
   */
  Init(data: string): TagReader;

  /**
   * Считывает дату в различных форматах с текущей позиции. Если даты ни в одном формате в теге нет, возвращает ошибку.
   * После успешного чтения указатель смещается на конец считанной строки с датой.
   */
  ReadDate(): Date;

  /**
   * Считывает фрагмент HTML от текущего тега до закрывающего его сбалансированного тега. Если тег одиночный, считывается сам тег.
   */
  ReadHtmlGroup(): string;

  /**
   * Считывает фрагмент html текста от текущей позиции до заданного тега.
   * @param tagName - Имя тега.
   */
  ReadHtmlUntilTag(tagName: string): string;

  /**
   * Читает следующий тег (именной или безымянный).
   */
  ReadNext(): TagReader;

  /**
   * Считывает текст до определенного тега и возвраащет результат в виде неформатированного текста.
   * После считывания указатель остается на начале найденного тега.
   * @param tagName - Имя тега.
   */
  ReadTextUntilTag(tagName: string): string;

  /**
   * Запоминает в текущем `TagReader` прикрепленный файл (`CompoundAttc`) для последующего его экспорта при помощи функции `ExportCompoundAttc`.
   * Используется при обработке `HTML`, когда одновременно с чтенеим происходит экспорт обработанных данных.
   * @param fileName - Имя вложенного фалы (относительный путь).
   * @param data - Содержимое вложенного файлы в виде строки.
   */
  RegisterCompoundAttc(fileName: string, data: string): string;

  /**
   * Устанавливает значение заданного атрибута в текущем теге.
   * Следует учесть, что обычно `TagReader` используется только для чтения, но если TagReader используется для обработки HTML-документов,
   * то после обработки следует функция `Export`. `SetAttr()` подменяет заданный атрибут для последующего экспорта.
   * @param attrName - Имя атрибута.
   * @param attrValue - Значение атрибута.
   */
  SetAttr(attrName: string, attrValue: string): TagReader;

  /**
   * Осуществляет поиск определенного текста (неформатированного) не разделенного тэгами. Если текст не найден, генерируется ошибка.
   * После нахождения текста указатель остается в конце текстового блока между тэгами, в котром находится найденый текст.
   * @param text - Текст, который нужно найти.
   */
  SkipToPlainText(text: string): TagReader;

  /**
   * Перемещает указатель на определенный тег с заданными атрибутами и оставляет указатель на начале этого тега. В случае если атрибут
   * необязателен (аргумент `isOptional` равен `true`), то возвращает true при условии, что тег найден, и `false` - если не найден. Если аргумент
   * обязательный, и заданный тег не найден, вызывается исключение.
   * Смотри также `SkipToTagInc()`.
   */
  SkipToTag(tagName: string, attrMask?: string, isOptional?: boolean): boolean | undefined;

  /**
   * Перемещает указатель на определенный тег с заданными атрибутами и оставляет указатель на начале этого тега. В случае если атрибут
   * необязателен (аргумент `isOptional` равен `true`), то возвращает `true` при условии, что тег найден, и `false` - если не найден. Если аргумент
   * обязательный, и заданный тег не найден, вызывается исключение.
   * Смотри также `SkipToTag()`.
   */
  SkipToTagInc(tagName: string, attrMask?: string, isOptional?: boolean): boolean | undefined;
}

interface TagReaderConstructor {
  /**
   * Содержимое в формате `HTML` или `XML`.
   */
  new(data: string): TagReader;
  /**
   * Содержимое в формате `HTML` или `XML`.
   */
  (data: string): TagReader;
}

declare const TagReader: TagReaderConstructor;
