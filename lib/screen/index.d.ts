declare namespace Screen {
  var Doc: XmlDocument;
  var EditMode: boolean;
  var ExposeItemBySource: string;
  var FocusItem: string;
  var FrameName: string;
  var HolderElem: string;
  var LinkedDocs: string;
  var OptHolderElem: string;
  var Ps: string;

  function AskFileSave(): void;
  function AddExternalEditor(): void;
  function AddLinkedDoc(): void;
  function AskColor(): void;
  function AskDirectory(): void;
  function AskDirectoryPath(): void;
  function AskFileOpen(url?: string, extPattern?: string): string;
  function AskFilesOpen(): void;
  function AskFont(): void;
  function BringWindowToFront(): void;
  function CheckSpelling(): void;
  function Close(): void;
  function FindItemByType(): void;
  function FindItemRec(): void;
  function FindOptItem(): void;
  function FindOptItemByType(): void;
  function FlashWindow(): void;
  function ModalDlg(modalDialog: XmlDocument): void;

  /**
   * Выдает стандартный диалог Windows с сообщением относительно текущего экрана.
   * @param {string} message - Текст сообщения.
   * @param {string} subject - Текст заголовка.
   * @param {string} type - Тип диалогового окна.
   * @param {string} titles - Наименование кнопок диалогового окна.
   * @example
   * ```
   * Screen.MsgBox(UiText.messages.operation_will_be_cancelled, UiText.messages.warning_msg_title, "question", "yes,no");
   * Screen.MsgBox(UiText.messages.changes_require_server_restart, UiText.messages.info_msg_title, "info");
   * ```
   */
  function MsgBox(message: string, subject: string, type: string, titles: string): boolean;
  function Navigate(): void;
  function Print(): void;
  function RemoveLinkedDocByUrl(): void;
  function RunCommand(): void;
  function RunCommandAsync(): void;
  function SaveDoc(): void;
  function SetDoc(): void;
  function SetInitSearch(): void;
  function SetTimer(): void;
  function SetWindowTopmost(): void;
  function ShowErrorMsg(): void;
  function Update(): void;
  function UpdateAsync(): void;
  function UpdateExcpt(): void;
  function WindowClientWidth(): void;
}
