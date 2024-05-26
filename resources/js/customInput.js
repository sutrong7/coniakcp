let inpState;
const inputOb = {};

class OptionInputState extends State {
    constructor(cnt, optionStruct) {
        super(cnt, optionStruct);
    }

    onInputFocus(optionId) {
        $(`#${optionId}`).focus();
    }

    resetAllOptions() {
        this.loopStateAction((index) => {
            this.reset(index);
        });
        resetAllInput();
    }
}

/**
 * @param inputOption have title
 * @param parentIdList id list of parent markup element
 * @param optionForm
 */
const initInput = ({inputOption, parentIdList, optionForm}) => {
    inpState = new OptionInputState(1, optionForm);
    setupInputOptionOb(inputOption);
    parentIdList.map(pId => optionMaker(pId, makeInputMarkup));
    $(`.inp-focus-text`).hide();
    return inpState;
}

const setupInputOptionOb = ({optionCombineKey, optionDesc}) => inputOb[optionCombineKey] = optionDesc;

const makeInputMarkup = (parentId) => Object.keys(inputOb).map((op, sel_index) => {
    const container = $(`#${parentId}`);
    let optionInput = `inp-textarea-${op}`;
    let optionBox = `inp-focus-text`;
    let result = '<div class="inp-option-container">';
    result += `    <textarea id="${op}" placeholder="${inputOb[op]}" class="${optionInput} inp-textarea" maxlength="100"/>`;
    result += `    <p class="${optionBox}">`;
    result += `    </p>`;
    result += '</div>'
    result += `<div class="inp-digit-box">(<div style="display: contents;" class="inp-digit">0</div>/100)</div>`;

    container.on('change', `#${op}`, (e) => onChangeInput(e, optionInput));
    container.on('blur', `#${op}`, (e) => onBlurOption({e, optionInput, optionBox, inputTitle: inputOb[op]}));
    container.on('keydown', `#${op}`, (e) => onKeydownOption({e, optionBox, inputTitle: inputOb[op]}))
    container.on('focus', `#${op}`, (e) => onFocusOption({e, optionBox, inputTitle: inputOb[op]}));
    container.on('focusout', `#${op}`, (e) => onKeydownOption({e, optionBox, inputTitle: inputOb[op]}));
    return result;
})

function onChangeInput(e, optionInput) {
    inpState.setState(1, {optionKey: e.target.id, optionValue: e.target.value});
    $(`.${optionInput}`).val(e.target.value);
}

const onBlurOption = ({e, optionInput, optionBox, inputTitle}) => {
    console.log('text blur')
    if (e.target.value.length > 100) {
        $(`.${optionBox}`).show().text(inputTitle + '은(는) 100 글자를 넘길 수 없습니다.');
    } else {
        inpState.onValidSuccess();
        readyToOptionComplete({action: 'INPUT_COMPLETE', value: $(`.${optionInput}`).val()});
        $(`.${optionBox}`).hide();
    }
}

const onKeydownOption = ({e, optionBox, inputTitle}) => {
    if (e.target.value.length > 100) {
        e.target.value = e.target.value.substring(0,100)
        $(`.${optionBox}`).show().text(inputTitle + '은(는) 100 글자를 넘길 수 없습니다.');
    } else {
        $(`.${optionBox}`).hide();
    }
    $('.inp-digit').text(e.target.value.length);
}

const onFocusOption = ({e, optionBox, inputTitle}) => {
    if (e.target.value.length > 100) {
        $(`.${optionBox}`).show().text(inputTitle + '은(는) 100 글자를 넘길 수 없습니다.');

    } else {
        $(`.${optionBox}`).show().text(inputTitle + '을(를) 입력해주세요.');
    }
}

const resetAllInput = () => {
    Object.keys(inputOb).map(t => {
        $(`.inp-textarea-${t}`).val('');
        $('.inp-digit').text(0);
        // $('.inp-digit-box').hide();
    });
}
