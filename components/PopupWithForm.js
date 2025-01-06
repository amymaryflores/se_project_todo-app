import Popup from "./Popup";

class PopupWithForm extends Popup {
    constructor (popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }
}

export default PopupWithForm;