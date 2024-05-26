const optionOb = {};
const titleIdList = {};
let optionAndValue;
let selState;
let lastOptionIndex = 0;
let finalOptions;

// 상태관리 파생 state
class OptionSelectState extends State {
    constructor(cnt, optionStruct, optionAndValue) {
        super(cnt, optionStruct);
        this.optionAndValue = optionAndValue;
    }

    validate(n) {
        return n !== 1 && !this[`option${n - 1}`].isSelected;
    }

    validateAllState() {
        let isValid = true;
        this.loopStateAction((index) => {
            if (!this[`option${index}`].isSelected)
                isValid = false;
        })
        return isValid;
    }

    resetAllOptions() {
        this.loopStateAction((index) => {
            this.reset(index);
        })
        resetAllSelectText();
    }

    getKeyValue(n) {
        const {optionKey, optionValue} = this[`option${n}`];
        if (optionKey) {
            return optionKey + ':' + optionValue;
        }
        return '';
    }

    combineSelectedOptions() {
        let result = '';
        this.loopStateAction((index) => {
            result += this.getKeyValue(index) + (this.optionLength != index ?
                '|' : '');
        });
        return result;
    }

    getSelectedOptionNumber() {
        let entireOption = this.combineSelectedOptions();
        return this.optionAndValue[entireOption].optionNo;
    }
}

/**
 * @param options options regard to each option
 * @param optionDetail options integrating each options with single String and having a number about product option
 * @param parentIdList id list of parent markup element
 * @param optionForm default form for using state
 */
const initSelection = ({options, optionDetail, parentIdList, optionForm}) => {
    finalOptions = options;
    optionAndValue = options.reduce((acc, cur) => ({
        ...acc,
        [cur.optionCombineKey]: {addSalesPrice: cur.addSalesPrice, optionNo: cur.optionNo}
    }), {});
    lastOptionIndex = optionDetail[optionDetail.length - 1].optionSeq;
    selState = new OptionSelectState(lastOptionIndex, optionForm, optionAndValue);
    setupOptionOb(optionDetail);
    parentIdList.map(pId => optionMaker(pId, makeSelectMarkup));
    $('.option-list').toggle();
    return selState;
};


const setupOptionOb = (optionDetail) =>
    optionDetail.map((datas) => {
        const {optionCode, optionValue, optionSeq, valueSeq, optionName} = datas;
        if (!optionOb[optionCode]) {
            optionOb[optionCode] = [];
        }
        optionOb[optionCode].push({
            code: optionCode,
            name: optionName,
            value: optionValue,
            depth: optionSeq,
            order: valueSeq
        });
    });

const arrToString = (arr, callback) => arr.reduce(callback, '');

const makeSelectMarkup = (parentId) =>
    Object.keys(optionOb).map((op, sel_index) =>
        `${arrToString(optionOb[op], (acc, {
            name,
            code,
            value
        }, index) => {
            const container = $(`#${parentId}`);
            let optionHead = `selection-${code}`;
            let optionContainer = `option-list-${code}`;
            let option = `option-item-${code}${index}`;
            if (index === 0) {
                acc += `<div class="item-selected ${optionHead}" id="${optionHead}" >${name}</div>`;
                acc += `<ul class="option-list ${optionContainer}" id='${optionContainer}'>`;
            }
            acc += `<li class="option-item" id='${option}'>${value}</li>`;
            if (index === optionOb[op].length - 1) {
                acc += '</ul>';
                container.on('click', `#${optionHead}`, onClickOptionHead({
                    selectedOptionIndex: sel_index + 1,
                    toggleTarget: `.${optionContainer}`,
                    lastOptions: optionOb[op],
                    opContainerId: optionContainer
                }));
            }
            container.on('click', `#${option}`,
                onClickOption({
                    toggleTarget: `.${optionContainer}`,
                    textTarget: `.${optionHead}`,
                    title: name,
                    value,
                    code,
                    selectedOption: sel_index + 1
                })
            );
            if (!titleIdList[optionHead]) {
                titleIdList[optionHead] = name;
            }
            return acc;
        })}`
    );

const onClickOptionHead = ({toggleTarget, selectedOptionIndex, lastOptions, opContainerId}) => (e) => {
    if (selState.validate(selectedOptionIndex)) return;
    if (selectedOptionIndex === lastOptionIndex) {
        onChangeLastOption({lastOptions, opContainerId});
    }
    $(toggleTarget).toggle();
};

const onChangeLastOption = ({lastOptions, opContainerId}) => {
    lastOptions.map(({code, value},index) => {
        let plusPrice = 0;
        if (lastOptionIndex !== 1) {
            plusPrice = selState.optionAndValue[selState.combineSelectedOptions() + code + ':' + value]?.addSalesPrice;
        } else {
            plusPrice = selState.optionAndValue[code + ':' + value].addSalesPrice;
        }
        let priceText = plusPrice > 0 ? '(+' + plusPrice + '원)' : '';
        let ele=$(`.${opContainerId} li`)[index];
        $(ele).text(value+priceText);
        // for(let i=1;i<=titleIdList.length;i++) {
        // }
    });
};

const onClickOption = ({textTarget, code, title, value, toggleTarget, selectedOption}) => (e) => {
    $(textTarget).text(`${title}: ${value}`);
    selState.setState(selectedOption, {isSelected: true, optionKey: code, optionValue: value});
    $(toggleTarget).toggle();
    if (selectedOption === lastOptionIndex && selState.validateAllState()) {
        //상품 추가 로직
        selState.onValidSuccess();
        const selectedNumber = selState.getSelectedOptionNumber();
        if (selectedNumber) {
            // $("#optionNo").val(selectedNumber);
            readyToOptionComplete({action: 'SELECT_COMPLETE', value: selectedNumber});
        } else {
            alert('해당상품은 현재 판매되지 않는 옵션입니다.');
        }
    }
}

const resetAllSelectText = () => Object.keys(titleIdList).map(t => $(`.${t}`).text(titleIdList[t]));
