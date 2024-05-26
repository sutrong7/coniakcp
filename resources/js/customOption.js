let selectState;
let inputState;
let ajaxFunc;
let completeStatusList = []

const formState={
    select:{
        isSelected: false,
        optionKey: null,
        optionValue: null
    },
    input: {
        optionKey: null,
        optionValue: null
    }
}

const optionConstant = {
    INPUT_COMPLETE: 'INPUT_COMPLETE',
    SELECT_COMPLETE: 'SELECT_COMPLETE'
};


// 상태관리
class State {
    constructor(totalCnt, optionForm) {
        this.optionLength = totalCnt;
        this.baseForm = optionForm;
        this.isValid = false;
        for (let i = 1; i <= totalCnt; i++) {
            this.reset(i);
        }
    }

    loopStateAction(fn) {
        for (let i = 1; i <= this.optionLength; i++) {
            fn(i)
        }
    }

    reset(n) {
        this[`option${n}`] = JSON.parse(JSON.stringify(this.baseForm));
        this.isValid = false;
    }

    setState(n, datas) {
        this[`option${n}`] = {...this[`option${n}`], ...datas};
    }

    getKeyValue(n) {
        const {optionKey, optionValue} = this[`option${n}`];
        return {optionKey: optionValue};
    }

    onValidSuccess() {
        this.isValid = true;
    }
}

/**
 * @param options options regard to each option
 * @param optionDetail options integrating each options with single String and having a number about product option
 * @param parentIdList id list of parent markup element
 * @param fn_ajax must be promise
 * @param inputOption option regard to input
 */
const initializeOption = ({options, optionDetail, parentIdList, fn_ajax, inputOption}) => {

    if (optionDetail.length !== 0) {
        selectState = initSelection({
            options, optionDetail, parentIdList, optionForm: formState.select
        });
        completeStatusList.push({
            action: optionConstant.SELECT_COMPLETE,
            complete: false,
            optionType: options[0].optionType,
            value: '',
        });
    }

    if (inputOption !== null) {
        inputState = initInput({
            inputOption, parentIdList, optionForm: formState.input
        });
        completeStatusList.push({
            action: optionConstant.INPUT_COMPLETE,
            complete: false,
            optionName: inputOption.optionDesc,
            optionType: options[0].optionType,
            value: ''
        });
    }


    if (completeStatusList.length > 0) {
        ajaxFunc = callAjax(fn_ajax);
    }
    if (options.length < 1) {
        $(function () {
            fn_ajax("0");
        })
    }
};

const readyToOptionComplete = ({action, value}) => {
    console.log(completeStatusList);

    completeStatusList.map((c, index) => {

        if (c.action === action) {
            completeStatusList[index].value = value;
            completeStatusList[index].complete = true;
        }
        if (c.value === '') {
            completeStatusList[index].complete = false;

        }
        console.log('readyToSend\n', c, c.action, action, value, c.action === action, c.value === '');
    });
    console.log(completeStatusList);
    if (completeStatusList.reduce((acc, cur) => acc ? !!cur.complete : false, true)) {
        ajaxFunc(completeStatusList);
    }
}

/**
 * @param parentId parent id for appending
 * @param makeMarkup The function
 * @returns {*|jQuery}
 */
const optionMaker = (parentId, makeMarkup) => $(`#${parentId}`).append(makeMarkup(parentId).reduce((acc, cur) => {
    acc += cur;
    return acc;
}, ''));

const callAjax = (fn_ajax) => (on) => fn_ajax(on).then(reset);

const reset = () => {
    selectState?.resetAllOptions();
    inputState?.resetAllOptions();
    completeStatusList = completeStatusList.map(c => {
        c.value = '';
        c.complete = false;
        return c;
    });
};