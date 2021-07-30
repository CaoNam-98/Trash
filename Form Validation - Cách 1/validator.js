// Đối tượng validator
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            // Hàm matches dùng để kiểm tra xem trong element.parentElement có chứa selector hay không ?
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};
    // Hàm thực hiện validate
    function validate (inputElement, rule) {
        var errorMessage;
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector); // để lấy ra thẻ cha là form-group thì dùng thẻ con.parentElement.
        
        // Lấy ra các rule của selector
        var rules = selectorRules[rule.selector];
        
        // Lặp qua các rule trong selector
        for (var i = 0; i < rules.length; i++) {
            switch (typeof inputElement.type) {
                case 'checkbox':
                case 'radio':
                   
                    break;
                default: 
                    errorMessage = rules[i](inputElement.value);
            }
            
            if (errorMessage) {
                break;
            }
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            // Để thêm màu đỏ vào khi có lỗi thì thêm class = invalid vào thẻ form-gruop
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }
        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form); // Lấy ra formElement
    if (formElement) {
        // Submit chỉ thực thi khi ta submit form
        formElement.onsubmit = function(e) {
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector); // Dùng formElement để gọi thay vì document vì nếu có nhiều #fullname, #email thì sẽ bị trùng sang form khác
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });


            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])'); // Select tất cả các input có attribute là name và không có attribute là disabled

                    var formValues = Array.from(enableInputs).reduce(function (values, input) { // Array.from(enableInputs) là convert từ NodeList sang Array
                        values[input.name] = input.value;
                        return values;
                    }, {});

                    options.onSubmit(formValues);
                } 
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            } 
        }

        options.rules.forEach(function (rule) {
            // Lưu lại các rule cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector); // Dùng formElement để gọi thay vì document vì nếu có nhiều #fullname, #email thì sẽ bị trùng sang form khác
            if (inputElement) { // Khi inputElement mà có thì ta phải thực hiện blur ra ngoài thì báo lỗi
                // Xử lý trường hợp blur khỏi input 
                inputElement.onblur = function () {
                    // value: inputElement.value
                    // test func: rule.test
                    validate(inputElement, rule);
                }

                // Khi đang nhập lại thì không báo lỗi nữa. oninput là khi nhập vào thì nó in ra giá trị liền
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector); // để lấy ra thẻ cha là form-group thì dùng thẻ con.parentElement.
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            }
        });
    }
}

// Định nghĩa các rules
// Nguyên tắc của các rules: 
    // 1. Khi có lỗi thì trả ra message lỗi
    // 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function(selector, message) { // Khi một hàm nằm trong 1 mảng thì khai báo như thế này 
    return {
        selector: selector,
        // Test để kiểm tra người dùng nhập hay chưa
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
        }
    };
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        // Test để kiểm tra người dùng nhập hay chưa
        test: function (value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    }
}

Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        // Test để kiểm tra người dùng nhập hay chưa
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    }
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'; /* Nếu có giá trị message thì dùng message, nếu không có thì dùng giá trị mặc định*/
        }
    };
}