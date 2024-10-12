// Constructor Function Validator
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Function Validate
    function Validate(inputElement, rule) {
        var formGroupElement = getParent(inputElement, options.formGroupSelector);
        if (!formGroupElement) {
            console.error('Không tìm thấy phần tử cha của:', inputElement);
            return false;
        }
    
        var errorElement = formGroupElement.querySelector(options.errorSelector);
        var errorMessage;
    
        // Get Rules Of Selector 
        var rules = selectorRules[rule.selector];
    
        // Lặp qua từng rules và kiểm tra
        // Nếu có lỗi thì dừng kiểm tra
        for (var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }
    
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            formGroupElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            formGroupElement.classList.remove('invalid');
        }
    
        return !errorMessage;
    }
    

    // Get Element Form Validate
    var formElement = document.querySelector(options.form);

    if (formElement) {
        // Khi submit Form
        formElement.onsubmit = async function (e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = Validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với Javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]:not([dissabled])');
                    var formValue = Array.from(enableInputs).reduce(function (values, input) {
                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    }, {});

                    // Thực thi hàm onSubmit truyền vào từ options
                    try {
                        await options.onSubmit(formValue);
                        // Reset form sau khi submit thành công nếu tùy chọn resetOnSubmit được bật
                        if (options.resetOnSubmit) {
                            formElement.reset();
                        }
                    } catch (error) {
                        console.error('Submit thất bại:', error);
                    }
                } else {
                    formElement.submit();
                }
            }
        };

        // Handle loop through Each Rule (Lắng nghe sự kiện blur, input...)
        options.rules.forEach(function (rule) {
            // Save Rule Each Input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function (inputElement) {
                // Handle Blur out Input
                inputElement.onblur = function () {
                    Validate(inputElement, rule);
                };

                // Handle Writing Input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                };
            });
        });
    }
}

// Define Rules 
// Handle Rule
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này';
        }
    };
};

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập đúng email';
        }
    };
};

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
};

Validator.maxLength = function (selector, max, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length <= max ? undefined : message || `Vui lòng nhập tối đa ${max} kí tự`;
        }
    };
};

Validator.isComfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    };
};

Validator.isAlphabet = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[A-Za-z]+$/;
            return regex.test(value) ? undefined : message || 'Vui lòng chỉ nhập chữ cái';
        }
    };
};

Validator.isPhoneNumber = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            // Cập nhật regex để cho phép số điện thoại 10 hoặc 11 số
            var regex = /^(0|\+84)(3|5|7|8|9)[0-9]{8,9}$/; // 10 hoặc 11 số
            return regex.test(value) ? undefined : message || 'Số điện thoại không hợp lệ';
        }
    };
};

Validator.hasSpecialChar = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /[!@#$%^&*(),.?":{}|<>]/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập ít nhất một ký tự đặc biệt';
        }
    };
};

Validator.isUrl = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^(https?:\/\/)?([\w-]+)+([\w\-.]{1,})+(\/[\w\-._~:/?#[\]@!$&'()*+,;=.]+)?$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập đúng định dạng URL';
        }
    };
};

Validator.isNumber = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[0-9]+$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập số';
        }
    };
};

Validator.isImageUploaded = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var inputElement = document.querySelector(selector);
            if (inputElement.files.length === 0) {
                return message || 'Vui lòng upload hình ảnh';
            }
            // Kiểm tra loại file
            var file = inputElement.files[0];
            var validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validImageTypes.includes(file.type)) {
                return 'File upload phải là hình ảnh (jpeg, png, gif)';
            }
            return undefined; // Không có lỗi
        }
    };
};

Validator.isStrongPassword = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/; // Mật khẩu mạnh phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
            return regex.test(value) ? undefined : message || 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
        }
    };
};
