//=================================== Khai bao cac bien can thiet ===============
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


//=================================== Doi tuong Validator ========================
function Validator(options) {

    // Ham truy xuat phan tu cha
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            else element = element.parentElement;
        }
    };


    // Tao 1 object luu lai cac validator
    var selectorRules = {};

    // Ham thuc hien validate
    function validate(inputElement, inputElementParent, errorElement, rule) {

        var errorMessage;
        // Lay ra cac rule cua chinh selector
        var rules = selectorRules[rule.selector];

        // Lap qua tung rule & kiem tra
        // Neu co loi thi se dung ngay viec kiem tra
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            console.log(errorMessage);
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElementParent.classList.add('invalid');
        }
        else {
            errorElement.innerText = ' ';
            inputElementParent.classList.remove('invalid');
        }

        return !!errorMessage;
    }

    // Lay element cua form can validate
    var formElement = $(options.form);
    if (formElement) {
        // Khi submit tren form
        formElement.onsubmit = function (e) {
            // Ngan chan hanh vi submit
            e.preventDefault();

            // Variable check error
            var isFormvalid = true;
            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector);
                var inputElementParent = getParent(inputElement, options.formGroupSelector);
                var errorElement = inputElementParent.querySelector(options.errorSelector);
                var isValid = validate(inputElement, inputElementParent, errorElement, rule);
                if (isValid) {
                    isFormvalid = false;
                }
            });

            if (isFormvalid) {
                // Truong hop submit voi javascript
                // if (typeof options.onSubmit === 'function') {
                //     // Lay ra cac the input va value roi gan vo mot object de chua
                //     var enableInputs = formElement.querySelectorAll('[name]:not([disable])');
                //     var formValues = Array.from(enableInputs).reduce(function (values, input) {
                //         values[input.name] = input.value;
                //         return values;
                //     }, {});

                //     options.onSubmit(formValues);
                // }

                // Truong hop submit voi hanh vi mac dinh
                formElement.submit();

            }
        }

        // Lap qua moi rule va xu li ( lang nghe, blur ,input)
        options.rules.forEach((rule) => {
            // luU lai cac rules cho cac luot lap
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }

            // Lay ra cac phan tu input, span, label
            var inputElement = formElement.querySelector(rule.selector);
            var inputElementParent = getParent(inputElement, options.formGroupSelector);
            var errorElement = inputElementParent.querySelector(options.errorSelector);
            if (inputElement) {
                // Xu li truong hop blur khoi input
                inputElement.onblur = function () {
                    validate(inputElement, inputElementParent, errorElement, rule);
                }

                // Xu li truong hop nguoi dung nhap vao input
                inputElement.oninput = function () {
                    errorElement.innerText = ' ';
                    inputElementParent.classList.remove('invalid');
                };
            }
        })
    }

}

//==================================== Dinh nghia ================================
// Nguyen tac chung cua ca rule
// 1. Khi co loi => tra ra mess loi
// 2. Khi hop le => bo qua( tra ve undefined)
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui long nhap truong nay!'
        }
    }
};

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Truong nay phai la email!'
        }
    }
}

Validator.minLenghtPassword = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Do dai password phai lon hon ${min}`;
        }
    }
}

Validator.minLenghtAddress = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Do dai addrees phai lon hon ${min}`;
        }
    }
}

Validator.checkPassword = function (selector, password, inforError) {
    return {
        selector: selector,
        test: function (value) {
            return value === password() ? undefined : inforError || 'Mat khau nhap sai!';
        }
    }
}

Validator.isConfirmed = function (selector, confirmPassword, confirmError, errorSelector) {
    return {
        selector: selector,
        test: function (value) {
            let confirmMessage = $(confirmPassword).parentElement.querySelector(errorSelector);
            // Validator.getParent($(confirmPassword), '.form-group')
            if (value === confirmError()) {
                confirmMessage.innerText = '';
                $(confirmPassword).parentElement.classList.remove('invalid');
            }
            return undefined;
        }
    }
}

